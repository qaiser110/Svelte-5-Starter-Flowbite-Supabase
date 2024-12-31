<script lang="ts">
	import { page } from '$app/stores';
	import LnkLogin from '$lib/components/links/LnkLogin.svelte';
	import LogoComponent from '$lib/components/ui/LogoComponent.svelte';
	import { A, Card } from 'flowbite-svelte';

	let title = '';
	let subtitle = '';
	const context = $page.url.searchParams.get('ctx');
	if (context === 'confirmation') {
		title = 'Verification Error';
		subtitle = 'Verification link invalid or expired.';
	}
</script>

<main class="w-full bg-gray-50 dark:bg-gray-900">
	<div
		class="pt:mt-0 mx-auto flex flex-col items-center justify-center px-6 pt-8 dark:bg-gray-900 md:h-screen"
	>
		<LogoComponent />
		<!-- Card -->
		<Card class="w-full" size="md" border={false}>
			<h1 class="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
				{title}
			</h1>

			{#if subtitle}
				<h5>{subtitle}</h5>
			{/if}

			<div class="prose mt-12">
				<LnkLogin loginText={'Sign in here'} />
				<A href="/">Back to home</A>
			</div>
		</Card>
	</div>
</main>
