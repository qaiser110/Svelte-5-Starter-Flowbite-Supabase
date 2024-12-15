import * as dashboard from '../../dashboard/+page';
import type { PageLoad } from '../../dashboard/$types';

export const load: PageLoad = (request) => {
	return dashboard.load(request);
};
