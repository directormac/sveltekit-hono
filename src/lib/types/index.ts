import type { USER_ROLES } from '../constants/shared.constant';
import type { FormErrorResponse } from './error.type';

export type UserRole = (typeof USER_ROLES)[number];

export type ApiResponse<T> = {
	data: T | null;
	errors: FormErrorResponse | string | null;
	status: number;
	message: string | null;
};

export * from './user.type';
export * from './error.type';
export * from './util.type';
