<script lang="ts">
	let {
		name = 'Site Name',
		logoLinkClass = 'mb-8 flex items-center justify-center text-2xl font-semibold dark:text-white lg:mb-10',
		logoImgClass = 'mr-4 h-11',
		img = '/images/icon-logo.svg',
		imgAlt = 'Site Logo1',
		link = '/',
	}: {
		name?: string;
		logoLinkClass?: string;
		logoImgClass?: string;
		img?: string;
		imgAlt?: string;
		link?: string;
	} = $props();
</script>

<a href={link} class={logoLinkClass}>
	<img src={img} class={logoImgClass} alt={imgAlt} />
	<span>{name}</span>
</a>
