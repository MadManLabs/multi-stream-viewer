import Vue from 'vue'
import VueRouter, { Location, Route, RouteConfig } from 'vue-router'
import { makeHot, reload } from './util/hot-reload'

const homeComponent = () => import('./components/home').then(({ HomeComponent }) => HomeComponent)
const aboutComponent = () => import('./components/about').then(({ AboutComponent }) => AboutComponent)
const listComponent = () => import('./components/list').then(({ ListComponent }) => ListComponent)
const viewerComponent = () => import('./components/viewer').then(({ ViewerComponent }) => ViewerComponent)
// const homeComponent = () => import(/* webpackChunkName: 'home' */'./components/home').then(({ HomeComponent }) => HomeComponent)
// const aboutComponent = () => import(/* webpackChunkName: 'about' */'./components/about').then(({ AboutComponent }) => AboutComponent)
// const listComponent = () => import(/* webpackChunkName: 'list' */'./components/list').then(({ ListComponent }) => ListComponent)
if (process.env.ENV === 'development' && module.hot) {
  const homeModuleId = './components/home'
  const aboutModuleId = './components/about'
  const listModuleId = './components/list'
  const viewerModuleId = './components/viewer'

  // first arguments for `module.hot.accept` and `require` methods have to be static strings
  // see https://github.com/webpack/webpack/issues/5668
  makeHot(homeModuleId, homeComponent,
    module.hot.accept('./components/home', () => reload(homeModuleId, (require('./components/home') as any).HomeComponent)))

  makeHot(aboutModuleId, aboutComponent,
    module.hot.accept('./components/about', () => reload(aboutModuleId, (require('./components/about') as any).AboutComponent)))

  makeHot(listModuleId, listComponent,
    module.hot.accept('./components/list', () => reload(listModuleId, (require('./components/list') as any).ListComponent)))

  makeHot(viewerModuleId, viewerComponent,
    module.hot.accept('./components/viewer', () => reload(viewerModuleId, (require('./components/viewer') as any).ViewerComponent)))
}

Vue.use(VueRouter)

export const createRoutes: () => RouteConfig[] = () => [
  {
    path: '/',
    component: homeComponent
  },
  {
    path: '/about',
    component: aboutComponent
  },
  {
    path: '/list',
    component: listComponent
  },
  {
    path: '/viewer',
    component: viewerComponent
  }
]

export const createRouter = () => new VueRouter({ mode: 'history', routes: createRoutes() })
