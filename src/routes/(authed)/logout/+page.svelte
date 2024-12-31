<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import LnkLogin from '@/components/links/LnkLogin.svelte';
	import MessagePage from '@/components/pages/MessagePage.svelte';
	import { logger } from '@/utils/logger';

	let error = $state('');

	$effect(() => {
		if (!$page.data.user) {
			goto('/login');
		}
	});

	onMount(async () => {
		const session = await $page.data.session;

		if (!session) {
			goto('/login');
			return;
		}

		try {
			const { error: signOutError } = await $page.data.supabase.auth.signOut();
			if (signOutError) {
				logger.debug('signOut error', signOutError);
				error = 'An error occurred while logging out';
			}
		} catch (e) {
			error = 'An error occurred while logging out';
		}
	});
</script>

<MessagePage>
	{#snippet title()}Logged out!{/snippet}
	{#snippet subtitle()}
		{#if error}
			{error}
		{:else}
			You've been logged out.
		{/if}
	{/snippet}
	<LnkLogin loginText={'Click here to sign in again'} />
</MessagePage>
