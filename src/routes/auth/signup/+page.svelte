<script lang="ts">
	import { Label, Input } from 'flowbite-svelte';
	import MetaTag from '@/components/MetaTag.svelte';
	import AuthForm from '@/components/auth/AuthForm.svelte';
	import OauthSignIn from '@/components/auth/OauthSignIn.svelte';

	const labelClass = 'space-y-2 dark:text-white';
	const onSubmit = (e: Event) => {
		const formData = new FormData(e.target as HTMLFormElement);

		const data: Record<string, string | File> = {};
		for (const field of formData.entries()) {
			const [key, value] = field;
			data[key] = value;
		}
		console.log(data);
	};

	const path: string = '/auth/sign-up';
	const description: string = 'Sign up example - Flowbite Svelte Admin Dashboard';
	const metaTitle: string = 'Flowbite Svelte Admin Dashboard - Sign up';
	const subtitle: string = 'Sign up';
</script>

<MetaTag {path} {description} title={metaTitle} {subtitle} />

<AuthForm
	title="Create a Free Account"
	btnTitle="Create account"
	acceptTerms={true}
	haveAccount={true}
	on:submit={onSubmit}
>
	<div slot="oauth">
		<OauthSignIn />
	</div>
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
		<Label class={labelClass}>
			<span>Your password</span>
			<Input
				type="password"
				name="password"
				placeholder="••••••••"
				required
				class="border outline-none dark:border-gray-600 dark:bg-gray-700"
			/>
		</Label>
	</div>
	<div>
		<Label class={labelClass}>
			<span>Confirm password</span>
			<Input
				type="password"
				name="confirm-password"
				placeholder="••••••••"
				required
				class="border outline-none dark:border-gray-600 dark:bg-gray-700"
			/>
		</Label>
	</div>
</AuthForm>
