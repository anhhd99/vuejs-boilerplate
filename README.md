# Setup devlopment

## Add environment

```
cp .env.example .env
```

## Install

```
npm i
```

```
npm run dev
```

## Code quality

Formatting uses Oxfmt with the options in `.oxfmtrc.json`. ESLint checks JavaScript, TypeScript, and Vue rules and reports formatting warnings through `eslint-plugin-oxfmt`; Stylelint checks styles.

```sh
npm run lint
npm run lint:script
npm run lint:format -- --check
npm run lint:format -- --write
npm run lintfix
```

The pre-commit hook checks staged files with the same tools. Formatting failures block commits; ESLint warnings remain warnings.

For VS Code or Cursor, install the workspace's recommended extensions (ESLint, Vue - Official, and Oxc). The committed `.vscode/settings.json` enables ESLint diagnostics while typing, including in `.vue` files, and uses Oxc to format JavaScript, TypeScript, Vue, CSS, and SCSS on save. ESLint quick fixes and `lintfix` use the same Oxfmt configuration. Oxlint is disabled because this project uses ESLint.

`eslint-config-prettier` and `stylelint-config-prettier-scss` remain to disable formatting rules that can conflict with Oxfmt; they do not run Prettier. ESLint's formatting configuration is applied last so earlier rules cannot override it. Formatting warnings now use `oxfmt/oxfmt` instead of `prettier/prettier`, covering the whole Vue file rather than only missing semicolons.
