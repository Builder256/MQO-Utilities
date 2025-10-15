<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>MQO Utilities</title>
	<link rel="icon" href={favicon} />
</svelte:head>
<main class="mx-auto max-w-7xl">
	{@render children?.()}
</main>
