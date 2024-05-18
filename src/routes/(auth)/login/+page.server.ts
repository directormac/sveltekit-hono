import { decode } from 'decode-formdata';
import type { Actions } from './$types';
import type { AuthFormSchema } from '@types';
import { parseApiResponse } from '@utils';
import { fail, redirect } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = decode<AuthFormSchema>(await request.formData());

		const response = await parseApiResponse(
			locals.api.auth.login.$post({
				form
			})
		);

		if (response.errors) {
			return fail(StatusCodes.UNPROCESSABLE_ENTITY, { fields: form, errors: response.errors });
		} else {
			redirect(302, '/');
		}
	}
};
