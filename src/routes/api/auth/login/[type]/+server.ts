import { fail, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import sendApiError from '../../../../utils/common/send-api-error';

export const POST: RequestHandler = async ({ params, request, locals }) => {
	if (!request || typeof request.json !== 'function') {
		console.error('Invalid request object:', request);
		throw new Error('Invalid request object');
	}

	// http://localhost:5173/auth/sign-in?type=passwordless
	if (!['passwordless', 'password'].includes(params.type)) {
		return sendApiError('Auth type must be passwordless or password');
	}

	const formData = await request.json();
	const { email, password } = formData;

	if (!email) return sendApiError('Email is required.', 'email');

	try {
		if (params.type === 'passwordless') {
			const { error } = await locals.supabase.auth.signInWithOtp({
				email,
				// options: {
				// 	emailRedirectTo: `/success/auth?ctx=magic-link-sent`,
				// },
			});

			if (error) {
				console.log('signInWithOtp error', error);
				return sendApiError('There was an issue, Please contact support.');
			}

			return json({
				type: 'Passwordless',
				data: formData,
			});
		} else {
			if (!password) return sendApiError('Password is required.', 'password');
			return json({
				type: 'With Password',
				data: formData,
			});
		}
	} catch (error) {
		console.error('Error signing in:', error);
		return json(
			{
				message: 'Internal server error',
				error_code: 'INTERNAL_SERVER_ERROR',
				status: 500,
			},
			{ status: 500 }
		);
	}
};
