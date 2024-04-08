# File Json Validator

This npm package is designed to simplify the comparison of directory structures and JSON files within them.
Whether you're managing translation files with directory per language or any other scenario where maintaining consistent file structures is crucial. This tool will help you in your project.

# Features

- Directory structure comparison - quickly compare if pointed directories has the same files.
- JSON file key comparison - compare JSON's to check if their structure is the same (this compares only keys, not the values!).

# Instalation

To install simply use your package manager to install `file-json-validator`.

```bash
pnpm add file-json validator
```

# Usage

## Script

There is bin file `fjv` that can be used:

`fjv ./public/en ./public/pl ./public/ger`

If there are any diffs found app will exit with an error.
If you don't want it to exit with error you can use `--only-warn` flag.

First argument for app will use direcotry as main and compare others to it.

Diffs shown with "+" sign means that this file/key not exists in main dir/file.

Diffs shown with "-" sign means that this file/key exists in main dir/file but not in that we compare.

## API

There are exported function:

```ts
export { niceDisplay, validateDirs, validateFiles };
```

`validateDirs` compare file structure in directory.

`validateFiles` compare file contents in directories.

Both accepts two arguements - path to main directory and array of paths to other directories. Comparion will be made as main vs each one from other.

Errors produced by those can be printed nicely with `niceDisplay`.

# Example use case

If you have translation files in json where each language has its own directory you can use it to check if all languages has the same file structure and all keys in json files.

Example:

```json
"scripts": {
  "translations-check": "fjv ./public/en ./public/ger ./public/pl ./public/fr",
  "translations-check:warn": "fjv ./public/en ./public/ger ./public/pl ./public/fr --only-warn"
}
```

And run as

```bash
pnpm run translations-check
```

Can be used also in the CI - if there are any errors it will exit with error.

# Example result

For such a file structure:

```
$ tree ./public
./public
├── en
│   ├── buttons.json
│   └── common.json
├── ger
│   ├── buttons.json
│   └── common.json
└── pl
    └── common.json
```

Output will be like this:

```
$ node dist/cli.js ./public/en ./public/pl ./public/ger
Validate file structure:
File structure: 1 error(s)
./public/pl
         -buttons.json
./public/ger  ==> OK
Validate jsons structure:
Json files: 3 error(s)
./public/ger/buttons.json  ==> OK
./public/pl/common.json  ==> OK
./public/ger/common.json
         -calc.minus
         -calc.equal
         +no
```
