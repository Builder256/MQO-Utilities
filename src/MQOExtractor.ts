export default class MQOExtractor {
	constructor() {}

	extractObject(mqoText: string): string[] {
		let result: string[] = [];
		const lines = mqoText.split('\r\n');
		for (const line of lines) {
			if (!line.startsWith('Object "')) continue;
			result.push(line.split('"')[1]);
		}
		console.log(result);
		return result;
	}
}
