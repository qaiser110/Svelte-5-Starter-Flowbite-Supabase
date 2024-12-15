<script lang="ts">
	import ForgotPassword from '../utils/auth/ForgotPassword.svelte';
	import { Label, Input, Checkbox, A } from 'flowbite-svelte';
	import MetaTag from '../utils/MetaTag.svelte';
	const onSubmit = (e: Event) => {
		const formData = new FormData(e.target as HTMLFormElement);

		const data: Record<string, string | File> = {};
		for (const field of formData.entries()) {
			const [key, value] = field;
			data[key] = value;
		}
		console.log(data);
	};

	const title: string = 'Welcome';
	const subtitle: string = 'Forgot password';

	export let title = 'Create a Free Account';
	export let site = {
		name: 'Flowbite1',
		img: '/images/icon-logo.svg',
		link: '/',
		imgAlt: 'FlowBite Logo1',
	};
	export let mainClass = 'bg-gray-50 dark:bg-gray-900 w-full';
	export let mainDivClass =
		'flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900';
	export let siteLinkClass =
		'flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white';
	export let siteImgClass = 'mr-4 h-11';
	export let cardH1Class = 'text-2xl mb-6 font-bold text-gray-900 dark:text-white';
	export let haveAccountDivClass = 'text-sm font-medium text-gray-500 dark:text-gray-400';
</script>

<main class={mainClass}>
	<div class={mainDivClass}>
		<a href={site.link} class={siteLinkClass}>
			<img src={site.img} class={siteImgClass} alt={site.imgAlt} />
			<span>{site.name}</span>
		</a>

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
				{#if haveAccount}
					<div class={haveAccountDivClass}>
						Already have an account? <A href={loginLink}>Login here</A>
					</div>
				{/if}
			</form>
		</Card>
	</div>
</main>

<MetaTag {path} {description} {title} {subtitle} />

<ForgotPassword on:submit={onSubmit}>
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
	<Checkbox class="gap-1">I accept the <A href="/">Terms and Conditions</A></Checkbox>
</ForgotPassword>
