<script lang="ts">
	import { enhance } from '$app/forms';
	import type { MappedErrors } from '@types';

	let { form } = $props();

	let currentTime = $state('');
	let errors = $state<MappedErrors>();
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
		if (form && form.errors && typeof form.errors === 'object') {
			errorFields = form.errors.fields;
			message = form.errors.message;
		} else if (form && typeof form.errors === 'string') {
			message = form.errors;
		}
	});
</script>

<h2>Login Page</h2>

{currentTime}

<form method="POST" use:enhance>
	<div class="form-group">
		<label for="username">Username</label>
		<input name="username" type="text" required />
		{#if errorFields && errorFields.username}
			<p>{errorFields.username}</p>
		{/if}
	</div>

	<div class="form-group">
		<label for="email">Email</label>
		<input name="email" type="email" required />
		{#if errorFields && errorFields.email}
			<p>{errorFields.email}</p>
		{/if}
	</div>

	<div class="form-group">
		<label for="name">Name</label>
		<input name="name" type="text" required />
		{#if errorFields && errorFields.name}
			<p>{errorFields.name}</p>
		{/if}
	</div>

	<div class="form-group">
		<label for="password">Password</label>
		<input name="password" type="password" required />
		{#if errorFields && errorFields.password}
			<p>{errorFields.password}</p>
		{/if}
	</div>
	<input type="submit" value="Sign Up" />
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
