<script lang="ts">
	import { enhance } from '$app/forms';
	import type { MappedErrors } from '@types';

	let { form } = $props();

	let currentTime = $state('');
	let errors = $state<MappedErrors>();

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
		if (form && form.errors) {
			errors = form.errors as MappedErrors;
		}
	});
</script>

<h2>Login Page</h2>

{currentTime}

<form method="POST" use:enhance>
	<div class="form-group">
		<label for="username">Username</label>
		<input name="username" type="text" required />
		{#if errors && errors.username}
			<p>Errors</p>
		{/if}
	</div>

	<div class="form-group">
		<label for="email">Email</label>
		<input name="email" type="email" required />
		{#if errors && errors.email}
			<p>{errors.email}</p>
		{/if}
	</div>

	<div class="form-group">
		<label for="name">Name</label>
		<input name="name" type="text" required />
		{#if errors && errors.name}
			<p>{errors.name}</p>
		{/if}
	</div>

	<div class="form-group">
		<label for="password">Password</label>
		<input name="password" type="password" required />
		{#if errors && errors.password}
			<p>{errors.password}</p>
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
