<script lang="ts">
	import '../app.css';
	let { children, data } = $props();

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	let { supabase, session } = data;

	// $: ({ supabase, session } = data);
	$effect(() => {
		supabase = data.supabase;
		session = data.session;
	});

	// console.log('~~~~~ $inspect(data);');
	$inspect(`$inspect ~~~~~ user: ${data.user?.email}`);
	// $inspect({
	// 	user: data.user?.email,
	// 	// session: data.session,
	// });

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

{@render children()}
