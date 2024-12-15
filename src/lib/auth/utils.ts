// src/lib/auth/utils.ts
import type { User } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';

export function requireAuth(user: User) {
	if (!user) {
		throw redirect(303, '/auth/sign-in');
	}
}

export function requireGuest(user: User) {
	if (user) {
		throw redirect(303, '/');
	}
}

/*
export function requireRole(user: User, requiredRole: string) {
	if (!user) {
		throw redirect(303, '/auth/sign-in');
	}

	if (!user.roles.includes(requiredRole)) {
		throw redirect(303, '/unauthorized');
	}
}
*/
