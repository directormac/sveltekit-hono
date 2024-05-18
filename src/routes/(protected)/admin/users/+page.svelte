<script lang="ts">
	let { data } = $props();

	console.log(data.users);
</script>

{JSON.stringify(data.users)}
