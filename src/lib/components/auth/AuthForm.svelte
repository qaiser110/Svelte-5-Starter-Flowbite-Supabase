<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { LoginType } from '@/schemas/auth';
	import {
		A,
		Alert,
		Button,
		Checkbox,
		Helper,
		Input,
		Label,
		Span,
		Spinner,
		TabItem,
		Tabs,
	} from 'flowbite-svelte';
	import { ClipboardSolid, InfoCircleSolid, UserCircleSolid } from 'flowbite-svelte-icons';
	import { toast } from 'svelte-sonner';
	import { fly, scale } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms';
	// import SuperDebug from 'sveltekit-superforms';

	let { data } = $props();

	const { form, errors, enhance, reset, allErrors, submitting } = superForm(data.form, {
		resetForm: true,
		onUpdated({ form }) {
			console.log('onUpdated > form.message', form.message);
			if (form.message) {
				if (form.message.text) toast.success(form.message.text);
				if (form.message.redirectTo) goto(form.message.redirectTo);
			}
		},
	});

	const typeParam = $page.url.searchParams.get('type');
	let loginType = $state(typeParam === 'magic-link' ? LoginType.pwdLess : LoginType.login);

	let isPasswordless: boolean = $state(typeParam === 'magic-link');

	$effect(() => {
		$form.loginType = loginType;
	});

	function changeLoginType(newloginType: string) {
		const email = $form.email;
		reset();
		$form.email = email;

		if (newloginType?.startsWith('register')) {
			$form.loginType = newloginType;
		} else {
			$form.loginType = isPasswordless ? LoginType.pwdLess : LoginType.login;
		}
		console.log('changeLoginType to > ', $form.loginType);
	}

	function togglePasswordless() {
		isPasswordless = !isPasswordless;
		changeLoginType('');
	}
</script>

<!-- <SuperDebug data={$form} /> -->

<Tabs tabStyle="underline">
	<TabItem open onclick={() => changeLoginType('')}>
		<div slot="title" class="flex items-center gap-2">
			<UserCircleSolid size="md" />
			Login
		</div>
		{#if $form.loginType === LoginType.pwdLess}
			<p>
				Enter your Email to sign in without password.
				<Span
					onclick={togglePasswordless}
					underline
					style="cursor: pointer;"
					decorationClass="decoration-blue-500">Login with password.</Span
				>
			</p>
		{:else}
			<p>
				Enter your Email and password.
				<Span
					onclick={togglePasswordless}
					underline
					style="cursor: pointer;"
					decorationClass="decoration-blue-500">Login with without password.</Span
				>
			</p>
		{/if}
	</TabItem>

	<TabItem onclick={() => changeLoginType(LoginType.register)}>
		<div slot="title" class="flex items-center gap-2">
			<ClipboardSolid size="md" />
			Register
		</div>
		{#if $form.loginType === LoginType.register}
			<p>
				Sign up with your Email.
				<Span
					onclick={() => changeLoginType(LoginType.registerMobile)}
					underline
					style="cursor: pointer;"
					decorationClass="decoration-blue-500">Sign up with mobile number</Span
				>
			</p>
		{:else}
			<p>
				Sign up with your mobile number.
				<Span
					onclick={() => changeLoginType(LoginType.register)}
					underline
					style="cursor: pointer;"
					decorationClass="decoration-blue-500">Sign up with email</Span
				>
			</p>
		{/if}
	</TabItem>
</Tabs>

{#if $allErrors.length}
	<ul transition:fly>
		<Alert class="!items-start">
			<span slot="icon">
				<InfoCircleSolid class="h-5 w-5" />
				<span class="sr-only">Info</span>
			</span>
			<p class="font-medium">Errors on this form:</p>
			<ul class="ms-4 mt-1.5 list-inside list-disc">
				{#each $allErrors as error}
					<li>
						{#if error.path !== '_errors'}
							<b>{error.path}:</b>
						{/if}
						{error.messages.join('. ')}
					</li>
				{/each}
			</ul>
		</Alert>
	</ul>
{/if}

<form class="space-y-6" method="POST" action="?/login" use:enhance>
	<input type="hidden" name="loginType" bind:value={$form.loginType} />
	{#if $form.loginType === LoginType.registerMobile}
		<div class="mb-6">
			<Label for="phone" class="mb-2 block dark:text-white">Your mobile number</Label>
			<Input name="phone" id="phone" placeholder="+61333444555" bind:value={$form.phone} />
			{#if $errors?.phone}
				<Helper class="mt-2" color="red">
					<span class="font-medium">{$errors.phone}</span>
				</Helper>
			{/if}
		</div>
	{:else}
		<div class="mb-6">
			<Label for="email" class="mb-2 block dark:text-white">Your email</Label>
			<Input
				type="email"
				name="email"
				id="email"
				placeholder="name@company.com"
				bind:value={$form.email}
			/>
			{#if $errors?.email}
				<Helper class="mt-2" color="red">
					<span class="font-medium">{$errors.email}</span>
				</Helper>
			{/if}
		</div>
	{/if}

	<!-- password -->

	{#if $form.loginType !== LoginType.pwdLess}
		<div class="relative h-[84px]">
			<div class="absolute w-full" transition:fly={{ y: 20, duration: 300 }}>
				<Label for="password" class="mb-2 block dark:text-white">Your password</Label>
				<Input
					type="password"
					name="password"
					id="password"
					placeholder="••••••••"
					bind:value={$form.password}
				/>
				{#if $errors?.password}
					<Helper class="mb-4 mt-2" color="red">
						<span class="font-medium">{$errors.password}</span>
					</Helper>
				{/if}
			</div>
		</div>
	{/if}

	{#if !loginType?.startsWith('register')}
		<div class="mt-6 flex items-center gap-2">
			<Checkbox
				id="passwordless"
				bind:checked={isPasswordless}
				onchange={() => changeLoginType(LoginType.pwdLess)}
			/>
			<Label for="passwordless" class="dark:text-white">Sign in without password</Label>
		</div>

		<div class="flex items-start">
			<Checkbox class="accent-primary-600" name="remember">Remember me</Checkbox>
			<A href="/forgot-password" aClass="ml-auto text-sm">Lost Password?</A>
		</div>
	{/if}

	<Button disabled={$submitting} type="submit" size="lg">
		{#if $submitting}
			<Spinner class="me-3" size="4" color="white" />Submitting ...
		{:else if $form.loginType?.startsWith('register')}
			Register
		{:else}
			Login
		{/if}
	</Button>
</form>
