<script lang="ts">
	import type { PageData } from './$types';
	import { client } from '$lib/client';

	type Props = {
		data: { user: PageData['user'] | null };
	};

	let { data }: Props = $props();
	let user = $state<Props['data']['user']>(data.user);

	const healthcheck = async () => {
		const req = await client.api.healthcheck.$get();
		return await req.text();
	};
</script>

<h1>Welcome to SvelteKit</h1>

<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#if user}
	<p>welcome back, {user.name}!</p>
	<form method="POST" action="/api/auth/logout">
		<input type="submit" value="logout" />
	</form>
{:else}
	<p>No account yet? <a href="/signup">Signup here</a></p>
	<p>Already have an account? <a href="/login">Login here</a></p>
{/if}

{#await healthcheck() then ok}
	Server is {ok}
{/await}
