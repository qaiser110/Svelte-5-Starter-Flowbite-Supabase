<script lang="ts">
	import { page } from '$app/stores';
	import LnkLogin from '@/components/links/LnkLogin.svelte';
	import MessagePage from '@/components/pages/MessagePage.svelte';
</script>

<MessagePage>
	{#snippet title()}Logged out!{/snippet}
	{#snippet subtitle()}You've been logged out.{/snippet}
	<LnkLogin loginText={'Click here to sign in again'} />
</MessagePage>
