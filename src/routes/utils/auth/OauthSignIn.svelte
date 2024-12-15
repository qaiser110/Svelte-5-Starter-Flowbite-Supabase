<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { FacebookSolid, GoogleSolid } from 'flowbite-svelte-icons';

	// https://flowbite-svelte.com/docs/components/buttons
</script>

<div class="mb-4 flex justify-between lg:ml-4 lg:mt-0">
	<Button size="lg">
		<GoogleSolid class="me-2 h-5 w-5" /> Sign in with Google
	</Button>
	<Button size="lg">
		<FacebookSolid class="me-2 h-5 w-5" /> Sign in with Facebook
	</Button>
</div>
