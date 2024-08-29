import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios'
import { localize, ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_TW.json'
// [vee-validate](https://www.npmjs.com/package/vee-validate)
// (https://vee-validate.logaretm.com/v3/overview.html)
import VueCookies from 'vue-cookies'
// [vue-cookies](https://www.npmjs.com/package/vue-cookies)
import Toasted from 'vue-toasted'
// [vue-toasted](https://www.npmjs.com/package/vue-toasted)
import VueMeta from 'vue-meta'
// [vue-meta](https://www.npmjs.com/package/vue-meta)
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
// [fortawesome](https://fontawesome.com/)

/**@css */
import 'vue-loading-overlay/dist/vue-loading.css'
// [vue-loading-overlay](https://www.npmjs.com/package/vue-loading-overlay)
// [swiper](https://blog.csdn.net/tuzi007a/article/details/122646552)
// [swiper](https://juejin.cn/post/7054034577009967117)
import '@/assets/tailwind.css'
import '@/assets/style/all.scss'

/**@fontawesome */
library.add(fas, far, fab)
Vue.component('font-awesome-icon', FontAwesomeIcon)

/**@veeValidate */
localize('zh_TW', zh)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
Object.keys(rules).forEach((rule) => extend(rule, rules[rule]))

Vue.use(Toasted, { theme: 'outline', position: 'top-center', duration: 3000 })
Vue.use(VueCookies)
Vue.use(VueMeta)

Vue.config.productionTip = false
Vue.prototype.axios = axios

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')