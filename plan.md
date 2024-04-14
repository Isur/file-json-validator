# PLAN

# TODO

- [ ] Finish the CLI
- [ ] Add tests
- [ ] Move the logic from the CLI to the library
  - [ ] src/lib/

## CLI

### Commands

| Command       | Description                                               |
| ------------- | --------------------------------------------------------- |
| `fjv compare` | Compare content of directories inside selected directory. |
| `fjv dir`     | Compare selected directories.                             |
| `fjv json`    | Compare selected json files.                              |

### Flags:

| Flag               | Description                                    | Command                  |
| ------------------ | ---------------------------------------------- | ------------------------ |
| `--only-warn`      | Do not exit with error if there are any diffs. | `compare`, `dir`, `json` |
| `--only-structure` | Check only file structure.                     | `compare`, `dir`         |
| `--only-json`      | Check only json structure.                     | `compare`, `dir`         |

## Commands description

### Compare

Compare content of directories inside selected directory. It will check if all directories have the same json files and if the json files has the same structures. First argument is path to the directory and the second one is the main directory that others will be compared to. It does not look in nested directories yet!

If your files are structured like this:

```bash
./public
└── locale
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

If you want to check only the file structure, you can use `--only-structure` flag.

If you want to check only the json structure, you can use `--only-json` flag.

Example output:

```bash
Validate file structure:
File structure: 1 error(s)
./public/locale/pl
         -buttons.json
./public/locale/ger  ==> OK
Validate jsons structure:
Json files: 3 error(s)
./public/locale/ger/buttons.json  ==> OK
./public/locale/pl/common.json  ==> OK
./public/locale/ger/common.json
         -calc.minus
         -calc.equal
         +no
```

### Dir

If you want to compare selected directories you can use `dir` command. It will work the same as the `compare` command, but you can select directories to compare.

```bash
fjv dir ./public/locale/en ./public/locale/ger ./public/locale/pl
```

Example output:

```bash
Validate file structure:
File structure: 1 error(s)
./public/locale/pl
         -buttons.json
./public/locale/ger  ==> OK
Validate jsons structure:
Json files: 3 error(s)
./public/locale/ger/buttons.json  ==> OK
./public/locale/pl/common.json  ==> OK
./public/locale/ger/common.json
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
Validate jsons structure:
Json files: 3 error(s)
./public/pl/common.json  ==> OK
./public/ger/common.json
         -calc.minus
         -calc.equal
         +no
```
