import { selectElements } from "@maze014/dom-fetch";
import { readFileSync, unlink, writeFileSync } from "fs";
import { describe, it, expect, afterAll } from "vitest";
describe("succeeding", () => {
	it("can fetch html from url", async () => {
		const data = await selectElements(
			"https://nodejs.org/en/learn/getting-started/introduction-to-nodejs",
			"html",
			{
				output: "html",
				source: "url",
			}
		);
		writeFileSync("./tests/nodeJS.html", data.join(""));
	});

	it("can fetch from file", async () => {
		const data = await selectElements("./tests/nodeJS.html", "main p", {
			output: "html",
			source: "file",
		});
		expect(data.length).toBe(22);
	});

	it("can fetch from string", async () => {
		const html = readFileSync("./tests/helloWorld.html");
		const data = await selectElements(html, "body > *", {
			output: "html",
			source: "string",
		});
		expect(data.length).toBe(4);
	});

	it.each([
		["object", "object"],
		["children", "string"],
		["html", "string"],
		["breakdown", "object"],
	])("%s can fetch elements of %s", async (output, _of) => {
		const data = await selectElements("./tests/helloWorld.html", "body > *", {
			output: output,
			source: "file",
		});
		expect(data.length).toBe(4);
		data.forEach((e) => {
			expect(typeof e).toBe(_of);
		});
	});

	it("can fetch the target element elements via the 'breackdown' output option", async () => {
		const data = await selectElements("./tests/helloWorld.html", "body", {
			output: "breakdown",
			source: "file",
		});
		expect(data.map((e) => e.tag).join(" ")).toBe("body");
	});

	it("can fetch the targeted tags via the 'breackdown' output option", async () => {
		const data = await selectElements("./tests/helloWorld.html", "body > *", {
			output: "breakdown",
			source: "file",
		});
		expect(data.map((e) => e.tag).join(" ")).toBe("h1 p h1 div");
	});

	it("can fetch text from all same elements via the' breackdown' output option", async () => {
		const data = await selectElements("./tests/helloWorld.html", "div ul li", {
			output: "breakdown",
			source: "file",
		});
		expect(data.map((e) => e.text).join(" ")).toBe("Hello World From DomFetch");
	});

	it("can fetch from an url because with :: no source option defined falls back to 'url'", async () => {
		const data = await selectElements(
			"https://nodejs.org/en/learn/getting-started/introduction-to-nodejs",
			"main p"
		);
		expect(data.length).toBe(22);
	});

	it("can fetch from SPA with headless server", async () => {
		const data = await selectElements(
			"https://google.com",
			"svg",
			{source:'headless'}
		);
		expect(data.length).toBe(15);
	});
});
describe("failings", () => {
	it.each([
		["output option not supported", "fake", "file", "./tests/nodeJS.html"],
		["output option not supported", "", "file", "./tests/nodeJS.html"],
		["output option not supported", "HTML", "file", "./tests/nodeJS.html"],
		[
			"output option not supported",
			"fake",
			"url",
			"https://nodejs.org/en/learn/getting-started/introduction-to-nodejs",
		],
		["source option not supported", "html", "fake", "./tests/nodeJS.html"],
		["source option not supported", "children", "fake", "./tests/nodeJS.html"],
		["source option not supported", "object", "fake", "./tests/nodeJS.html"],
		["source option not supported", "breakdown", "fake", "./tests/nodeJS.html"],
		["source option not supported", "fake", "fake", "./tests/nodeJS.html"],
		["source option not supported", "", "", "./tests/nodeJS.html"],
		["no content read", "html", "string", null],
		["Failed to parse URL", "html", "url", "./tests/nodeJS.html"],
		[
			"no such file",
			"html",
			"file",
			"https://nodejs.org/en/learn/getting-started/introduction-to-nodejs",
		],
	])(
		"cannot fetch because :: %s \nwith config [output:%s, source:%s]\nagainst (%s)\n",
		async (description, outputOption, sourceOption, source) => {
			await expect(
				selectElements(source, "main p", {
					output: outputOption,
					source: sourceOption,
				})
			).rejects.toThrow(description);
		}
	);
});

afterAll(() => {
	["nodeJS.html", "paragraphs.html"].forEach((file) => {
		unlink("./tests/" + file, () => {});
	});
});
