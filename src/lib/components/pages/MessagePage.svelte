<script lang="ts">
	import { A, Card, Hr } from 'flowbite-svelte';
	import type { Snippet } from 'svelte';
	import LogoComponent from '$lib/components/ui/LogoComponent.svelte';

	let {
		title,
		subtitle,
		children,
	}: {
		title?: Snippet;
		subtitle?: Snippet;
		children: Snippet;
	} = $props();
</script>

<main class="w-full bg-gray-50 dark:bg-gray-900">
	<div
		class="pt:mt-0 mx-auto flex flex-col items-center justify-center px-6 pt-8 dark:bg-gray-900 md:h-screen"
	>
		<LogoComponent />
		<!-- Card -->
		<Card class="w-full" size="md" border={false}>
			<h1 class="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
				{@render title?.()}
				{#if !title}
					<span class="missing">Check your email!</span>
				{/if}
			</h1>

			{#if subtitle}
				<h5>{@render subtitle?.()}</h5>
			{/if}

			<div class="prose mt-12">
				{@render children()}
			</div>
		</Card>
	</div>
</main>
