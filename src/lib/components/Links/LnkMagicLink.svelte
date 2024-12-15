<script lang="ts">
	import { A } from 'flowbite-svelte';

	export let loginText;
	export let size: undefined | 'sm' | 'md' | 'lg' = 'md';
	export let loginHref = '/auth/sign-in?type=passwordless';
	export let loginClass = `text-${size} text-gray-500 dark:text-gray-400`;
</script>

<div class={loginClass}>
	{#if loginText}
		<A href={loginHref}>{loginText}</A>
	{:else}
		Already have an account? <A href={loginHref}>Sign in here</A>
	{/if}
</div>
