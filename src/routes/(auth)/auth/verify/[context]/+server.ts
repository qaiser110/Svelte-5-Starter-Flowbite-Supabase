import type { EmailOtpType } from '@supabase/supabase-js';
import { error, redirect } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
import { logger } from '@/utils/logger';

export const GET: RequestHandler = async ({ url, params, locals: { supabase } }) => {
	const searchParams = url.searchParams.entries();
	type VerifyContext = 'confirmation' | 'recovery' | 'invite' | 'invite' | 'magic-link';

	// const email = $page.url.searchParams.get('email') || '';
	const context: VerifyContext = params.context as VerifyContext;

	logger.debug(`(auth)/verify/[context]=${context} > searchParams`, searchParams);

	if (!['confirmation', 'recovery', 'invite', 'invite', 'magic-link'].includes(context)) {
		console.log(`Invalid verify context: ${context}`);
		throw error(404, 'Wrong context');
		// goto('/errors/404');
	}

	const token_hash = url.searchParams.get('token_hash');
	const type = url.searchParams.get('type') as EmailOtpType | null;
	const email = url.searchParams.get('email') as EmailOtpType | null;
	const redirectTo = url.searchParams.get('redirectTo') as EmailOtpType | null;
	// const next = url.searchParams.get('next') ?? '/settings';

	if (token_hash && type) {
		// type can be: email, recovery, invite or email_change
		const { error, data } = await supabase.auth.verifyOtp({ type, token_hash });
		logger.debug('verifyOtp response user email: ', data?.user?.email);

		if (!error) return redirect(303, `${redirectTo || '/logged-in'}?email=${email}`);

		logger.error(`(auth)/auth/verify/[context]=${context} > verifyOtp > error`, error);
	}

	redirect(303, `/errors/500?ctx=${context}`);
};
