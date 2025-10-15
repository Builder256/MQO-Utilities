<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';

	import MQOExtractor from '../MQOExtractor';
	const objectExtractor = new MQOExtractor();

	let text = $state('');
	let file: FileList | undefined = $state();
	$inspect(file);

	async function extractObjects() {
		if (!file) return;
		if (file.length < 1) return;
		const arrayBuffer = await file[0].arrayBuffer();
		const textDecoder = new TextDecoder('shift-jis');
		const mqoText = textDecoder.decode(arrayBuffer);

		const result = objectExtractor.extractObject(mqoText);

		text = result.join('\n');
	}
</script>

<div class="my-8 grid grid-cols-12 gap-6">
	<div class="col-span-12 flex flex-col gap-8">
		<hgroup class="text-center">
			<h1 class="text-5xl font-bold">MQO Utilities</h1>
			<p class="mt-4">MQOファイルの加工に便利なユーティリティソフト</p>
		</hgroup>

		<h2 class="text-2xl font-bold">まずはMQOファイルをアップロードしよう</h2>
		<div class="col-span-12 grid w-full max-w-sm items-center gap-4">
			<Label for="file">MQOファイルをアップロード</Label>
			<Input id="file" type="file" accept=".mqo" bind:files={file} />
		</div>
	</div>
	<Separator class="col-span-12" />
	<hgroup class="col-span-12">
		<h2 class="text-2xl font-bold">オブジェクト名一覧</h2>
		<p class="mt-4">MQOファイルに含まれるオブジェクト名の一覧</p>
	</hgroup>

	<Button onclick={extractObjects}>抽出</Button>

	<Tabs.Root value="account" class="col-span-12 w-full">
		<Tabs.List>
			<Tabs.Trigger value="plaintext">プレーンテキスト</Tabs.Trigger>
			<Tabs.Trigger value="structured-view">構造化ビュー</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="plaintext">
			<Textarea bind:value={text} class="h-[60vh] w-full" />
		</Tabs.Content>
		<Tabs.Content value="structured-view">まだないよ</Tabs.Content>
	</Tabs.Root>
</div>
