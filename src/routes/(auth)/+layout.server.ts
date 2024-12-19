import { requireSignedOut } from '$lib/auth/utils';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent }) => {
	const { user } = await parent();

	// This will protect all auth routes
	requireSignedOut(user);
	return {};
};
