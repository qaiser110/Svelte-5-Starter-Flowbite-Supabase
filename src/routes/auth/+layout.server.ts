// src/routes/auth/+layout.server.ts
import { requireGuest } from '$lib/auth/utils';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent }) => {
	const { user } = await parent();

	// This will protect all auth routes
	requireGuest(user);
	return {};
};
