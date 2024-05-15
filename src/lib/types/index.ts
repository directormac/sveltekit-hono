import type { USER_ROLES } from '../constants/shared.constant';
import type { MappedErrors } from './error.type';

export type UserRole = (typeof USER_ROLES)[number];

export type ApiResponse<T> = {
	data: T | null;
	errors: MappedErrors | string | null;
	status: number;
};

export * from './user.type';
export * from './error.type';
export * from './util.type';
