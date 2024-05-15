import type { AppBindings } from '@api';
import { auth, createSessionCookie } from '@api/auth';
import { queryAuthCredentials, queryUserUsernames } from '@api/db/queries';
import { authGuardMiddleware, loginFormValidator, signUpFormValidator } from '@api/middlewares';
import { createUser } from '@mutations';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { StatusCodes } from 'http-status-codes';
import { Argon2id } from 'oslo/password';

const route = new Hono<AppBindings>()
	.get('/me', authGuardMiddleware, async (c) => {
		const { user } = c.var;
		return c.json({
			user
		});
	})
	.get('/session', authGuardMiddleware, async (c) => {
		const { user, session } = c.var;
		return c.json({
			user,
			session
		});
	})
	.post('/signup', signUpFormValidator, async (c) => {
		const formData = c.req.valid('form');

		const [userUsername] = await queryUserUsernames.execute({
			username: formData.username
		});

		if (userUsername)
			throw new HTTPException(StatusCodes.BAD_REQUEST, {
				message: 'Username already Exists'
			});

		const [userEmail] = await queryUserUsernames.execute({
			username: formData.username
		});

		if (userEmail)
			throw new HTTPException(StatusCodes.BAD_REQUEST, {
				message: 'Email already Exists'
			});

		await createUser(formData);

		return c.redirect('/login');
	})
	.post('/login', loginFormValidator, async (c) => {
		const { key, password } = c.req.valid('form');

		const [user] = await queryAuthCredentials.execute({ username: key, email: key });

		const invalidResponse = new HTTPException(StatusCodes.BAD_REQUEST, {
			message: 'Invalid Credentials'
		});

		if (!user) {
			throw invalidResponse;
		}

		const validPassword = await new Argon2id().verify(user.password, password);

		if (!validPassword) {
			throw invalidResponse;
		}

		const cookie = await createSessionCookie(user.id);

		c.header('Set-Cookie', cookie, {
			append: true
		});

		return c.redirect('/');
	})
	.post('/logout', async (c) => {
		if (c.var.session) {
			await auth.invalidateSession(c.var.session.id);
			c.set('session', null);
			c.set('user', null);
			return c.redirect('/login');
		} else {
			throw new HTTPException(StatusCodes.UNAUTHORIZED, {
				message: 'You are not logged in!'
			});
		}
	});

export default route;
