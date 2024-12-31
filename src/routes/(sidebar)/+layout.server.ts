// src/routes/(sidebar)/+layout.server.ts
import { requireAuth } from '$lib/auth/utils';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent }) => {
	const { user } = await parent();

	// This will protect all routes under (sidebar)
	requireAuth(user);
	return {
		user,
	};
};
