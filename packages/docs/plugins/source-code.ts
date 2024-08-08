import * as path from 'path'
import * as fsPromises from 'fs/promises'
import type { Plugin } from 'vite'

const Prism = require('prismjs')
const loadLanguages = require('prismjs/components/index')

loadLanguages(['markup', 'css', 'javascript'])

const packagePath = path.resolve(__dirname, '../../../packages')
const sourceCode = (): Plugin => {
  return {
    name: 'source-code',
    async transform(code, id) {

      const mdFile = '.md'
      if(!id.includes(mdFile)) return
      console.log('__源文件__:\n',code, '\n__路径__:', id);

      const reg = /source-code="(.*)"/g
      if(!code.match(reg)) return

      const match: any = code.match(reg)?.map((_) => {
        const [packageName, compPath] = sourceSplit(_)
        console.log('__packageName__:',packageName, '\n__compPath__:', compPath);
        return fsPromises.readFile(path.resolve(packagePath, `${packageName}/src/demo/${compPath}.vue`), 'utf-8')
      })
      const filesRes = await Promise.all(match)

      let i = 0;
      return code.replace(reg, (str) => {
        const [packageName, compPath] = sourceSplit(str)
        const compPathStrArr = compPath.split('/')
        const iframeSrc = compPathStrArr[compPathStrArr.length - 1]
        const file = filesRes[i]
        i++
        return `source-code="${encodeURIComponent(
          wrap(Prism.highlight(file, Prism.languages.markup, 'markup'))
        )}" raw-source="${encodeURIComponent(file)}" lib-type="${packageName}" iframe-src="${iframeSrc}"`
      })
    }
  }
}

function wrap (code: string) {
  return `<pre v-pre><code>${code}</code></pre>`
}

function sourceSplit(_: string) {
  const res = /.*?source-code="(.*)"/.exec(_)
  const originPath = res?.[1] || ''
  return originPath.split(':::')
}

export default sourceCode