<script lang="ts">
	import PlaygroundPage from '@/components/pages/PlaygroundPage.svelte';
	import MetaTag from '@/components/MetaTag.svelte';
	import Footer from '@/components/layout/Footer.svelte';

	const path: string = '/playground/sidebar';
	const description: string = 'Playground Sidebar example - Flowbite Svelte Admin Dashboard';
	const metaTitle: string = 'Flowbite Svelte Admin Dashboard - Playground Sidebar';
	const subtitle: string = 'Playground Sidebar';
</script>

<MetaTag {path} {description} title={metaTitle} ogImageTitle={subtitle} />

<div
	id="main-content"
	class="relative mx-auto h-full w-full overflow-y-auto bg-gray-50 p-4 dark:bg-gray-900"
>
	<PlaygroundPage />
</div>
<Footer />
