import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import sendApiError from '@/utils/send-api-error';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!request || typeof request.json !== 'function') {
		console.error('Invalid request object:', request);
		throw new Error('Invalid request object');
	}

	const formData = await request.json();
	const { email, password } = formData;

	if (!email) return sendApiError('email', 'Email is required.');
	if (!password) return sendApiError('password', 'Password is required.');

	try {
		const { data: signUpData, error: signUpError } = await locals.supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `/auth/success?ctx=signup-success`,
			},
		});

		console.log('signUp data', signUpData);
		console.log('signUp error', signUpError);

		if (signUpError) {
			console.log('signUp error', signUpError);
			return sendApiError('email', 'There was an issue, Please contact support.');
		}

		// Verify the user data using getUser
		const {
			data: { user },
			error: getUserError,
		} = await locals.supabase.auth.getUser();

		if (getUserError || !user) {
			console.error('Error verifying user:', getUserError);
			return sendApiError('email', 'Failed to verify user registration.');
		}

		return json({
			type: 'SignUp with Email',
			data: { email: user.email }, // Only return verified user data
		});
	} catch (error) {
		console.error('Error in signUp:', error);
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
