import { defineConfig } from 'eslint/config';
import eslintJs from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import vueEslintConfigPrettier from '@vue/eslint-config-prettier';
import pluginVue from 'eslint-plugin-vue';
import typescriptEslintParser from '@typescript-eslint/parser';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import vueEslintParser from 'vue-eslint-parser';

export default defineConfig([
  {
    ignores: ['**dist/**', '**node_modules/**'],
  },
  {
    files: ['src/**/*.{js,cjs,ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: vueEslintParser,
      parserOptions: {
        parser: typescriptEslintParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        jsx: true,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    extends: [
      eslintJs.configs.recommended,
      ...tseslint.configs.recommended,
      ...pluginVue.configs['flat/recommended'],
      vueEslintConfigPrettier,
    ],
    plugins: {
      prettier,
    },

    rules: {
      // prettier
      'prettier/prettier': ['warn', { endOfLine: 'auto' }],

      //js
      'no-constant-binary-expression': 'off',
      //

      // eslint
      '@typescript-eslint/no-empty-object-type': 'off',
      'arrow-parens': 'off',
      'import/order': 'off',
      'comma-dangle': 'off',
      'no-console': 'off',
      'no-debugger': 'warn',
      'no-var': 'error',
      'no-unused-vars': 'off',
      'block-scoped-var': 'error',
      'no-param-reassign': 'error',
      'space-before-function-paren': ['off', 'never'],
      'key-spacing': [
        'warn',
        {
          mode: 'minimum',
          beforeColon: false,
          afterColon: true,
        },
      ],
      'arrow-spacing': ['warn'],
      'spaced-comment': ['warn', 'always', { markers: ['/'] }],
      'space-in-parens': ['warn', 'never'],
      'object-curly-spacing': ['warn', 'always'],
      'no-trailing-spaces': 'warn',
      'object-shorthand': ['warn', 'methods'],
      'prefer-template': 'warn',
      'no-useless-concat': 'warn',
      'prefer-const': 'error',
      yoda: ['warn', 'never', { exceptRange: true }],
      quotes: ['warn', 'single', { avoidEscape: true }],
      'max-len': [
        'warn',
        110,
        {
          ignoreComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignorePattern: 'd="([\\s\\S]*?)"|class="([\\s\\S]*?)"|title="([\\s\\S]*?)"',
        },
      ],
      'no-constant-condition': [
        'warn',
        {
          checkLoops: false,
        },
      ],
      'brace-style': ['warn'],
      eqeqeq: ['warn', 'always'],
      camelcase: 'off',

      // typescript-eslint
      '@typescript-eslint/no-unused-vars': ['warn', { vars: 'all', args: 'none' }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',

      // vue
      'vue/v-on-event-hyphenation': [
        'warn',
        'never',
        {
          autofix: false,
          ignore: [],
        },
      ],
      'vue/attribute-hyphenation': 'off',
      'vue/html-self-closing': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/html-indent': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',
      'vue/no-deprecated-model-definition': 'off',
    },
  },
]);
