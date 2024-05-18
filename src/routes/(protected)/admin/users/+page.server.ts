import { parseApiResponse } from '@utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { data } = await parseApiResponse(
		locals.api.users.$get({
			query: {}
		})
	);
	return {
		users: data
	};
};
