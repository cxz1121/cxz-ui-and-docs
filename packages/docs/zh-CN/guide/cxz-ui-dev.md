# 开发 `cxz-ui` 组件

## 一、开发环境

1. 进入组件项目: `package/cxz-ui`
2. 安装依赖: `pnpm install`
3. 执行命令: `pnpm dev`

dev 端口: 3333

## 二、开发组件流程

- 组件目录位于 `package/cxz-ui/src/components`, 参照已有组件进行新组件开发。

1. 单个组件中，提供 `index` 组件入口。并使用 `withInstall` 方法包装组件（用于注册组件），具体代码如下。

```js
import { withInstall } from '@cxz-ui/utils'
import cxzButton from './index.vue'

const CxzButton = withInstall(cxzButton)
export { CxzButton }
export default CxzButton
```
2. 在当前组件项目 `src` 目录的入口 `index.ts` 中导出组件。

```js
import { CxzButton } from './components/cxz-button'
import { App } from 'vue'

export const components = [
  CxzButton
]

export default {
  version: '1.0.0',
  isInstall: false,
  install: function (app: App) {
    if(this.isInstall) return
    components.forEach(comp => {
      app.use(comp)
    })
    this.isInstall = true
  }
}
```

## 三、组件开发规范

1. 组件与 scss 样式分离，当前样式写在 `style` 文件夹里面的 index.scss，组件库统一样式入口放在目录下的 style/index.js。

- template:

```html
<template>
  <div class="cxz-button">
    <el-button :type="btnType" :size="size" v-bind="$attrs">
      <slot></slot>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from "element-plus"
import './style'
//...
</script>
```

2. 组件 scss 建议最外层建议使用独有前缀名称包裹起来，避免污染样式。

- template:

```html
<template>
  <div class="cxz-button">
  </div>
</template>
```

- index.scss:
```css
.cxz-button {
  // 样式
}
```

## 四、组件开发注意事项

1. 不要把不需要的文件引入到项目，文件按需引入

## 五、demo组件注意事项

开发调试的时候，使用 demo 目录里面的组件来调试，项目启动 dev 时，访问的是 demo 组件，而非 components 目录下的组件。

路由文件：`package/cxz-ui/src/router/index.ts`

1. components 目录下的组件，在 demo 目录也要创立对应的 **文件**，以组件名称为文件名称。
2. demo 组件以 **组件名** 的方式进行命名，如 `cxz-button`
3. 添加路由，在 components 和 demo 目录也要创立对应的 **文件** 组件后，在路由里注册，然后开发调试。

```js
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/cxz-table'
    },
    {
      path: '/cxz-button',
      name: 'cxzButton',
      component: () => import('@cxz-ui/demo/cxz-button.vue')
    },
    {
      path: '/cxz-table',
      name: 'cxzTable',
      component: () => import('@cxz-ui/demo/cxz-table.vue')
    }
  ]
})

export default router
```
