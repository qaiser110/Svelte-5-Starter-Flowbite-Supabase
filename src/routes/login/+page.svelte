<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import AuthForm from '$lib/components/auth/AuthForm.svelte';
	import OauthSignIn from '$lib/components/auth/OauthSignIn.svelte';
	import MetaTag from '$lib/components/MetaTag.svelte';
	import LogoComponent from '$lib/components/ui/LogoComponent.svelte';
	import { Card, Hr } from 'flowbite-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	$effect(() => {
		if ($page.data.user) {
			goto('/');
		}
	});

	console.log('$page.data', $page.data);

	const title: string = 'Sign in / Register';
	const path: string = '/login';
	const description: string = 'Sign in or Register to platform';

	const mainClass = 'bg-gray-50 dark:bg-gray-900 w-full pt-6';
	const mainDivClass =
		'flex flex-col items-center justify-center px-6 pt-6 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900';
	const cardH1Class = 'mb-6 text-2xl font-bold text-gray-900 dark:text-white';
	const hrClass = 'my-4 text-2xl font-bold text-gray-900 dark:text-white';
</script>

<MetaTag {path} {description} {title} ogImageTitle={title} />

<main class={mainClass}>
	<div class={mainDivClass}>
		<LogoComponent />

		<Card class="w-full" size="md" border={false}>
			<h1 class={cardH1Class}>
				{title}
			</h1>

			<OauthSignIn />

			<Hr {hrClass} />

			<AuthForm {data} />
		</Card>
	</div>
</main>
