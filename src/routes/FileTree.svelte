<script lang="ts">
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import FileTree from './FileTree.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	let { item: obj, nested } = $props();
	const nest = new Array(nested);
	const hasChildObj = obj.childObjects.length > 0;
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
				<Button variant="outline" size="icon-sm">
					<ChevronRightIcon></ChevronRightIcon>
				</Button>
			</div>
		{:else}
			<div class="size-12"></div>
		{/if}
		<div class="grid place-items-center ps-2">
			{obj.name}
		</div>
	</div>

	<div class="">
		{#each obj.childObjects as childObject}
			<FileTree item={childObject} nested={nested + 1}></FileTree>
		{/each}
	</div>
</div>
