import { DefaultTheme } from 'vitepress/theme'

const nav: DefaultTheme.NavItem[] = [
  { text: '指南', link: '/zh-CN/guide/cxz-ui-install', activeMatch: '/zh-CN/guide/' },
  { text: '组件', link: '/zh-CN/components/cxz-ui/cxz-button', activeMatch: '/zh-CN/components/cxz-ui' },
  { text: 'Home', link: '/' },
  { text: 'Examples', link: '/zh-CN/examples/markdown-examples', activeMatch: '/zh-CN/examples/' }
]

export default nav