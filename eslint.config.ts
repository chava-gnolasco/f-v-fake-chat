import pluginVitest from '@vitest/eslint-plugin'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import { globalIgnores } from 'eslint/config'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import pluginCypress from 'eslint-plugin-cypress'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    rules: {
      'no-unused-vars': 'off', // Disable default ESLint unused vars
      '@typescript-eslint/no-unused-vars': 'off', // Disable TS unused vars
      'vue/no-unused-vars': 'off', // Disable Vue unused vars
      'vue/no-unused-components': 'off', // Disable unused component deletion
    },
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  
  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },
  
  {
    ...pluginCypress.configs.recommended,
    files: [
      'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
      'cypress/support/**/*.{js,ts,jsx,tsx}'
    ],
  },
  skipFormatting,
)
