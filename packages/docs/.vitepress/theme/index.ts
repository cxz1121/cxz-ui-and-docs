// https://vitepress.dev/guide/custom-theme
import { h, Component } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import { globals } from '../components'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    globals.forEach((comp: Component) => {
      app.component(comp.name as string, comp)
    })
  }
} satisfies Theme
