import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/not-logged',
    component: () => import('@/views/NotLogged/Index.vue'),
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/NotLogged/Login.vue'),
        meta: {
          requireAuth: false,
          metaInfo: {
            title: '登入',
          },
        },
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/NotLogged/Register.vue'),
        meta: {
          requireAuth: false,
          metaInfo: {
            title: '註冊',
          },
        },
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layout/Index.vue'),
    children: [
      {
        path: '/',
        name: 'GeneralList',
        component: () => import('@/views/GeneralList.vue'),
        meta: {
          requireAuth: true,
          metaInfo: {
            title: '表單清單',
          },
        },
      },
      {
        path: '/account-setting',
        name: 'AccountSetting',
        component: () => import('@/views/Setting.vue'),
        meta: {
          requireAuth: true,
          metaInfo: {
            title: '帳號設定',
          },
        },
      },
      {
        path: '/form',
        component: () => import('@/views/Form/Index.vue'),
        children: [
          {
            path: '/form/create',
            name: 'FormCreate',
            component: () => import('@/views/Form/Create.vue'),
            meta: {
              requireAuth: true,
              metaInfo: {
                title: '表單問題設計',
              },
            },
          },
          {
            path: '/form/settings',
            name: 'FormSettings',
            component: () => import('@/views/Form/Settings.vue'),
            meta: {
              requireAuth: true,
              metaInfo: {
                title: '表單設定',
              },
            },
          },
          {
            path: '/form/release',
            name: 'FormRelease',
            component: () => import('@/views/Form/Release.vue'),
            meta: {
              requireAuth: true,
              metaInfo: {
                title: '表單發布',
              },
            },
          },
        ],
      },
    ],
  },
  // {
  //   path: '/form-preview',
  //   name: 'FormPreview',
  //   component: () => import(''),
  //   meta: {
  //     requireAuth: true,
  //   },
  // },
  {
    path: '/form-render',
    name: 'FormRender',
    component: () => import('@/views/FormRender.vue'),
    meta: {
      requireAuth: false,
      metaInfo: {
        title: '黑快馬表單',
      },
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  /**@頁面重整回到最上方 */
  scrollBehavior() {
    return { x: 0, y: 0, behavior: 'smooth' }
  },
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.metaInfo) store.commit('meta/META_INFO', to.meta.metaInfo)
  if (to.meta.requireAuth) {
    const token = Vue.$cookies.get(`${process.env.VUE_APP_COOKIES}_Token`) || undefined
    if (token) next()
    else {
      localStorage.removeItem(`${process.env.VUE_APP_COOKIES}_LoginStatus`)
      store.dispatch('alert', { type: 'error', message: '請先登入帳號', duration: 3000 })
      store.dispatch('changeLoginStatus', false)
      store.dispatch('isModal', false)
      next({ name: 'Login' })
    }
  } else next()
})

router.afterEach(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
})

export default router
