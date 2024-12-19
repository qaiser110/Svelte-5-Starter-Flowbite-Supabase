<script lang="ts">
	import { page } from '$app/stores';
	import LnkLogin from '@/components/links/LnkLogin.svelte';
	import LnkMagicLink from '@/components/links/LnkMagicLink.svelte';
	import MessagePage from '@/components/pages/MessagePage.svelte';
	import { A } from 'flowbite-svelte';

	let msg = '';

	const context = $page.url.searchParams.get('ctx');
</script>

{#if context === 'signup-success'}
	<MessagePage>
		{#snippet title()}Account Created Successfully!{/snippet}
		{#snippet subtitle()}We sent a verification link to your email. Please check your inbox.{/snippet}
		<LnkLogin loginText={'Sign in here'} />
	</MessagePage>
{:else if context === 'magic-link-sent'}
	<MessagePage>
		{#snippet title()}Authentication Link Sent!{/snippet}
		{#snippet subtitle()}We sent a verification link to your email. Please click the emailed link to
			sign in.{/snippet}
		<LnkMagicLink loginText={'Resend verification link'} />
	</MessagePage>
{:else if context === 'reset-password-link-sent'}
	<MessagePage>
		{#snippet title()}Reset Password Link Sent!{/snippet}
		{#snippet subtitle()}We sent a Reset Password link to your email. Please check your inbox.{/snippet}
		<LnkLogin loginText={'Sign in here'} />
	</MessagePage>
{:else}
	<MessagePage>
		{#snippet title()}Reset Password Link Sent!{/snippet}
		{#snippet subtitle()}We sent a Reset Password link to your email. Please check your inbox.{/snippet}
		<A href="/">Back to home</A>
	</MessagePage>
{/if}
