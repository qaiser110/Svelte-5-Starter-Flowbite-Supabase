<script lang="ts">
	// import '../app.css';
	import { page } from '$app/stores';
	import MetaTag from '$lib/components/MetaTag.svelte';
	import MaintenancePage from '$lib/components/pages/MaintenancePage.svelte';
	import NotFoundPage from '$lib/components/pages/NotFoundPage.svelte';
	import ServerErrorPage from '$lib/components/pages/ServerErrorPage.svelte';

	const pages = {
		400: MaintenancePage,
		404: NotFoundPage,
		500: ServerErrorPage,
	} as const;

	type ErrorCode = keyof typeof pages;

	const status = +$page.status;
	const index = Object.keys(pages)
		.map((x) => +x)
		.reduce((p, c) => (p < status ? c : p)) as ErrorCode;
	const component = pages[index];

	const path: string = `/errors/${index}`;
	const description: string = `${index} - Flowbite Svelte Admin Dashboard`;
	const title: string = `Flowbite Svelte Admin Dashboard - ${index} page`;
	const subtitle: string = `${index} page`;
</script>

<MetaTag {path} {description} {title} ogImageTitle={subtitle} />

<svelte:component this={component} />
