<script lang="ts">
	import { page } from '$app/stores';
	import LnkLogin from '@/components/Links/LnkLogin.svelte';
	import LnkMagicLink from '@/components/Links/LnkMagicLink.svelte';
	import Success from '../../utils/auth/Success.svelte';
	import { A } from 'flowbite-svelte';

	let msg = '';

	const context = $page.url.searchParams.get('ctx');
</script>

{#if context === 'signup-success'}
	<Success>
		{#snippet title()}Account Created Successfully!{/snippet}
		{#snippet subtitle()}We sent a verification link to your email. Please check your inbox.{/snippet}
		<LnkLogin loginText={'Sign in here'} />
	</Success>
{:else if context === 'magic-link-sent'}
	<Success>
		{#snippet title()}Authentication Link Sent!{/snippet}
		{#snippet subtitle()}We sent a verification link to your email. Please click the emailed link to
			sign in.{/snippet}
		<LnkMagicLink loginText={'Resend verification link'} />
	</Success>
{:else if context === 'reset-password-link-sent'}
	<Success>
		{#snippet title()}Reset Password Link Sent!{/snippet}
		{#snippet subtitle()}We sent a Reset Password link to your email. Please check your inbox.{/snippet}
		<LnkLogin loginText={'Sign in here'} />
	</Success>
{:else}
	<Success>
		{#snippet title()}Reset Password Link Sent!{/snippet}
		{#snippet subtitle()}We sent a Reset Password link to your email. Please check your inbox.{/snippet}
		<A href="/">Back to home</A>
	</Success>
{/if}
