# DomFetchTest

DomFetchTest is a small test suite designed to validate and demonstrate the behavior of the **@maze014/dom-fetch** npm package.  
It focuses on verifying how HTML can be fetched and parsed from both URLs and local files, and how different output formats behave.

This repository is intended as a companion test project for **@maze014/dom-fetch**, not as a replacement for its documentation.

---

## Purpose

The goal of this project is to:

- Ensure `@maze014/dom-fetch` can fetch and parse HTML from **URLs** and **local files**
- Validate supported `output` formats
- Validate supported `source` options
- Confirm correct error handling for unsupported or invalid configurations

All tests are written using **Vitest**.

---

## Installation

Clone the repository and install dependencies:

```bash
$ npm install
```

---

## Getting Started

Run the test suite with:

```bash
$ npm run test
```

---

## Test Overview

The tests focus on the `selectElements` function exported by `@maze014/dom-fetch`:

```ts
selectElements(source, selector, options?)
```

### Parameters

- **source** (`string`)  
  A URL or a file path to an HTML document.

- **selector** (`string`)  
  A CSS selector used to target elements.

- **options** (`object`, optional)
  - `output`: Defines the format of returned data
  - `source`: Defines where the HTML comes from

If no `source` option is provided, it defaults to `"url"`.

---

## Supported Options

### `source`

| Value | Description |
|------|------------|
| `url` | Fetch HTML from a remote URL |
| `file` | Fetch HTML from a local file |

### `output`

| Value | Description | Returned Type |
|------|------------|---------------|
| `html` | Raw HTML of each matched element | `string` |
| `children` | Children HTML/text of each element | `string` |
| `object` | Parsed DOM object | `object` |
| `breakdown` | Detailed element structure (tag, text, attributes, children) | `object` |

---

## Successful Test Cases

The test suite verifies that:

- HTML can be fetched from a **URL**
- HTML can be fetched from a **local file**
- Multiple output formats return the expected data type
- The `breakdown` output can:
  - Return the target element itself
  - Return child elements
  - Extract text from nested elements
- Omitting the `source` option defaults to `"url"`

Example:

```ts
const data = await selectElements(
  "./tests/helloWorld.html",
  "body > *",
  { output: "breakdown", source: "file" }
);
```

### specs (✓ succeeding (12))

- ✓ can fetch html from url  423ms
- ✓ can fetch from file 114ms
- ✓ can fetch from string 9ms
- ✓ object can fetch elements of object 7ms
- ✓ children can fetch elements of string 7ms
- ✓ html can fetch elements of string 6ms
- ✓ breakdown can fetch elements of object 12ms
- ✓ can fetch the target element elements via the 'breackdown' output option 6ms
- ✓ can fetch the targeted tags via the 'breackdown' output option 13ms
- ✓ can fetch text from all same elements via the' breackdown' output option 12ms
- ✓ can fetch from an url because with :: no source option defined falls back to 'url' 157ms
- ✓ can fetch from SPA with headless server  3548ms

---

## Failing Test Cases

The test suite also ensures proper error handling when:

- An unsupported `output` option is provided
- An unsupported `source` option is provided
- Invalid combinations of `output` and `source` are used
- A URL cannot be parsed
- A local file does not exist

Each failing case is expected to throw a meaningful error message.

### specs (✓ failings (13))

- ✓ cannot fetch because :: output option not supported with config [output:fake, source:file] against (./tests/nodeJS.html) 79ms
- ✓ cannot fetch because :: output option not supported with config [output:, source:file]
- against (./tests/nodeJS.html)102ms
- ✓ cannot fetch because :: output option not supported with config [output:HTML, source:file]against (./tests/nodeJS.html) 69ms
- ✓ cannot fetch because :: output option not supported with config [output:fake, source:url] against (https://nodejs.org/en/learn/getting-started/introduction-to-nodejs) 144ms
- ✓ cannot fetch because :: source option not supported with config [output:html, source:fake] against (./tests/nodeJS.html) 0ms
- ✓ cannot fetch because :: source option not supported with config [output:children, source:fake] against (./tests/nodeJS.html) 0ms
- ✓ cannot fetch because :: source option not supported with config [output:object, source:fake] against (./tests/nodeJS.html) 0ms
- ✓ cannot fetch because :: source option not supported with config [output:breakdown, source:fake] against (./tests/nodeJS.html) 0ms
- ✓ cannot fetch because :: source option not supported with config [output:fake, source:fake] against (./tests/nodeJS.html) 0ms
- ✓ cannot fetch because :: source option not supported with config [output:, source:] against (./tests/nodeJS.html) 0ms
- ✓ cannot fetch because :: no content read with config [output:html, source:string] against (null) 0ms
- ✓ cannot fetch because :: Failed to parse URL with config [output:html, source:url] against (./tests/nodeJS.html) 0ms
- ✓ cannot fetch because :: no such file with config [output:html, source:file] against (https://nodejs.org/en/learn/getting-started/introduction-to-nodejs) 0ms

---

## Test Artifacts

Some tests write temporary HTML files during execution.  
These files are automatically cleaned up after all tests complete.

---

## Tools Used

- **Vitest** – Test runner
- **Node.js fs module** – Temporary file handling
- **@maze014/dom-fetch** – HTML fetching and DOM selection

---

## License

This project is provided for testing and demonstration purposes only.  
Refer to the **@maze014/dom-fetch** package for its licensing information.
