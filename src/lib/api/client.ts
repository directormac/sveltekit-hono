import type { routes } from '.';
import { hc } from 'hono/client';

type AppType = typeof routes;

const client = hc<AppType>('/');
export type ClientType = typeof client;

const { api } = client;

export default api;
