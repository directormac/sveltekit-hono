<script lang="ts">
	import { enhance } from '$app/forms';
	import type { MappedErrors } from '@types';

	let { form } = $props();

	let currentTime = $state('');
	let message = $state('');
	let errorFields = $state<MappedErrors>();

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
		if (form && typeof form.errors === 'object') {
			errorFields = form.errors.fields;
			message = form.errors.message;
		} else if (form && typeof form.errors === 'string') {
			message = form.errors;
		}
	});
</script>

<h2>Login Page</h2>

<p>{currentTime}</p>

<form method="POST" use:enhance>
	{#if message}
		<p>{message}</p>
	{/if}

	<div class="form-group">
		<label for="key">Username/Email </label>
		<input name="key" type="text" />
		{#if errorFields && errorFields.key}
			<p>{errorFields.key}</p>
		{/if}
	</div>

	<div class="form-group">
		<label for="password">Password</label>
		<input name="password" type="password" />
		{#if errorFields && errorFields.password}
			<p>{errorFields.password}</p>
		{/if}
	</div>
	<input type="submit" value="Login" />
</form>

<style>
	form {
		width: 400px;
		gap: 1rem;
		display: flex;
		flex-direction: column;
	}
	.form-group {
		display: flex;
		flex-direction: column;
	}
</style>
