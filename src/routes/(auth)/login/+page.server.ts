import { decode } from 'decode-formdata';
import type { Actions, PageServerLoad } from './$types';
import type { AuthFormSchema } from '@types';
import { parseApiResponse } from '@utils';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = decode<AuthFormSchema>(await request.formData());

		const response = await parseApiResponse(
			locals.api.auth.login.$post({
				form
			})
		);
		if (response.errors) {
			return fail(400, { form, message: response.errors });
		} else {
			redirect(302, '/');
		}
	}
};
