import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';
import { showRoutes } from 'hono/dev';
import type { User, Session } from 'lucia';
import { csrf } from 'hono/csrf';
import { streamSSE } from 'hono/streaming';
import { HTTPException } from 'hono/http-exception';
import { auth, users } from './routes';
import { format } from 'date-fns';
import { authMiddleware } from './middlewares';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

/* -------------------------------------------------------------------------- */
/*                                     App                                    */
/* -------------------------------------------------------------------------- */
// This base config shall be used for all API routes

type AppBindings = {
	Variables: {
		user: User | null;
		session: Session | null;
	};
};

const hono = new Hono<AppBindings>().basePath('/api').get('/', () => {
	throw new HTTPException(StatusCodes.FORBIDDEN, { message: ReasonPhrases.FORBIDDEN });
});

hono.use(
	'*',
	cors({
		origin: ['http://localhost:3000', 'http://localhost:5173'],
		maxAge: 600,
		credentials: true
	})
);

hono.use(authMiddleware);

hono.use('*', prettyJSON());

hono.use('/api/*', logger());

hono.use(
	'/api/*',
	csrf({
		origin: ['http://localhost:3000', 'http://localhost:5173']
	})
);

hono.notFound((c) => c.json({ message: ReasonPhrases.NOT_FOUND }, StatusCodes.NOT_FOUND));

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */
const routes = hono
	.get('/healthcheck', (c) => c.text('OK'))
	.get('/time', (c) => {
		return streamSSE(c, async (stream) => {
			// eslint-disable-next-line no-constant-condition
			while (true) {
				await stream.writeSSE({
					data: format(new Date(), 'MMMM do yyyy HH:mm:ss'),
					event: 'time-update',
					id: 'hono-sveltekit'
				});
				stream.write(format(new Date(), 'MMMM do yyyy HH:mm:ss'));
				await stream.sleep(1000);
			}
		});
	})
	.route('/auth', auth)
	.route('/users', users);

showRoutes(hono);
/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */
export default hono;

type AppType = typeof routes;

export { hono, routes };

export type { AppType, AppBindings };
