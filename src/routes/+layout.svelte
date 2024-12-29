<script lang="ts">
	import '../app.css';
	let { children, data } = $props();

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-sonner';

	let { supabase, session } = data;

	// $: ({ supabase, session } = data);
	$effect(() => {
		supabase = data.supabase;
		session = data.session;
	});

	$inspect(`$inspect > user.email: ${data.user?.email}`);

	onMount(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => authListener.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<Toaster richColors />

{@render children()}
