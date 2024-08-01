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