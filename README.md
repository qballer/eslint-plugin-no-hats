# eslint-plugin-no-hats

fixed versions only for deps

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-no-hats`:

```sh
npm install eslint-plugin-no-hats --save-dev
```

## Usage

Add `no-hats` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "no-hats"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "no-hats/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


