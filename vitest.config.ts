import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { playwright } from '@vitest/browser-playwright'

const browserProject = (browserName: 'chromium' | 'firefox' | 'webkit') => ({
  extends: true,
  test: {
    name: browserName,
    include: ['test/**/*.test.ts'],
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [{ browser: browserName }]
    }
  }
})

export default defineConfig({
  plugins: [vue()],
  test: {
    projects: [browserProject('chromium'), browserProject('firefox'), browserProject('webkit')]
  }
})
