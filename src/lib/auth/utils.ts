import type { User } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';

export function requireAuth(user: User) {
	if (!user) {
		throw redirect(303, '/login');
	}
}

export function requireSignedOut(user: User) {
	if (user) {
		throw redirect(303, '/');
	}
}

/*
export function requireRole(user: User, requiredRole: string) {
	if (!user) {
		throw redirect(303, '/login');
	}

	if (!user.roles.includes(requiredRole)) {
		throw redirect(303, '/unauthorized');
	}
}
*/
