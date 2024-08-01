import * as fs from 'fs'
import vue from 'rollup-plugin-vue'
import esbuild from 'rollup-plugin-esbuild'
import alias from '@rollup/plugin-alias'
import image from '@rollup/plugin-image'
import { resolve } from 'path'
import { deleteSync } from 'del'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import pxtovw from 'postcss-px-to-viewport-8-plugin'
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'
import postcssurl from 'postcss-url'
import { compile } from 'vue'

const inputDir = resolve(process.cwd(), './src/components')
const inputs = fs.readdirSync(inputDir)
deleteSync(`es/**/*`)
const config = inputs.map((name: string) => {
  return {
    input: resolve(process.cwd(), `./src/components/${name}/index.ts`),
    plugins: [
      nodeResolve(),
      alias({
        entries: [
          {
            find: '@czx-ui',
            replacement: resolve(process.cwd(), './src')
          }
        ]
      }),
      vue({
        target: 'browser'
      }),
      esbuild({
        minify: false,
        target: 'es2015'
      }),
      typescript({
        tsconfigOverride: {
          exclude: ['node_modules', 'dist', 'es', 'lib'],
        },
        check: false,
        abortOnError: false
      }),
      postcss({
        extract: true,
        minimize: true,
        plugins: [
          // pxtovw({
          //   viewportWidth: 375,
          // }),
          postcssurl({ url: 'inline' })
        ]
      }),
      image(),
    ],
    output: {
      format: 'es',
      file: `es/${name}/index.js`,
      assetFileNames: `es/${name}/index.css`
    },
    treeshake: true,
    external: ['vue', 'element-plus'],
  }
})

export default config