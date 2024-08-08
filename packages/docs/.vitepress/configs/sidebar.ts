import { DefaultTheme } from 'vitepress/theme'

const sidebar: DefaultTheme.Sidebar = {
  '/zh-CN/guide/': [
    {
      text: '使用介绍',
      collapsed: false,
      items: [
        { text: '快速开始', link: '/zh-CN/guide/cxz-ui-install'}
      ]
    },
    {
      text: '开发者指南',
      collapsed: false,
      items: [
        { text: '开发指南', link: '/zh-CN/guide/cxz-ui-dev'}
      ]
    }
  ],
  '/zh-CN/components/cxz-ui': [
    {
      text: '组件',
      items: [
        { text: 'Button', link: '/zh-CN/components/cxz-ui/cxz-button' },
        { text: 'Table', link: '/zh-CN/components/cxz-ui/cxz-table' }
      ]
    }
  ],
  '/zh-CN/examples/': [
    {
      text: 'Examples',
      items: [
        { text: 'Markdown Examples', link: '/zh-CN/examples/markdown-examples' },
        { text: 'Runtime API Examples', link: '/zh-CN/examples/api-examples' }
      ]
    }
  ]
}

export default sidebar
