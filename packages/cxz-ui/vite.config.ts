import { ConfigEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'
import { resolve } from 'path'

export default ({ mode }: ConfigEnv): UserConfig => {
  const docsbuild: UserConfig = {}
  if (mode === 'docs') {
    docsbuild.base = './',
    docsbuild.build = { outDir: '../../dist/cxz-ui' }
  }
  const userConfig: UserConfig = {
    plugins: [vue(), ElementPlus({ useSource: true })],
    build: {
      rollupOptions: {
        external: ['vue', 'element-plus'],
        output: {
          globals: {
            vue: 'Vue',
          }
        }
      },
      lib: {
        entry: resolve(__dirname, './src/index.ts'),
        name: 'CxzUI',
        fileName: 'cxz-ui',
        formats: ['es', 'cjs'],
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3333
    },
    resolve: {
      alias: [
        {
          find: '@cxz-ui',
          replacement: resolve(__dirname, './src')
        }
      ]
    }
  }
  return Object.assign(userConfig, docsbuild)
}