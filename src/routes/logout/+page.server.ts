import { fail, redirect } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';
import { requireAuth } from '@/auth/utils';

export async function load(event: RequestEvent) {
	// const { user } = await parent();
	// requireAuth(user);
	console.log('event.locals.user', event.locals.user);

	return {};
}

export const actions: Actions = {
	logoutAction,
};

async function logoutAction(event: RequestEvent) {
	console.log('logoutAction - event.locals.user', event.locals.user);
	// if (event.locals.session === null) {
	// 	return fail(401);
	// }
	// return redirect(302, '/login');
}