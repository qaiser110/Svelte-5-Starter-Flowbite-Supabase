<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';

	const appName = 'My App';

	export let path: string = '';
	export let description: string = '';
	export let title: string = '';
	export let ogImageTitle: string = '';

	let imgsrc = `https://open-graph-vercel.vercel.app/api/flowbite-svelte-admin-dashboard?title=${ogImageTitle}`;

	let og_url: string = `https://flowbite-svelte-admin-dashboard.vercel.app${path}`;
</script>

<MetaTags
	{title}
	{description}
	openGraph={{
		type: 'website',
		url: `${og_url}`,
		title: `${title} - ${appName}`,
		description: `${description} - ${appName}`,
		images: [
			{
				url: imgsrc,
				width: 1200,
				height: 630,
				alt: `${title}`,
			},
		],
		siteName: 'My Admin Dashboard',
	}}
	twitter={{
		creator: '@shinokada',
		site: '@shinokada',
		cardType: 'summary_large_image',
		title: `${title}`,
		description: `${description}`,
		image: imgsrc,
		imageAlt: `${title}`,
	}}
/>
