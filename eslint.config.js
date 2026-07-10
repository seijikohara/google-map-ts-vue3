import vueEslintParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'
import pluginVue from 'eslint-plugin-vue'
import oxlint from 'eslint-plugin-oxlint'

const vueEssential = pluginVue.configs['flat/essential'].map((config) => ({
  ...config,
  files: ['**/*.vue']
}))

export default [
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  },

  ...vueEssential,

  {
    name: 'app/vue-typescript-parser',
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.vue']
      }
    }
  },

  {
    name: 'app/custom-rules',
    files: ['**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'warn'
    }
  },

  ...oxlint.buildFromOxlintConfigFile('./.oxlintrc.json')
]
