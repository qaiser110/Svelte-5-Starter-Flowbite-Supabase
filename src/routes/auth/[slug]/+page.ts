// src/routes/components/[slug]/+page.js
// /** @type {import('./$types').PageLoad} */

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const post = await import(`../${params.slug}.svelte`);
	const content = post.default;

	return {
		content,
	};
};

// export const csr = false;
