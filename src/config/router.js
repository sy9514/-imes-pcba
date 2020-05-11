import Vue from 'vue'
import Router from 'vue-router'
import { Toast } from 'vant'
import store from '../store'

Vue.use(Router)

const routes = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    name: 'demo',
    component: () => import('@/pages/DemoPage'),
    meta: {
      title: '测试页面',
      auth: true
    }
  },
  {
    name: 'home',
    component: () => import('@/pages/HomePage'),
    meta: {
      title: '首页',
      auth: true
    }
  },
  {
    name: 'settings',
    component: () => import('@/pages/account/SettingPage'),
    meta: {
      title: '设置',
      auth: true
    }
  },
  {
    name: 'account/sign',
    component: () => import('@/pages/account/SignInPage'),
    meta: {
      title: '账号登录'
    }
  },
  {
    name: 'errors',
    component: () => import('@/pages/account/ErrorPage'),
    meta: {
      title: '错误上报'
    }
  },
  {
    name: 'printer',
    component: () => import('@/pages/account/PrinterPage'),
    mate: { title: '打印机设置' }
  }
]

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '')
})

const router = new Router({ routes })

router.beforeEach((to, from, next) => {
  //const title = to.meta && to.meta.title
  const auth = to.meta && to.meta.auth
  // if (title) {
  //   document.title = title
  // }
  // alert(JSON.stringify(store.getters.signed))
  // alert(JSON.stringify(auth))
  //console.log(store.getters)
  if (auth && !store.getters.signed) {
    Toast.fail('请先登录.')
    next({
      path: '/account/sign',
      query: { redir: to.fullPath }
    })
  } else {
    next()
  }
})



export { router }
