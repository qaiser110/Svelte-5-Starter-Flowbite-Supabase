import { authSchema, LoginType } from '@/schemas/auth';
import { logger } from '@/utils/logger';
import type { AuthResponse } from '@supabase/supabase-js';
import { fail } from '@sveltejs/kit';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;

	return {
		user,
		form: await superValidate(zod(authSchema)),
	};
};

async function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
export const actions: Actions = {
	login: async ({ request, locals: { supabase } }) => {
		try {
			await delay(100);
			const form = await superValidate(request, zod(authSchema));

			console.log('form', form);
			console.log('form.valid', form.valid);
			console.log('form.errors', form.errors);

			if (!form.valid) return fail(400, { form });

			let text = 'Submitted successfully';
			let redirectTo = '';
			let authResp: AuthResponse | null = null;

			switch (form.data.loginType) {
				case LoginType.login:
					logger.info('TODO: Login');
					text = 'Logged in Successfully!';
					redirectTo = '/';
					authResp = await supabase.auth.signInWithPassword({
						email: form.data.email,
						password: form.data.password,
					});
					break;
				case LoginType.pwdLess:
					logger.info('TODO: pwdLess');
					text = 'Logged in Successfully!';
					authResp = await supabase.auth.signInWithOtp({
						email: form.data.email,
					});
					break;
				case LoginType.register:
					logger.info('TODO: register');
					text = 'Verification link sent.';
					authResp = await supabase.auth.signUp({
						email: form.data.email,
						password: form.data.password,
						options: {
							emailRedirectTo: `${request.headers.get('origin')}/auth/callback`,
						},
					});
					break;
				case LoginType.registerMobile:
					logger.info('TODO: registerMobile');
					break;

				default:
					break;
			}

			if (authResp?.error) {
				logger.info(
					'/login/+page.server > Supabase auth error > ',
					authResp.error.message || authResp.error,
					form.data.loginType,
					form.data.loginType === 'registerMobile' ? form.data.phone : form.data.email
				);

				return setError(form, '', authResp.error?.message || 'Failed to submit');
			}

			logger.debug('/login/+page.server > authResp', authResp);
			return message(form, { status: 'success', text, redirectTo });
		} catch (error) {
			logger.debug('Error caught in signUp:', error);
			return fail(500, { message: 'An unexpected error occurred. Please try again.' });
		}
	},
};