<script lang="ts">
	import { page } from '$app/stores';
	import LnkLogin from '@/components/links/LnkLogin.svelte';
	import { A, Card } from 'flowbite-svelte';

	let site = {
		name: 'Flowbite1',
		img: '/images/icon-logo.svg',
		link: '/',
		imgAlt: 'FlowBite Logo1',
	};

	let title = '';
	let subtitle = '';
	const context = $page.url.searchParams.get('ctx');
	if (context === 'magic-link-sent') {
		title = 'Verification Error';
		subtitle = 'Verification link invalid or expired.';
	}
</script>

<main class="w-full bg-gray-50 dark:bg-gray-900">
	<div
		class="pt:mt-0 mx-auto flex flex-col items-center justify-center px-6 pt-8 dark:bg-gray-900 md:h-screen"
	>
		<a
			href={site.link}
			class="mb-8 flex items-center justify-center text-2xl font-semibold dark:text-white lg:mb-10"
		>
			<img src={site.img} class="mr-4 h-11" alt={site.imgAlt} />
			<span>{site.name}</span>
		</a>
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
