# 使用 `cxz-ui`

本节介绍如何在项目中使用 cxz-ui。

# 环境支持

::: tip 当前封装所使用的库版本
- vue: `3.4.+`
- element-plus: `2.7.+`
:::

## 安装

### 1.使用包管理器

```shell
# npm
npm install xxx

# yarn
yarn add xxx

# pnpm
pnpm install xxx
```

## 快速开始

### 1.完整引入

```ts
// main.ts
import { createApp } from 'vue'
import CxzUI from '@cxzvue/cxz-ui'
// import '@cxzvue/cxz-ui/lib/index.css'

const app = createApp(App)

app.use(CxzUI)
```
### 2.按需引入
需要在使用组件的地方手动对 `cxz-ui` 进行导入。

```html
<!-- App.vue -->
<template>
  <cxz-button>按钮</cxz-button>
</template>

<script setup lang="ts">
  import { CxzButton } from '@cxzvue/cxz-ui'
</script>
```

## 注意事项
::: danger 关于原生库
组件库打包时会对第三方包如 `vue`、`element-plus` 进行 `externals` 处理，所以需要保证使用组件库的项目中导入必要的第三方库。
:::












