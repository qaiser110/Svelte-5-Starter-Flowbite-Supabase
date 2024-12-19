<script lang="ts">
	import { Label, Input, Helper, Checkbox } from 'flowbite-svelte';
	import { fly } from 'svelte/transition';
	import SignIn from '../../utils/auth/SignIn.svelte';
	import OauthSignIn from '@/components/auth/OauthSignIn.svelte';
	import MetaTag from '@/components/MetaTag.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	$effect(() => {
		if ($page.data.user) {
			goto('/');
		}
	});

	const loginType = $page.url.searchParams.get('type');

	let errors = $state.raw({ email: null });
	let isPasswordless: boolean = $state(loginType === 'passwordless');

	const title: string = 'Sign in';
	const path: string = '/login';
	const description: string = 'Sign in  to platform';

	const onSubmit = async (e: Event) => {
		const formData = new FormData(e.target as HTMLFormElement);

		const data: Record<string, string | File> = {};
		for (const field of formData.entries()) {
			const [key, value] = field;
			data[key] = value;
		}
		console.log(data);

		const res = await fetch(`/api/auth/login/${isPasswordless ? 'passwordless' : 'password'}`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' },
		});

		const resJson = await res.json();

		if (!res.ok) {
			console.log('/login.svelte resJson', resJson);
			console.log('res', res);
			if (resJson.errors) {
				errors = { ...errors, ...resJson.errors };
				console.log('errors', errors);
			}
		} else {
			console.log('resJson', resJson);
			goto('/success?ctx=magic-link-sent');
		}
	};
</script>

<MetaTag {path} {description} {title} subtitle={title} />

<SignIn {title} on:submit={onSubmit}>
	<div slot="oauth">
		<OauthSignIn />
	</div>
	<div>
		<Label for="email" color={errors.email ? 'red' : undefined} class="mb-2 dark:text-white">
			Your email
		</Label>
		<Input
			type="email"
			name="email"
			id="email"
			color={errors.email ? 'red' : 'base'}
			placeholder="name@company.com"
			required
			class="border outline-none dark:border-gray-600 dark:bg-gray-700"
		/>
		{#if errors.email}
			<Helper class="mt-2" color="red">{errors.email}</Helper>
		{/if}
	</div>

	<!-- password -->

	<div class="relative h-[70px]">
		{#if !isPasswordless}
			<div class="absolute w-full" transition:fly={{ y: 20, duration: 300 }}>
				<Label for="password" color={errors.email ? 'red' : undefined} class="mb-2 dark:text-white">
					Your password
				</Label>
				<Input
					type="password"
					name="password"
					id="password"
					color={errors.email ? 'red' : 'base'}
					placeholder="••••••••"
					required
					class="border outline-none dark:border-gray-600 dark:bg-gray-700"
				/>
			</div>
		{/if}
	</div>

	<div class="mb-4 flex items-center gap-2">
		<Checkbox id="passwordless" bind:checked={isPasswordless} />
		<Label for="passwordless" class="dark:text-white">Sign in with magic link</Label>
	</div>
</SignIn>
