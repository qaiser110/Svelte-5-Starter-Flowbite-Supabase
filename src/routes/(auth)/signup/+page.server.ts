import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { logger } from '@/utils/logger';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		if (!email) return fail(400, { error: 'Email is required.' });
		if (!password) return fail(400, { error: 'Password is required.' });

		if (password !== confirmPassword) {
			return fail(400, {
				error: {
					message: 'Passwords do not match.',
					code: 'password_mismatch',
				},
			});
		}

		try {
			logger.debug('/signup/+page.server', { email, password });
			const { data: signUpData, error: signUpError } = await locals.supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${request.headers.get('origin')}/logged-in?type=credentials`,
					// emailRedirectTo: `${request.headers.get('origin')}/auth/sent/signup-link?email=${encodeURIComponent(email)}`,
				},
			});

			if (signUpError) {
				logger.error('(auth)/signup/+page.server error', signUpError);
				return fail(400, {
					message: signUpError.message || 'There was an issue. Please contact support.',
					code: signUpError.code || 'unknown_error',
				});
			}

			return { success: true, email: signUpData.user?.email };
		} catch (error) {
			logger.debug('Error caught in signUp:', error);
			return fail(500, { message: 'An unexpected error occurred. Please try again.' });
		}
	},
};
