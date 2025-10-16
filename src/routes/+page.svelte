<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';

	import MQOExtractor from '../MQOExtractor';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import FileTree from './FileTree.svelte';

	let fileList: FileList | undefined = $state();
	let text = $state('');
	let objTree: ObjectStructure[] = $state([]);
	// $inspect(objTree);

	import type { ObjectStructure } from '../MQOExtractor';

	async function extractObjects() {
		if (!fileList) return;
		if (fileList.length < 1) return;
		const arrayBuffer = await fileList[0].arrayBuffer();
		const textDecoder = new TextDecoder('shift-jis');
		const mqoText = textDecoder.decode(arrayBuffer);

		const objectExtractor = new MQOExtractor();
		text = objectExtractor.extractObjectList(mqoText).join('\n');
		objTree = objectExtractor.extractObject(mqoText);
	}
</script>

<div class="my-6 grid grid-cols-12 gap-6 px-4">
	<div class="col-span-12 flex flex-col gap-8">
		<hgroup class="text-center">
			<h1 class="text-5xl font-bold">MQO Utilities</h1>
			<p class="mt-4">MQOファイルの加工に便利なユーティリティソフト</p>
		</hgroup>

		<Separator class="col-span-12" />

		<Card.Root class="col-span-12">
			<Card.Header>
				<Card.Title>
					<h2 class="text-2xl font-bold">MQOファイルをアップロード</h2>
				</Card.Title>
				<Card.Description>
					<span class=""> 加工するMQOファイルをアップロードする </span>
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="col-span-12 grid w-full max-w-sm items-center gap-4">
					<Label for="file">MQOファイルをアップロード</Label>
					<Input id="file" type="file" accept=".mqo" bind:files={fileList} />
				</div>
			</Card.Content>
		</Card.Root>
	</div>

	<Card.Root class="col-span-12">
		<Card.Header>
			<Card.Title>
				<h2 class="text-2xl font-bold">オブジェクト名一覧</h2>
			</Card.Title>
			<Card.Description>
				<span class="">MQOファイルに含まれるオブジェクト名の一覧</span>
			</Card.Description>
			<Card.Action>
				<Button onclick={extractObjects}>抽出</Button>
			</Card.Action>
		</Card.Header>
		<Card.Content class="flex flex-col gap-4">
			<Tabs.Root value="structured-view" class="col-span-12 w-full">
				<Tabs.List>
					<Tabs.Trigger value="plaintext">プレーンテキスト</Tabs.Trigger>
					<Tabs.Trigger value="structured-view">構造化ビュー</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="plaintext">
					<Textarea bind:value={text} class="h-64 w-full" />
				</Tabs.Content>
				<Tabs.Content
					value="structured-view"
					class="overflow-hidden rounded-lg border border-(--border)"
				>
					<div class="flex h-10 bg-(--border)">
						<div class="grid w-8 place-items-center">
							<Checkbox />
						</div>
						<div class="w-12"></div>
						<div class="grid place-items-center ps-2 text-sm font-bold">オブジェクト名</div>
					</div>
					{#each objTree as file}
						<FileTree item={file} nested={0}></FileTree>
					{/each}
				</Tabs.Content>
			</Tabs.Root>
		</Card.Content>
	</Card.Root>
</div>
