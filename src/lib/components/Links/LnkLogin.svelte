<script lang="ts">
	import { A } from 'flowbite-svelte';

	export let loginText;
	export let size: undefined | 'sm' | 'md' | 'lg' = 'md';
	export let type: 'magic-link' | 'signup-link' = 'signup-link';
	export let loginClass = `text-${size} text-gray-500 dark:text-gray-400`;

	let href = '/login';

	if (type === 'magic-link') {
		href = '/login?type=magic-link';
	}
</script>

<div class={loginClass}>
	{#if loginText}
		<A {href}>{loginText}</A>
	{:else}
		Already have an account? <A {href}>Sign in here</A>
	{/if}
</div>
