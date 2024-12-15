import type { LayoutServerLoad } from './$types';
import { ANALYTICS_ID } from '$env/static/private';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	const { session, user } = await locals.safeGetSession();
	return {
		ANALYTICS_ID,
		session: session ?? null,
		user: user ?? null,
		cookies: cookies.getAll(),
	};
};
