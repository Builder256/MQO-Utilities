<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>MQO Utilities</title>
	<link rel="icon" href={favicon} />
</svelte:head>
<main class="mx-auto max-w-7xl">
	{@render children?.()}
</main>

<footer class="w-full bg-zinc-700 py-6">
	<div class="mx-auto flex max-w-7xl flex-col gap-6 px-4">
		<span class="text-xl font-bold">MQO Utilities</span>
		<Separator></Separator>
		<div class="flex flex-col justify-between sm:flex-row">
			<span>&copy; 2025 Builder. All Rights Reserved.</span>
			<span>
				This site is built with
				<a
					href="https://github.com/sveltejs/svelte"
					class="text-indigo-300 underline hover:no-underline"
					target="_blank"
					rel="noopener">Svelte</a
				>,
				<a
					href="https://github.com/sveltejs/kit"
					class="text-indigo-300 underline hover:no-underline"
					target="_blank"
					rel="noopener">SvelteKit</a
				>
				and
				<a
					href="https://shadcn-svelte.com/"
					class="text-indigo-300 underline hover:no-underline"
					target="_blank"
					rel="noopener">shadcn-svelte</a
				>.
			</span>
		</div>
	</div>
</footer>
