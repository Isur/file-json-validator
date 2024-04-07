# File Json Validator

Validate your json files if they have the same structure.

App will work if your files are grouped in directories, e.g. for translations.

For example:

```
en/file.json
ger/file.json
fr/file.json
pl/file.json
```

App will check if all directories will have file `file.json` and if each `file.json` has the same structure as one pointed as main.

# Usage

`file-json-validator ./public/en ./public/pl ./public/ger`

First argument for app will use direcotry as main and compare other to it.
