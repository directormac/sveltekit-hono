import type { ApiResponse, MappedErrors } from '@types';
import type { ClientResponse } from 'hono/client';

// TODO: Improve this from hono regular responses

export async function parseApiResponse<T>(
	fetchCall: Promise<ClientResponse<T>>
): Promise<ApiResponse<T>> {
	const response = await fetchCall;
	const status = response.status;
	let data: T | null = null;
	let errors: ApiResponse<T>['errors'] = null;

	if (response.ok) {
		data = (await response.json()) as T;
	} else {
		errors =
			response.status !== 400 ? await response.text() : ((await response.json()) as MappedErrors);
	}

	return { data, errors, status };
}
