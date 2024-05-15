<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();

	let currentTime = $state('');
	let message = $state('');

	$effect(() => {
		const eventSource = new EventSource('/api/time');

		eventSource.onmessage = (event) => {
			currentTime = event.data;
		};

		return () => {
			eventSource.close();
		};
	});

	$effect(() => {
		if (form && form.message) {
			message = form.message as string;
		}
	});
</script>

<h2>Login Page</h2>

<p>{currentTime}</p>

<form method="POST" use:enhance>
	{#if message}
		<p>{message}</p>
	{/if}
	<label for="key">Username/Email </label>
	<input name="key" type="text" />
	<p></p>
	<label for="password">Password</label>
	<input name="password" type="password" />
	<p></p>
	<input type="submit" value="Login" />
</form>

<style>
	form {
		width: 400px;
		gap: 1rem;
		display: flex;
		flex-direction: column;
	}
</style>
