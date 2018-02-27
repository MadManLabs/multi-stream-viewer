import Vue from 'vue'
import VueRouter, { Location, Route, RouteConfig } from 'vue-router'
import { makeHot, reload } from './util/hot-reload'

const homeComponent = () => import('./components/routes/home').then(({ HomeComponent }) => HomeComponent)
const aboutComponent = () => import('./components/routes/about').then(({ AboutComponent }) => AboutComponent)
const listComponent = () => import('./components/routes/list').then(({ ListComponent }) => ListComponent)
const viewerComponent = () => import('./components/routes/viewer').then(({ ViewerComponent }) => ViewerComponent)
// const homeComponent = () => import(/* webpackChunkName: 'home' */'./components/routes/home').then(({ HomeComponent }) => HomeComponent)
// const aboutComponent = () => import(/* webpackChunkName: 'about' */'./components/routes/about').then(({ AboutComponent }) => AboutComponent)
// const listComponent = () => import(/* webpackChunkName: 'list' */'./components/routes/list').then(({ ListComponent }) => ListComponent)
if (process.env.ENV === 'development' && module.hot) {
  const homeModuleId = './components/routes/home'
  const aboutModuleId = './components/routes/about'
  const listModuleId = './components/routes/list'
  const viewerModuleId = './components/routes/viewer'

  // first arguments for `module.hot.accept` and `require` methods have to be static strings
  // see https://github.com/webpack/webpack/issues/5668
  makeHot(homeModuleId, homeComponent,
    module.hot.accept('./components/routes/home', () => reload(homeModuleId, (require('./components/routes/home') as any).HomeComponent)))

  makeHot(aboutModuleId, aboutComponent,
    module.hot.accept('./components/routes/about', () => reload(aboutModuleId, (require('./components/routes/about') as any).AboutComponent)))

  makeHot(listModuleId, listComponent,
    module.hot.accept('./components/routes/list', () => reload(listModuleId, (require('./components/routes/list') as any).ListComponent)))

  makeHot(viewerModuleId, viewerComponent,
    module.hot.accept('./components/routes/viewer', () => reload(viewerModuleId, (require('./components/routes/viewer') as any).ViewerComponent)))
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
