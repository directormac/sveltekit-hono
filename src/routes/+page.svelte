<script lang="ts">
	import type { PageData } from './$types';

	type Props = {
		data: { user: PageData['user'] | null };
	};

	let { data }: Props = $props();
	let user = $state<Props['data']['user']>(data.user);
</script>

<h1>Welcome to SvelteKit</h1>

<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#if user}
	<p>welcome back, {user.name}!</p>
	<form method="POST" action="/api/auth/logout">
		<input type="submit" value="logout" />
	</form>
{/if}
