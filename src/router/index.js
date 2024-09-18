import Vue from 'vue'
import VueRouter from 'vue-router'

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
        },
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/NotLogged/Register.vue'),
        meta: {
          requireAuth: false,
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
        },
      },
      {
        path: '/account-setting',
        name: 'AccountSetting',
        component: () => import('@/views/Setting.vue'),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: '/form/create',
        name: 'FormCreate',
        component: () => import('@/views/Form/Create.vue'),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: '/form/settings',
        name: 'FormSettings',
        component: () => import('@/views/Form/Settings.vue'),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: '/form/release',
        name: 'FormRelease',
        component: () => import('@/views/Form/Release.vue'),
        meta: {
          requireAuth: true,
        },
      },
    ],
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

router.afterEach(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
})

export default router
