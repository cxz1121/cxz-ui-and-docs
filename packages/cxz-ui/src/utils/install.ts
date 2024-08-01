import type { Plugin, App } from 'vue'

declare type Component = {
  name: string
}

declare type CXZWithInstall<T> = T & Plugin & Component

export const withInstall = <T extends Component>(comp: T) => {
  (comp as CXZWithInstall<T>).install = (app: App) => {
    app.component(comp.name, comp as CXZWithInstall<T>)
  }
  return comp as CXZWithInstall<T>
}
