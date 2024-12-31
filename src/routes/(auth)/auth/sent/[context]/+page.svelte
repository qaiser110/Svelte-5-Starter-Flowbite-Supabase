<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import LinkSentPage from '$lib/components/pages/LinkSentPage.svelte';
	import { logger } from '$lib/utils/logger';
	import { onMount } from 'svelte';

	interface SuccessMessage {
		title: string;
		subtitle: string;
		type: undefined | 'magic-link' | 'signup-link' | 'reset-pwd-link';
		backToHomeLink?: boolean;
	}

	type SuccessMessageContext = 'magic-link' | 'signup-link' | 'reset-password-link';

	type SuccessMessages = Record<SuccessMessageContext, SuccessMessage>;

	const messages: SuccessMessages = {
		'magic-link': {
			title: 'Login Link Sent!',
			subtitle: 'Login link sent via email. Please click the emailed link to sign in.',
			type: 'magic-link',
		},
		'signup-link': {
			title: 'Verification Link Sent!',
			subtitle: 'Confirmation link sent via email. Please check your inbox.',
			type: 'signup-link',
		},
		'reset-password-link': {
			title: 'Password Reset Link Sent!',
			subtitle: 'Password Reset link sent via email. Please check your inbox.',
			type: 'reset-pwd-link',
			backToHomeLink: true,
		},
	};

	// const email = $page.url.searchParams.get('email') || '';
	const context = $page.params.context as SuccessMessageContext;
	logger.debug(`(auth)/sent/ [context]=${context}`);

	onMount(() => {
		if (!Object.keys(messages).includes(context)) {
			console.log(`Invalid success message context: ${context}`);
			// throw error(500, 'Wrong context');
			goto('/errors/404');
		}
	});
</script>

<LinkSentPage {...messages[context]} />
<!-- 
{#key context}
	<MessagePage>
		{#snippet title()}
			{messages[context]?.title ?? 'Email Sent!'}
		{/snippet}

		{#snippet subtitle()}
			{messages[context]?.subtitle ?? 'We sent you an email. Please check your inbox.'}
		{/snippet}

		{#if messages[context]?.type === 'magic-link'}
			<LnkLogin loginText={'Resend login link'} type="magic-link" />
		{:else if messages[context]?.type === 'signup-link'}
			<LnkLogin loginText={'Sign in here'} type="signup-link" />
		{/if}

		{#if messages[context]?.backToHomeLink}
			<A href="/">Back to home</A>
		{/if}
	</MessagePage>
{/key} -->

<!-- 
{#if context === 'magic-link-sent'}
	<MessagePage>
		{#snippet title()}{messages['magic-link-sent'].title}{/snippet}
		{#snippet subtitle()}{messages['magic-link-sent'].subtitle}{/snippet}
		<LnkMagicLink loginText={'Resend verification link'} />
	</MessagePage>
{:else if context === 'magic-link-resent'}
	<MessagePage>
		{#snippet title()}{messages['magic-link-resent'].title}{/snippet}
		{#snippet subtitle()}{messages['magic-link-resent'].subtitle}{/snippet}
		<LnkMagicLink loginText={'Resend verification link'} />
	</MessagePage>
{:else if context === 'signup-email-sent'}
	<MessagePage>
		{#snippet title()}{messages['signup-email-sent'].title}{/snippet}
		{#snippet subtitle()}{messages['signup-email-sent'].subtitle}{/snippet}
		<LnkLogin loginText={'Sign in here'} />
	</MessagePage>
{:else if context === 'signup-email-resent'}
	<MessagePage>
		{#snippet title()}{messages['signup-email-resent'].title}{/snippet}
		{#snippet subtitle()}{messages['signup-email-resent'].subtitle}{/snippet}
		<LnkLogin loginText={'Sign in here'} />
	</MessagePage>
{:else if context === 'reset-password-link-sent'}
	<MessagePage>
		{#snippet title()}{messages['signup-email-resent'].title}{/snippet}
		{#snippet subtitle()}{messages['signup-email-resent'].subtitle}{/snippet}
		<LnkLogin loginText={'Sign in here'} />
	</MessagePage>
{:else}
	<MessagePage>
		{#snippet title()}Reset Password Link Sent!{/snippet}
		{#snippet subtitle()}We sent a Reset Password link to your email. Please check your inbox.{/snippet}
		<A href="/">Back to home</A>
	</MessagePage>
{/if} 
-->
