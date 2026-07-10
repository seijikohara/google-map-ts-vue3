import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

const name = 'google-map-ts-vue3'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.json',
      processor: 'vue',
      include: ['src/components/**/*.ts', 'src/components/**/*.vue'],
      bundleTypes: true
    })
  ],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/components/index.ts', import.meta.url)),
      name,
      formats: ['es'],
      fileName: () => `${name}.js`
    },
    sourcemap: true,
    rollupOptions: {
      external: ['vue']
    }
  }
})
