<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import FormWrapper from '@/components/auth/FormWrapper.svelte';
	import MetaTag from '@/components/MetaTag.svelte';
	import AlertBox from '@/components/ui/AlertBox.svelte';
	import { Button, Input, Label, Spinner } from 'flowbite-svelte';
	import { toast } from 'svelte-sonner';
	import { fly } from 'svelte/transition';

	let successMsg = $state('');
	let errorMsg = $state('');
	let loading = $state(false);

	const onsubmit = async (e: Event) => {
		// e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const password = formData.get('password') as string;

		const { error } = await $page.data.supabase.auth.updateUser({ password });

		loading = true;

		if (error) {
			errorMsg =
				error.message || 'Errors on this form. Please try again or contact the administrator.';
		} else {
			toast.success('Password Reset Successfully.');
			goto('/');
		}
	};

	const title = 'Reset your password';
</script>

<MetaTag
	{title}
	ogImageTitle="Reset password"
	description="Reset password example - Flowbite Svelte Admin Dashboard"
	path="/reset-password"
/>
<FormWrapper {title}>
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
			<Label for="password" class="mb-2">Enter new password</Label>
			<Input
				type="password"
				name="password"
				id="password"
				placeholder="••••••••"
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
