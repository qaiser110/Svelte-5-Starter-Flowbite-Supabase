<script lang="ts">
	import { A } from 'flowbite-svelte';

	export let loginText = 'ABC';
	export let loginHref = '/auth/sign-in';
	export let loginClass = 'text-sm font-medium text-gray-500 dark:text-gray-400';
</script>

<div class={loginClass}>
	{#if loginText}
		<A href={loginHref}>{loginText}</A>
	{:else}
		Already have an account? <A href={loginHref}>Login here</A>
	{/if}
</div>
