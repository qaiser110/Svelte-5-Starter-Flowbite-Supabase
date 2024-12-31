<script lang="ts">
	import { page } from '$app/stores';
	import MessagePage from '$lib/components/pages/MessagePage.svelte';
	import { logger } from '$lib/utils/logger';
	import { A } from 'flowbite-svelte';

	logger.debug('/logged-in', $page.data.user?.email);
</script>

<MessagePage>
	{#snippet title()}
		Successfully Logged In!
	{/snippet}

	{#snippet subtitle()}
		You're logged in successfully!
	{/snippet}

	<A href="/">Go to home page</A>
</MessagePage>
