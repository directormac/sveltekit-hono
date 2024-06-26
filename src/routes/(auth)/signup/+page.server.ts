import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { UserFormSchema } from '@types';
import { parseApiResponse } from '@utils';
import { decode } from 'decode-formdata';
import { StatusCodes } from 'http-status-codes';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = decode<Omit<UserFormSchema, 'createdAt' | 'updatedAt'>>(await request.formData());
		const response = await parseApiResponse(
			locals.api.auth.signup.$post({
				form
			})
		);
		if (response.status === StatusCodes.UNPROCESSABLE_ENTITY) {
			return fail(StatusCodes.UNPROCESSABLE_ENTITY, { fields: form, errors: response.errors });
		} else {
			redirect(302, '/login');
		}
	}
};
