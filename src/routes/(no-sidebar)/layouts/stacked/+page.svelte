<script lang="ts">
	import type { PageData } from './$types';
	import Dashboard from '$lib/components/pages/dashboard/Dashboard.svelte';
	import MetaTag from '$lib/components/MetaTag.svelte';
	export let data: PageData;

	const path: string = '/layouts/stacked';
	const description: string = 'Stacked layout examaple - Flowbite Svelte Admin Dashboard';
	const title: string = 'Flowbite Svelte Admin Dashboard - Stacked Layout';
	const subtitle: string = 'Stacked Layout';
</script>

<MetaTag {path} {description} {title} ogImageTitle={subtitle} />

<main class="py-4">
	<Dashboard {data} />
</main>
