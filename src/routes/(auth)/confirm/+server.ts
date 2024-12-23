import type { EmailOtpType } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
	const searchParams = url.searchParams.entries();
	console.log('searchParams', searchParams);

	const token_hash = url.searchParams.get('token_hash');
	const type = url.searchParams.get('type') as EmailOtpType | null;
	const next = url.searchParams.get('next') ?? '/settings';

	/**
	 * Clean up the redirect URL by deleting the Auth flow parameters.
	 *
	 * `next` is preserved for now, because it's needed in the error case.
	 */
	const redirectTo = new URL(url);
	redirectTo.pathname = next;
	redirectTo.searchParams.delete('token_hash');
	redirectTo.searchParams.delete('type');

	if (token_hash && type) {
		// type can be: email, recovery, invite or email_change
		const { error } = await supabase.auth.verifyOtp({ type, token_hash });
		if (!error) {
			// redirectTo.searchParams.delete('next');
			// return redirect(303, redirectTo);
			return redirect(303, '/settings');
		} else {
			console.log('error', error);
		}
	}

	redirect(303, '/error?ctx=magic-link-sent');
};
