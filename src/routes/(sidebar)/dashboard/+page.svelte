<script lang="ts">
	import Dashboard from '$lib/components/pages/dashboard/Dashboard.svelte';
	import MetaTag from '$lib/components/MetaTag.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	export let data;

	const path: string = '/dashboard';
	const description: string = 'Admin Dashboard example using Flowbite Svelte';
	const title: string = 'Flowbite Svelte Admin Dashboard - Dashboard';
	const subtitle: string = 'Admin Dashboard';
</script>

<MetaTag {path} {description} {title} ogImageTitle={subtitle} />

<main class="p-4">
	<Dashboard {data} />
</main>
<Footer />
