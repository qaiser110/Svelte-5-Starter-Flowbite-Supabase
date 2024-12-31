<script lang="ts">
	import { EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons';
	import { Button, Label, Input, InputAddon, ButtonGroup } from 'flowbite-svelte';

	interface Props {
		name: string;
		label: string;
		placeholder?: string;
		required?: boolean;
	}

	let { name, label, placeholder = '', required = true }: Props = $props();

	let show = $state(false);
</script>

<div>
	<Label class="mb-2">{label}</Label>
	<ButtonGroup class="w-full">
		<InputAddon>
			<button onclick={() => (show = !show)} class="pointer-events-auto">
				{#if show}
					<EyeOutline class="h-6 w-6" />
				{:else}
					<EyeSlashOutline class="h-6 w-6" />
				{/if}
			</button>
		</InputAddon>
		<Input {name} type={show ? 'text' : 'password'} {placeholder} {required} />
	</ButtonGroup>
</div>
