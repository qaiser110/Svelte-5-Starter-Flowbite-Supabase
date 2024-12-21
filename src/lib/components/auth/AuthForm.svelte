<script lang="ts">
	import { enhance } from '$app/forms';
	import { A, Checkbox, Button, Card, Hr } from 'flowbite-svelte';
	import LogoComponent from '../ui/LogoComponent.svelte';

	export let title: string;
	export let loading: boolean = false;
	export let loadingBtnTitle: string;
	export let handleSubmit;
	export let haveAccount: boolean = false;
	export let acceptTerms: boolean = false;
	export let forgotPassword: boolean = false;
	export let btnTitle = 'Submit';
	let isTermsAccepted = !acceptTerms; // Track Checkbox state

	const termsLink = '/';
	const loginLink = '/login';
	const forgotPasswordLink = '/forgot-password';

	const mainClass = 'bg-gray-50 dark:bg-gray-900 w-full';
	const mainDivClass =
		'flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900';
	('flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white');
	const cardH1Class = 'text-2xl mb-6 font-bold text-gray-900 dark:text-white';
	const haveAccountDivClass = 'text-sm font-medium text-gray-500 dark:text-gray-400';
</script>

<main class={mainClass}>
	<div class={mainDivClass}>
		<LogoComponent />
		<!-- Card -->
		<Card class="w-full" size="md" border={false}>
			<h1 class={cardH1Class}>
				{title}
			</h1>
			<slot name="oauth" />
			<Hr />
			<form class="mt-6 space-y-6" method="POST" use:enhance={handleSubmit}>
				<slot />
				{#if acceptTerms}
					<Checkbox class="pt-1" name="accept" bind:checked={isTermsAccepted}>
						<span>
							I accept the <A href={termsLink}>Terms and Conditions</A>
						</span>
					</Checkbox>
				{/if}
				<Button
					disabled={(loading && !!loadingBtnTitle) || !isTermsAccepted}
					type="submit"
					size="lg"
				>
					{loading && !!loadingBtnTitle ? loadingBtnTitle : btnTitle}
				</Button>
				{#if forgotPassword}
					<div class={haveAccountDivClass}>
						Forgot Password? <A href={forgotPasswordLink}>Request Password Reset</A>
					</div>
				{/if}
				{#if haveAccount}
					<div class={haveAccountDivClass}>
						Already have an account? <A href={loginLink}>Login here</A>
					</div>
				{/if}
			</form>
		</Card>
	</div>
</main>
