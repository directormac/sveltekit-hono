<script lang="ts">
	let { children } = $props();

	let currentTime = $state('');
	$effect(() => {
		const eventSource = new EventSource('/api/time');

		eventSource.onmessage = (event) => {
			currentTime = event.data;
		};

		return () => {
			eventSource.close();
		};
	});
</script>

{@render children()}
<p>{currentTime}</p>
