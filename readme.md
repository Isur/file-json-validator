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

Bin: `fjv`.

`fjv ./public/en ./public/pl ./public/ger`

First argument for app will use direcotry as main and compare other to it.

In project you can use it as script in your `package.json`. Example:

```json
"scripts": {
  "translations-check": "fjv ./public/en ./public/ger ./public/pl ./public/fr",
  "translations-check:warn": "fjv ./public/en ./public/ger ./public/pl ./public/fr --only-warn"
}
```

`--only-warn` flag make the script will not exit with error even if there are some errors. It will just warn about them.

And run as

```bash
npm run translations-check
```

Can be used also in the CI - if there are any errors it will exit with error.
