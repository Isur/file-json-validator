# file-json-validator

## 0.3.0

### Minor Changes

#### Breaking changes

Now instead of

```bash
fjv ./public/locale/en ./public/locale/pl ./public/locale/ger
```

you should use

```bash
fjv dir ./public/locale/en ./public/locale/pl ./public/locale/ger
```

or

```bash
fjv compare ./public/locale en
```

#### CLI Commands

| Command       | Description                                               |
| ------------- | --------------------------------------------------------- |
| `fjv compare` | Compare content of directories inside selected directory. |
| `fjv dir`     | Compare selected directories.                             |
| `fjv json`    | Compare selected json files.                              |

Each commands has flags:

| Flag               | Description                                    | Command                  |
| ------------------ | ---------------------------------------------- | ------------------------ |
| `--only-warn`      | Do not exit with error if there are any diffs. | `compare`, `dir`, `json` |
| `--only-structure` | Check only file structure.                     | `compare`, `dir`         |
| `--only-json`      | Check only json structure.                     | `compare`, `dir`         |

#### API

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

## 0.2.4

### Patch Changes

- API exports and readme update

## 0.2.3

### Patch Changes

- Types generation, tsc, configs, cleanup in repository.

## 0.2.1

### Patch Changes

- Fixed process exit when no errors

## 0.2.0

### Minor Changes

- Added arg for only warn, use it as `--only-warn`

## 0.1.3

### Patch Changes

- Change colors to chalk

## 0.1.1

### Patch Changes

- Added changeset
