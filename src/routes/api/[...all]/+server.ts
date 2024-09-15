import { hono } from '@server';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = ({ request, platform }) =>
	hono.request(request, {}, platform?.env || {});
export const PUT: RequestHandler = ({ request, platform }) =>
	hono.request(request, {}, platform?.env || {});
export const DELETE: RequestHandler = ({ request, platform }) =>
	hono.fetch(request, platform?.env || {});
export const POST: RequestHandler = ({ request, platform }) =>
	hono.fetch(request, platform?.env || {});
export const PATCH: RequestHandler = ({ request, platform }) =>
	hono.fetch(request, platform?.env || {});
export const fallback: RequestHandler = ({ request, platform }) =>
	hono.fetch(request, platform?.env || {});
