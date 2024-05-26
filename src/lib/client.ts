import type { AppType } from './server';
import { hc } from 'hono/client';

const client = hc<AppType>('/');
type ClientType = typeof client;

type GetClientOptions = {
	fetch?: typeof globalThis.fetch;
	path?: string;
};

/**
 * @description getClient is a wrapper around hc that sets the base URL to http://localhost:5173 and the fetch function to globalThis.fetch.
 * @link https://hono.dev/guides/rpc
 * @param fetch - custom fetch function like fetch
 * For sveltekit use the {fetch} from load function
 */
const getClient = ({ fetch = globalThis.fetch }: GetClientOptions = {}) => {
	return hc<AppType>('/', { fetch });
};

export { type ClientType, client, hc, getClient };
