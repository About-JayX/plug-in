import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import copy from 'rollup-plugin-copy'
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      plugins: [
        copy({
          targets: [
            {
              src: 'src/**/index.html',
              dest: 'dist',
            },
          ],
          flatten: false,
          hook: 'writeBundle',
        }),
      ],
      input: {
        popup: resolve(__dirname, 'src/popup/index.tsx'),
        background: resolve(__dirname, 'src/background/index.ts'),
        content: resolve(__dirname, 'src/content/index.ts'),
      },
      output: {
        entryFileNames: () => {
          return '[name]/index.js'
        },

        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
})
