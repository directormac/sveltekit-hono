// See https://kit.svelte.dev/docs/types#app

import type { ClientType } from '$lib/client';
import type { User, Session } from 'lucia';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			api: ClientType['api'];
			user: User | null;
			session: Session | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
