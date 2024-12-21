<script lang="ts">
	import { Alert } from 'flowbite-svelte';
	import { CheckCircleSolid, ExclamationCircleSolid, InfoCircleSolid } from 'flowbite-svelte-icons';
	import type { SvelteComponent } from 'svelte';

	type AlertType = 'success' | 'warn' | 'error' | 'dark' | 'blue';

	interface $$Props {
		type: AlertType;
		color?: string;
		border?: boolean;
		dismissable?: boolean;
		icon?: boolean | typeof SvelteComponent;
	}
	/**
	 * Props for the Alert component
	 * @typedef {Object} AlertProps
	 * @property {'success' | 'warn' | 'error' | 'dark' | 'blue'} type - The type of alert
	 * @property {string} [color] - Optional custom color override from flowbite-svelte
	 * @property {boolean} [border=false] - Whether to show border
	 * @property {boolean} [dismissable=false] - Whether alert can be dismissed
	 * @property {boolean | ComponentType<SvelteComponent>} [icon=false] - Icon to display (true for default, or custom icon component)
	 */
	interface Props {
		type: AlertType;
		color?: Color;
		border?: boolean;
		dismissable?: boolean;
		icon?: boolean | typeof SvelteComponent;
		children: any;
	}

	type Color = 'red' | 'yellow' | 'green' | 'blue' | 'dark';
	// Map alert types to colors if no custom color is provided
	const typeToColor: Record<AlertType, Color> = {
		success: 'green',
		warn: 'yellow',
		error: 'red',
		dark: 'dark',
		blue: 'blue',
	};

	let { type, color, border = true, dismissable = true, icon = true, children }: Props = $props();

	// Determine which icon to use
	let IconComponent: any = $state(null);
	if (icon) {
		if (typeof icon === 'boolean') {
			switch (type) {
				case 'success':
					IconComponent = CheckCircleSolid;
					break;
				case 'warn':
				case 'error':
					IconComponent = ExclamationCircleSolid;
					break;
				default:
					IconComponent = InfoCircleSolid;
					break;
			}
		} else {
			IconComponent = icon;
		}
	}

	let derivedColor: Color = $derived(color || typeToColor[type as AlertType]);
</script>

<Alert color={derivedColor} {border} {dismissable}>
	<svelte:fragment slot="icon">
		{#if IconComponent}
			<IconComponent class="h-5 w-5" />
		{/if}
	</svelte:fragment>
	{@render children()}
</Alert>

<!-- 
// Basic usage
<AlertBox type="success">Success message</AlertBox>

// With custom color 
<AlertBox type="warn" color="yellow">Warning message</AlertBox>

// With border and dismissable 
<AlertBox type="error" border dismissable>Error message</AlertBox>

// With default icon 
<AlertBox type="success" icon>Success with checkmark icon</AlertBox>

// With custom icon 
<Alert type="warn" icon={ExclamationCircleSolid}>Custom icon AlertBox</Alert>
-->
