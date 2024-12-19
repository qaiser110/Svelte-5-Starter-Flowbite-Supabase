import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import sendApiError from '@/utils/send-api-error';

export const GET: RequestHandler = async ({ params, request, locals }) => {
	try {
		const { error } = await locals.supabase.auth.signOut();

		if (error) {
			console.log('signOut error', error);
			return sendApiError('There was an issue, Please contact support.');
		}

		return json({
			message: 'Signed out successfully',
		});
	} catch (error) {
		console.error('Error signing out:', error);
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
