<script lang="ts">
	import { A, Checkbox, Button, Card, Hr } from 'flowbite-svelte';

	const site = {
		name: 'Flowbite1',
		img: '/images/icon-logo.svg',
		link: '/',
		imgAlt: 'FlowBite Logo1',
	};

	export let title: string;
	export let haveAccount: boolean = false;
	export let acceptTerms: boolean = false;
	export let forgotPassword: boolean = false;
	export let btnTitle = 'Submit';

	const termsLink = '/';
	const loginLink = '/login';
	const forgotPasswordLink = '/forgot-password';

	const mainClass = 'bg-gray-50 dark:bg-gray-900 w-full';
	const mainDivClass =
		'flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900';
	const siteLinkClass =
		'flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white';
	const siteImgClass = 'mr-4 h-11';
	const cardH1Class = 'text-2xl mb-6 font-bold text-gray-900 dark:text-white';
	const haveAccountDivClass = 'text-sm font-medium text-gray-500 dark:text-gray-400';
</script>

<main class={mainClass}>
	<div class={mainDivClass}>
		<a href={site.link} class={siteLinkClass}>
			<img src={site.img} class={siteImgClass} alt={site.imgAlt} />
			<span>{site.name}</span>
		</a>
		<!-- Card -->
		<Card class="w-full" size="md" border={false}>
			<h1 class={cardH1Class}>
				{title}
			</h1>
			<slot name="oauth" />
			<Hr />
			<form class="mt-6 space-y-6" on:submit|preventDefault>
				<slot />
				{#if acceptTerms}
					<Checkbox class="pt-1" name="accept">
						<span>
							I accept the <A href={termsLink}>Terms and Conditions</A>
						</span>
					</Checkbox>
				{/if}
				<Button type="submit" size="lg">{btnTitle}</Button>
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
