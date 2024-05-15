import { ZodError } from 'zod';

export type MappedErrors = {
	[key: string]: string[];
};

export type FormErrorResponse = {
	message: string;
	errors: MappedErrors;
};

export function processZodError(
	message: string = 'Invalid form',
	zodError: ZodError<any>
): FormErrorResponse {
	const errors: MappedErrors = {};

	zodError.errors.forEach((error) => {
		if (error.path.length > 0) {
			const fieldName = error.path[0] as string;
			if (!errors[fieldName]) {
				errors[fieldName] = [];
			}
			errors[fieldName].push(error.message);
		}
	});

	return {
		message,
		errors
	};
}
