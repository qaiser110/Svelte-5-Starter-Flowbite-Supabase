<script lang="ts">
	import type { PageData } from './$types';
	import Dashboard from '$lib/components/pages/dashboard/Dashboard.svelte';
	import MetaTag from '$lib/components/MetaTag.svelte';
	export let data: PageData;

	const path: string = '';
	const description: string = 'Admin Dashboard example using Flowbite Svelte';
	const title: string = 'Flowbite Svelte Admin Dashboard - Home';
	const subtitle: string = 'Admin Dashboard';
</script>

<MetaTag {path} {description} {title} ogImageTitle={subtitle} />
<main class="p-4">
	<Dashboard {data} />
</main>
