import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from '@server/db';
import { session, user, type UserInsertSchema } from '@schemas';
import { Lucia } from 'lucia';
import { env } from '$env/dynamic/private';

const mode = env.NODE_ENV;
const secure = !(mode === 'preview' || mode === 'development' || mode === 'test');

const adapter = new DrizzlePostgreSQLAdapter(db, session, user);

export const auth = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure
		}
	},
	getUserAttributes: (attrs) => ({
		id: attrs.id,
		username: attrs.username,
		name: attrs.name,
		role: attrs.role,
		email: attrs.email,
		createdAt: attrs.createdAt
	})
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof auth;
		DatabaseUserAttributes: UserInsertSchema;
	}
}

export const createSessionCookie = async (
	userId: string
): Promise<{
	sessionId: string;
	cookie: string;
}> => {
	const session = await auth.createSession(userId, {});

	const cookie = auth.createSessionCookie(session.id).serialize();

	return {
		sessionId: session.id,
		cookie
	};
};

export const argon2Options = {
	memoryCost: 19456,
	timeCost: 2,
	outputLen: 32,
	parallelism: 1
};

export * from './rules.auth';
