<script lang="ts">
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import FileTree from './FileTree.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { slide } from 'svelte/transition';
	let { item: obj, nested } = $props();
	let expandChild = $state(true);
	const nest = new Array(nested);
	const hasChildObj = obj.childObjects.length > 0;

	function toggleExpansion() {
		expandChild = !expandChild;
	}
</script>

<div class="">
	<div class="flex h-12">
		<div class="grid w-8 place-items-center">
			<Checkbox></Checkbox>
		</div>
		{#each nest}
			<div class="size-12"></div>
		{/each}
		{#if hasChildObj}
			<div class="grid size-12 place-items-center">
				<Button variant="outline" size="icon-sm" onclick={toggleExpansion}>
					{#if expandChild}
						<ChevronDownIcon></ChevronDownIcon>
					{:else}
						<ChevronRightIcon></ChevronRightIcon>
					{/if}
				</Button>
			</div>
		{:else}
			<div class="size-12"></div>
		{/if}
		<div class="grid place-items-center ps-2">
			{obj.name}
		</div>
	</div>

	{#if hasChildObj && expandChild}
		<div class="" transition:slide={{ duration: 150 }}>
			{#each obj.childObjects as childObject}
				<FileTree item={childObject} nested={nested + 1}></FileTree>
			{/each}
		</div>
	{/if}
</div>
