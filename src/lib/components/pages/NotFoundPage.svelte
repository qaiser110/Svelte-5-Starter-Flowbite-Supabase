<script lang="ts">
	import { imagesPath } from '@/utils/variables';
	import { P } from 'flowbite-svelte';
	import BackToHome from '@/components/ui/buttons/BackToHome.svelte';
	export let title = 'Page not found';
	export let description =
		'Oops! Looks like you followed a bad link. If you think this is a problem with us, please	tell us.';
	export let image = {
		src: imagesPath('404.svg', 'illustrations'),
		alt: 'astronaut',
	};
	export let mainClass = 'bg-gray-50 dark:bg-gray-900';
	export let mainDivClass =
		'flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900';
	export let h1Class =
		'mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white';
	export let imgDiv = 'block md:max-w-lg';
	export let div2Class = 'text-center xl:max-w-4xl';
</script>

<main class={mainClass}>
	<div class={mainDivClass}>
		<div class={imgDiv}>
			<img src={image.src} alt={image.alt} />
		</div>
		<div class={div2Class}>
			<h1 class={h1Class}>
				{title}
			</h1>
			<P class="mb-5 text-base font-normal text-gray-500 dark:text-gray-400 md:text-lg">
				{description}
			</P>
			<BackToHome />
		</div>
	</div>
</main>
