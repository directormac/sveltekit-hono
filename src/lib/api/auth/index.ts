import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from '@api/db';
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

export const createSessionCookie = async (userId: string): Promise<string> => {
	const session = await auth.createSession(userId, {});

	return auth.createSessionCookie(session.id).serialize();
};

export * from './rules.auth';
