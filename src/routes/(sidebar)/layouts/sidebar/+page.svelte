<script lang="ts">
	import Dashboard from '$lib/components/pages/dashboard/Dashboard.svelte';
	import MetaTag from '$lib/components/MetaTag.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	const path: string = '/layouts/sidebar';
	const description: string = 'Sidebar layout examaple - Flowbite Svelte Admin Dashboard';
	const title: string = 'Flowbite Svelte Admin Dashboard - Sidebar Layout';
	const subtitle: string = 'Sidebar Layout';
</script>

<MetaTag {path} {description} {title} ogImageTitle={subtitle} />

<main class="p-4">
	<Dashboard {data} />
</main>
<Footer />
