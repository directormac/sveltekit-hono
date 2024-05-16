import { type AppBindings } from '@server';
import { authGuardMiddleware } from '@server/middlewares';
import { zValidator } from '@hono/zod-validator';
import { userFormSchema } from '@types';
import { Hono } from 'hono';
import type { User } from 'lucia';

const users: Array<User> = [
	{
		id: '1',
		name: 'John Doe',
		username: 'johndoe',
		email: 'johndoe@me.com',
		role: 'user',
		createdAt: new Date()
	},
	{
		id: '2',
		name: 'John Doe',
		username: 'johndoe',
		email: 'johndoe@me.com',
		role: 'user',
		createdAt: new Date()
	},
	{
		id: '3',
		name: 'John Doe',
		username: 'johndoe',
		email: 'johndoe@me.com',
		role: 'user',
		createdAt: new Date()
	}
];

const route = new Hono<AppBindings>()
	.get('/', authGuardMiddleware, async (c) => {
		return c.json({
			users
		});
	})
	.post('/', zValidator('form', userFormSchema), async (c) => {});

export default route;
