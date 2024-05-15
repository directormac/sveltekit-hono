import { fail, type Actions } from '@sveltejs/kit';
import type { UserFormSchema } from '@types';
import { parseApiResponse } from '@utils';
import { decode } from 'decode-formdata';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = decode<Omit<UserFormSchema, 'createdAt' | 'updatedAt'>>(await request.formData());
		const response = await parseApiResponse(
			locals.api.auth.signup.$post({
				form
			})
		);
		if (response.status === 400) {
			return fail(400, { form, errors: response.errors });
		} else {
			return {
				message: response.data
			};
		}
	}
};
