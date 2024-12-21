<script lang="ts">
	import { page } from '$app/stores';
	import { logger } from '@/utils/logger';
	import { A } from 'flowbite-svelte';
	import AlertBox from '../ui/AlertBox.svelte';
	import LogoComponent from '../ui/LogoComponent.svelte';

	let resendLoading = $state(false);
	let resendSuccess = $state(false);
	let errorMsg: string | null = $state(null);

	// Get email from URL params if available
	const email = $page.url.searchParams.get('email');
	logger.debug('LinkSentPage > $page ', $page);

	let {
		title = 'Check your email!',
		message = 'Confirmation link sent via email. Please check your inbox.',
		type,
		backToHomeLink = false,
	}: {
		title?: string;
		message?: string;
		type: undefined | 'magic-link' | 'signup-link' | 'reset-pwd-link';
		backToHomeLink?: boolean;
	} = $props();

	async function handleResend() {
		resendLoading = true;
		errorMsg = null;
		resendSuccess = false;

		try {
			let result;
			switch (type) {
				case 'magic-link':
					logger.info('magic-link resend > supabase.auth.resend');
					result = await $page.data.supabase.auth.signInWithOtp({
						email,
					});
					break;
				case 'signup-link':
					logger.info('signup-link resend > supabase.auth.resend');
					result = await $page.data.supabase.auth.resend({
						type: 'signup',
						email,
						options: {
							emailRedirectTo: `http://localhost:5173/logged-in`,
							// emailRedirectTo: `${request.headers.get('origin')}/auth/sent/signup-link?email=${encodeURIComponent(email)}`,
						},
					});
					break;
				case 'reset-pwd-link':
					logger.info('reset-pwd-link resend > supabase.auth.resetPasswordForEmail');
					result = await $page.data.supabase.auth.resetPasswordForEmail({
						type: 'signup',
						email,
					});
					break;
				default:
					errorMsg = 'Wrong resend type';
					break;
			}

			if (result.error) {
				errorMsg = result.error?.message || 'Something went wrong';
				return;
			}

			resendSuccess = true;
		} catch (e) {
			errorMsg = 'Failed to resend email';
		} finally {
			resendLoading = false;
		}
	}
</script>

<div class="mx-auto flex min-h-[60vh] flex-col items-center justify-center px-6 py-8">
	<LogoComponent />
	<div class="w-full max-w-md rounded-lg bg-white p-6 shadow dark:bg-gray-800">
		<div class="text-center">
			<h1 class="my-6 text-2xl font-bold text-gray-900 dark:text-white">
				{title}
			</h1>

			{#if errorMsg}
				<AlertBox type="error">{errorMsg}</AlertBox>
			{:else if resendSuccess}
				<AlertBox type="success">Another verification email has been sent</AlertBox>
			{:else}
				<AlertBox type="success">
					{message}
				</AlertBox>
			{/if}

			<div class="mt-12">
				<p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
					Didn't receive the email? Check your spam folder or try resending
				</p>

				<button
					onclick={handleResend}
					disabled={resendLoading}
					class="w-full rounded-lg bg-primary-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 disabled:opacity-50 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				>
					{resendLoading ? 'Sending...' : 'Resend verification email'}
				</button>
			</div>

			<div class="mt-6">
				<!-- {#if type === 'magic-link'}
					<LnkLogin loginText={'Resend login link'} type="magic-link" />
				{:else if type === 'signup-link'}
					<LnkLogin loginText={'Sign in here'} type="signup-link" />
				{/if} -->

				{#if backToHomeLink}
					<A href="/">Back to home</A>
				{/if}
			</div>
		</div>
	</div>
</div>
