import { requireSignedOut } from '$lib/auth/utils';
import { logger } from '@/utils/logger';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent, url }) => {
	const { user } = await parent();
	logger.debug('(auth)/layout.server >>>  ', url.href);
	// This will protect all auth routes
	requireSignedOut(user);
	return {};
};
