import { user } from '@schemas';
import { db, eq, sql, or } from '..';

export const queryAuthCredentials = db
	.select({ id: user.id, password: user.password })
	.from(user)
	.where(
		or(eq(user.email, sql.placeholder('email')), eq(user.username, sql.placeholder('username')))
	)
	.prepare('query_auth_credentials');

export const queryUserUsernames = db
	.select({ id: user.id })
	.from(user)
	.where(eq(user.username, sql.placeholder('username')))
	.prepare('query_user_usernames');

export const queryUserEmails = db
	.select({ id: user.id })
	.from(user)
	.where(eq(user.email, sql.placeholder('email')))
	.prepare('query_user_emails');
