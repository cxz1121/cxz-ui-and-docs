import { UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
console.log('=========lib build=========');

export default (): UserConfigExport => {
  return {
    plugins: [vue()],
    publicDir: false,
    resolve: {
      alias: [
        {
          find: '@cxz-ui',
          replacement: resolve(process.cwd(), './src')
        }
      ]
    },
    build: {
      cssCodeSplit: false,
      outDir: 'lib',
      emptyOutDir: true,
      lib: {
        entry: resolve(process.cwd(), './src/index.ts'),
        name: 'cxz-ui',
        formats: ['es'],
        fileName: () => 'index.js',
      },
      rollupOptions: {
        output: {
          globals: {
            vue: 'Vue',
          },
          assetFileNames: 'index.css'
        },
        external: ['vue', 'element-plus']
      }
    }
  }
}