<script lang="ts">
	import { imagesPath } from '$lib/utils/variables';
	import { P } from 'flowbite-svelte';
	import BackToHome from '$lib/components/ui/buttons/BackToHome.svelte';
	export let title = 'Under Maintenance';
	export let description =
		'Sorry for the inconvenience but we’re performing some maintenance at the moment. If you need to you can always <a href="/" class="text-primary-700 hover:underline dark:text-primary-500">contact us</a>, otherwise we’ll be back online shortly!.';
	export let image = {
		src: imagesPath('illustrations/maintenance.svg'),
		alt: 'maintenance',
	};
	export let mainClass = 'bg-gray-50 dark:bg-gray-900';
	export let mainDivClass =
		'flex flex-col justify-center items-center px-6 mx-auto h-screen xl:px-0 dark:bg-gray-900';
	export let h1Class =
		'mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white';
	export let imgDiv = 'block mb-5 md:max-w-md';
	export let div2Class = 'text-center xl:max-w-4xl';
</script>

<main class={mainClass}>
	<div class={mainDivClass}>
		<div class={imgDiv}>
			<img src={image.src} alt={image.alt} />
		</div>
		<div class={div2Class}>
			<h1 class={h1Class}>{title}</h1>
			<P class="mb-5 text-base font-normal text-gray-500 dark:text-gray-400 md:text-lg">
				{@html description}
			</P>
			<BackToHome />
		</div>
	</div>
</main>
