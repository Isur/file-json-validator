# File Json Validator

This npm package is designed to simplify the comparison of directory structures and JSON files within them.
Whether you're managing translation files with directory per language or any other scenario where maintaining consistent file structures is crucial. This tool will help you in your project.

# Example use case

If you have translation files in json where each language has its own directory you can use it to check if all languages has the same file structure and all keys in json files.

Example:

```json
"scripts": {
  "translations-check": "fjv compare ./public/locales en",
  "translations-check:warn": "fjv compare ./public/locales en --only-warn",
  "translations-check-specific": "fjv dir ./public/locales/en ./public/locales/pl"
}
```

And run as

```bash
pnpm run translations-check
```

Can be used also in the CI - if there are any errors it will exit with error.

# Features

- Directory structure comparison - quickly compare if pointed directories has the same files.
- JSON file key comparison - compare JSON's to check if their structure is the same (this compares only keys, not the values!).

# Demo

![demo.gif](./demo.gif)

# Instalation

To install simply use your package manager to install `file-json-validator`.

```bash
pnpm add file-json-validator
```

# Usage

## CLI

### Commands

| Command       | Description                                               |
| ------------- | --------------------------------------------------------- |
| `fjv compare` | Compare content of directories inside selected directory. |
| `fjv dir`     | Compare selected directories.                             |
| `fjv json`    | Compare selected json files.                              |

### Flags:

| Flag                 | Description                                    | Command                  |
| -------------------- | ---------------------------------------------- | ------------------------ |
| `--only-warn`        | Do not exit with error if there are any diffs. | `compare`, `dir`, `json` |
| `--show-only-errors` | Show only errors.                              | `compare`, `dir`, `json` |
| `--only-structure`   | Check only file structure.                     | `compare`, `dir`         |
| `--only-json`        | Check only json structure.                     | `compare`, `dir`         |

## Commands description

### Compare

Compare content of directories inside selected directory. It will check if all directories have the same json files and if the json files has the same structures. First argument is path to the directory and the second one is the main directory that others will be compared to.

If your files are structured like this:

```bash
./public
└── locales
    ├── en
    │   ├── buttons.json
    │   └── common.json
    ├── ger
    │   ├── buttons.json
    │   └── common.json
    └── pl
        └── common.json

```

Then using this:

```bash
fjv compare ./public/locales en
```

Will compare the directories `ger` and `pl` and its files with the main one `en`.

If any of the directories has different files or the files has different structure, it will show the differences and will exit with an error.

If you don't want it to exit with error you can use `--only-warn` flag.

If you don't want to see confirmation `==> OK` and only see errors/warnings you can use `--show-only-errors` flag.

If you want to check only the file structure, you can use `--only-structure` flag.

If you want to check only the json structure, you can use `--only-json` flag.

Example output:

```bash
Directory structure: (1 errors)
./public/locales/pl
         -buttons.json
./public/locales/ger  ==> OK
Json content: (3 errors)
./public/locales/ger/buttons.json  ==> OK
./public/locales/pl/common.json  ==> OK
./public/locales/ger/common.json
         -calc.minus
         -calc.equal
         +no
```

### Dir

If you want to compare selected directories you can use `dir` command. It will work the same as the `compare` command, but you can select directories to compare.

```bash
fjv dir ./public/locales/en ./public/locales/ger ./public/locales/pl
```

Example output:

```bash
Directory structure: (1 errors)
./public/locales/pl
         -buttons.json
./public/locales/ger  ==> OK
Json content: (3 errors)
./public/locales/ger/buttons.json  ==> OK
./public/locales/pl/common.json  ==> OK
./public/locales/ger/common.json
         -calc.minus
         -calc.equal
         +no
```

### Json

If you want to compare selected json files you can use `json` command. It will work the same as the `compare` command, but you can select json files to compare.

```bash
fjv json ./public/en/buttons.json ./public/ger/buttons.json ./public/pl/buttons.json
```

Example output:

```bash
Json: (3 errors)
./public/pl/common.json  ==> OK
./public/ger/common.json
         -calc.minus
         -calc.equal
         +no
```

## API

There are exported functions that you can import in your project:

```ts
import {
  compareJsonsInDirs,
  compareDirectoriesContent,
  compareJsonsFiles,
  compareJsonObjects,
} from "file-json-validator";
```

- `compareJsonsInDirs` - compare json files in directories.
- `compareDirectoriesContent` - check if directories has the same files.
- `compareJsonsFiles` - compare json files.
- `compareJsonObjects` - compare json objects.

There are provided types for those functions.
