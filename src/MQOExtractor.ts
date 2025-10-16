interface ObjectStructure {
	name: string;
	childObjects: ObjectStructure[];
}

interface ParsedObject {
	name: string;
	depth: number;
}

export default class MQOExtractor {
	/**
	 * 改行コード
	 * MQOの仕様によって改行コードはCRLFのはず
	 * git管理すると勝手に変換されちゃうかも？
	 */
	private static readonly NEW_LINE: '\r\n';
	public objectNames: string[];

	constructor() {
		this.objectNames = [];
	}

	public extractObjectList(mqoText: string): string[] {
		const objects = this.extractObject(mqoText);

		for (const object of objects) {
			this.listName(object);
		}

		console.log(this.objectNames);
		return this.objectNames;
	}

	private listName(obj: ObjectStructure) {
		this.objectNames.push(obj.name);
		if (obj.childObjects.length > 0) {
			for (const childObj of obj.childObjects) {
				this.listName(childObj);
			}
		}
	}

	public extractObject(mqoText: string): ObjectStructure[] {
		const objects = this.parseMQO(mqoText);
		if (objects.length === 0) return [];

		const result: ObjectStructure[] = [];
		const stack: { obj: ObjectStructure; depth: number }[] = [];

		for (const object of objects) {
			const newObj: ObjectStructure = {
				name: object.name,
				childObjects: []
			};

			while (stack.length > 0 && stack[stack.length - 1].depth >= object.depth) {
				stack.pop();
			}

			if (stack.length === 0) {
				result.push(newObj);
			} else {
				stack[stack.length - 1].obj.childObjects.push(newObj);
			}

			stack.push({ obj: newObj, depth: object.depth });
		}
		return result;
	}

	private parseMQO(mqoText: string): ParsedObject[] {
		const lines = mqoText.split(MQOExtractor.NEW_LINE);
		const parsedObjects: ParsedObject[] = [];

		let currentObject: { name: string; depth: number | null } | null = null;

		for (const line of lines) {
			if (line.startsWith('Object "')) {
				currentObject = {
					name: line.split('"')[1],
					depth: null
				};
			}

			const isDepthLine = line.startsWith('\tdepth');
			if (isDepthLine && currentObject && currentObject.depth === null) {
				const depth = parseInt(line.split('\tdepth ')[1], 10);
				currentObject.depth = depth;
				parsedObjects.push({
					name: currentObject.name,
					depth: currentObject.depth
				});
				currentObject = null;
			}
		}
		return parsedObjects;
	}
}
