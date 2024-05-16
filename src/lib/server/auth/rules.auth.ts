import { USER_ROLES } from '@constants';
import type { UserRole } from '@types';

export const adminRoutes = USER_ROLES.filter((role) => role !== 'user');

export const checkAccess = (role: UserRole, allowedRoles: UserRole[]): boolean => {
	return allowedRoles.includes(role);
};
