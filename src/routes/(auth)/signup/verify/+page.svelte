<script lang="ts">
	import { page } from '$app/stores';
	import AlertBox from '@/components/ui/AlertBox.svelte';

	let resendLoading = $state(false);
	let resendSuccess = $state(false);
	let error: string | null = $state(null);

	// Get email from URL params if available
	const email = $page.url.searchParams.get('email');

	async function handleResend() {
		resendLoading = true;
		error = null;
		resendSuccess = false;

		try {
			const result = await $page.data.supabase.auth.resend({
				type: 'signup',
				email,
			});

			if (result.error) {
				error = result.error?.message || 'Something went wrong';
				return;
			}

			resendSuccess = true;
		} catch (e) {
			error = 'Failed to resend verification email';
		} finally {
			resendLoading = false;
		}
	}
</script>

<div class="mx-auto flex min-h-[60vh] flex-col items-center justify-center px-6 py-8">
	<div class="w-full max-w-md rounded-lg bg-white p-6 shadow dark:bg-gray-800">
		<div class="text-center">
			<h1 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Check your email</h1>

			{#if error}
				<AlertBox type="error">{error}</AlertBox>
			{:else if resendSuccess}
				<AlertBox type="success">Another verification email has been sent</AlertBox>
			{:else}
				<AlertBox type="success">
					Verification email has been sent
					{#if email}
						to <strong>{email}</strong>
					{:else}
						to your email address
					{/if}
				</AlertBox>
			{/if}

			<div class="mt-4">
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
				<a href="/login" class="text-sm text-primary-600 hover:underline dark:text-primary-500">
					Return to sign in
				</a>
			</div>
		</div>
	</div>
</div>
