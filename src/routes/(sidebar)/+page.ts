import * as dashboard from './dashboard/+page';
import type { PageLoad } from '../(sidebar)/dashboard/$types';

export const load: PageLoad = (request) => {
	return dashboard.load(request);
};
