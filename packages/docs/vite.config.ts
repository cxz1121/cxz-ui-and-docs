import { defineConfig } from 'vite'
import sourceCode from './plugins/source-code'
import { join } from 'path'

export default defineConfig({
  plugins: [sourceCode()],
  // server: {
  //   host: '0,0,0,0',
  //   proxy: {
  //     '/assets': {
  //       target: 'http://localhost:8080',
  //       changeOrigin: true
  //     }
  //   }
  // },
  // resolve: {
  //   alias: [
  //     {
  //       find: '@/',
  //       replacement: join(__dirname, '/')
  //     }
  //   ]
  // }
})