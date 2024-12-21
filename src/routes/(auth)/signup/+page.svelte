<script lang="ts">
	import { Label, Input } from 'flowbite-svelte';
	import MetaTag from '@/components/MetaTag.svelte';
	import AuthForm from '@/components/auth/AuthForm.svelte';
	import OauthSignIn from '@/components/auth/OauthSignIn.svelte';
	import { goto } from '$app/navigation';
	import AlertBox from '@/components/ui/AlertBox.svelte';
	import PasswordInput from '@/components/ui/PasswordInput.svelte';
	import { logger } from '@/utils/logger';

	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let loading = $state(false);
	let error = $state(null);

	const labelClass = 'space-y-2 dark:text-white';

	const handleSubmit = async () => {
		loading = true;

		return async ({
			result,
		}: {
			result: {
				type: string;
				data?: { email: string; error?: { message?: string; code?: string } };
			};
		}) => {
			loading = false;
			try {
				if (result.type === 'success') {
					// Redirect to verification page
					goto(`/auth/sent/signup-link?email=${encodeURIComponent(result.data?.email || '')}`);
				} else {
					console.log('result', result);
					// const error = result.data?.error;
					// errorMsg = error?.message || 'Something went wrong';
					// errorCode = error?.code;
				}
			} catch (error) {
				console.log('error >>> ', error);
			}
		};
	};

	const path: string = '/signup';
	const description: string = 'Sign up example - Flowbite Svelte Admin Dashboard';
	const metaTitle: string = 'Flowbite Svelte Admin Dashboard - Sign up';
	const subtitle: string = 'Sign up';
</script>

<MetaTag {path} {description} title={metaTitle} {subtitle} />

<AuthForm
	title="Create a Free Account"
	btnTitle="Create account"
	loadingBtnTitle="Creating account..."
	{loading}
	acceptTerms={true}
	haveAccount={true}
	{handleSubmit}
>
	<div slot="oauth">
		<OauthSignIn />
	</div>

	{#if form?.error?.message}
		<div class="mb-4 text-sm text-red-500">
			{form.error}
		</div>
	{/if}
	<!-- {#if errorCode === 'user_already_exists'}
		<AlertBox type="error">
			This email already exists. To login, <a class="underline" href="/login">click here</a>. To
			reset password, <a class="underline" href="/reset-password">click here</a>.
		</AlertBox>
	{:else if errorMsg}
		<AlertBox type="error">{errorMsg}</AlertBox>
	{/if} -->

	<div>
		<Label class={labelClass}>
			<span>Your email</span>
			<Input
				type="email"
				name="email"
				placeholder="name@company.com"
				required
				class="border outline-none dark:border-gray-600 dark:bg-gray-700"
			/>
		</Label>
	</div>
	<div>
		<PasswordInput label="Your password" name="password" />
	</div>
	<div>
		<PasswordInput label="Confirm password" name="confirmPassword" />
	</div>
</AuthForm>
