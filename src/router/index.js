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
