import { fail, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ params, request, locals }) => {
	if (!request || typeof request.json !== 'function') {
		console.error('Invalid request object:', request);
		throw new Error('Invalid request object');
	}

	if (['passwordless', 'password'].includes(params.type)) {
		throw new Error('Auth type must be passwordless or password');
	}

	const formData = await request.json();
	const { email, password } = formData;

	if (!email)
		return json(
			{
				message: 'Email is required.',
				errors: { email: 'Email is required.' },
				status: 400,
			},
			{ status: 400 }
		);

	try {
		if (params.type === 'passwordless') {
			const { error } = await locals.supabase.auth.signInWithOtp({
				email,
				options: {
					emailRedirectTo: `/success?ctx=account-created`,
				},
			});

			if (error) {
				console.log('signInWithOtp error', error);
				return json(
					{
						errors: { email: 'There was an issue, Please contact support.' },
						status: 400,
					},
					{ status: 400 }
				);
			}

			return json({
				type: 'Passwordless',
				data: formData,
			});
		} else {
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
