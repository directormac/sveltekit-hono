import { hc } from 'hono/client';
import type { AppType } from '@server';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { parseApiResponse } from '@utils';
import { auth } from '@server/auth';

const injectApiHandle: Handle = async ({ event, resolve }) => {
	const { api } = hc<AppType>('/', { fetch: event.fetch });
	event.locals.api = api;

	return resolve(event);
};

//BUG: Hangs when calling api here resolution to ssr below;
const apiSessionHandle: Handle = async ({ event, resolve }) => {
	const { api } = event.locals;

	const request = await parseApiResponse(api.auth.session.$get());

	if (!request.data) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	} else {
		const { user, session } = request.data;

		// event.locals.user = user;
		// event.locals.session = session;
		return resolve(event);
	}
};

const authServerHandle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(auth.sessionCookieName);

	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await auth.validateSession(sessionId);
	if (session && session.fresh) {
		const sessionCookie = auth.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}

	if (!session) {
		const sessionCookie = auth.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}

	event.locals.user = user;
	event.locals.session = session;

	return resolve(event);
};

export const handle = sequence(injectApiHandle, authServerHandle);
