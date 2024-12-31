<script lang="ts">
	import { page } from '$app/stores';
	import FormWrapper from '@/components/auth/FormWrapper.svelte';
	import MetaTag from '@/components/MetaTag.svelte';
	import AlertBox from '@/components/ui/AlertBox.svelte';
	import { Button, Input, Label, Spinner } from 'flowbite-svelte';
	import { fly } from 'svelte/transition';

	let successMsg = $state('');
	let errorMsg = $state('');
	let loading = $state(false);

	const onsubmit = async (e: Event) => {
		loading = true;
		const formData = new FormData(e.target as HTMLFormElement);
		const email = formData.get('email') as string;

		const { error } = await $page.data.supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${$page.url.origin}/reset-password`,
		});

		loading = false;

		if (error) {
			errorMsg = error.message || 'Errors requesting password reset.';
		} else {
			successMsg = 'Reset Password link sent. Please check your inbox.';
		}
	};

	let title = 'Forgot your password?';
	const pageDescription = "Submit your email and we'll send you a reset password link!";
</script>

<MetaTag
	{title}
	ogImageTitle="Forgot password"
	description="Forgot password example - Flowbite Svelte Admin Dashboard"
	path="/forgot-password"
/>

<FormWrapper {title} {pageDescription}>
	<form class="mt-8 space-y-6" {onsubmit}>
		{#if errorMsg}
			<ul transition:fly>
				<AlertBox type="error">{errorMsg}</AlertBox>
			</ul>
		{/if}
		{#if successMsg}
			<ul transition:fly>
				<AlertBox type="success">{successMsg}</AlertBox>
			</ul>
		{/if}

		<div>
			<Label for="email" class="mb-2">Your email</Label>
			<Input
				type="email"
				name="email"
				id="email"
				placeholder="name@company.com"
				required
				class="border outline-none"
			/>
		</div>
		<Button disabled={loading} type="submit" size="lg">
			{#if loading}
				<Spinner class="me-3" size="4" color="white" />Submitting ...
			{:else}
				Reset password
			{/if}
		</Button>
	</form>
</FormWrapper>
