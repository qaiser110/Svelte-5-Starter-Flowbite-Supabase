<script lang="ts">
	import { Card, P } from 'flowbite-svelte';
	import LogoComponent from '../ui/LogoComponent.svelte';

	export let title: string;
	export let pageDescription: string = '';

	const mainClass = 'bg-gray-50 dark:bg-gray-900';
	const mainDivClass =
		'flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900';
	const cardH1Class = 'mb-3 text-2xl font-bold text-gray-900 dark:text-white';
</script>

<main class={mainClass}>
	<div class={mainDivClass}>
		<LogoComponent />

		<Card class="w-full max-w-md" border={false}>
			<h1 class={cardH1Class}>{title}</h1>
			{#if pageDescription}
				<P class="text-base font-normal text-gray-500 dark:text-gray-400">
					{pageDescription}
				</P>
			{/if}
			<slot />
		</Card>
	</div>
</main>
