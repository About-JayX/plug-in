import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'
import copy from 'rollup-plugin-copy'

const createScript = () => {
  const dir = resolve(__dirname, 'src/script')
  const files = fs.readdirSync(dir)
  const input: Record<string, string> = {}

  files.forEach(file => {
    if (file.endsWith('.ts')) {
      const name = file.replace(/\.ts$/, '')
      input[`script/${name}`] = resolve(dir, file)
    }
  })

  return input
}

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
        ...createScript(),
      },
      output: {
        entryFileNames: chunk => {
          if (chunk.name.includes('script')) return '[name].js'

          return '[name]/index.js'
        },

        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
})
