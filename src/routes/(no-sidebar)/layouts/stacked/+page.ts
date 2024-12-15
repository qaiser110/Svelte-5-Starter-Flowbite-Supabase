import * as dashboard from '../../../(sidebar)/dashboard/+page';
import type { PageLoad } from '../../../(sidebar)/dashboard/$types';

export const load: PageLoad = (request) => {
	return dashboard.load(request);
};
