import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const name = 'google-map-ts-vue3'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/components/index.ts', import.meta.url)),
      name,
      formats: ['es', 'umd'],
      fileName: (format) => (format === 'es' ? `${name}.js` : `${name}.${format}.cjs`)
    },
    sourcemap: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
