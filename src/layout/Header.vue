<template>
  <header :class="['relative', { 'shadow-[0px_3px_6px_0_rgba(0,0,0,0.16)]': !pathName.includes('form') }]">
    <div class="relative flex justify-between py-6 px-8 w-full bg-white">
      <router-link :to="{ name: 'GeneralList' }" class="text-[#52528c] font-bold text-2xl"> 黑快馬表單 </router-link>
      <p v-if="$route.name === 'StatisticsLog'" class="text-[#52528c] font-bold text-2xl">{{ $route.meta.metaInfo['title'] }}</p>
      <div class="relative">
        <button class="text-[#333] text-2xl" type="button" @click.prevent="is_bar = !is_bar">
          {{ userInfo.name }}
          <font-awesome-icon icon="fa-solid fa-caret-down" :class="is_bar ? 'text-[#52528C]' : 'text-[#878787]'" />
        </button>
        <ul
          v-if="is_bar"
          class="absolute top-[calc(100%_+_8px)] right-0 p-2 min-w-[calc(100%_+_20px)] rounded-[10px] bg-white shadow-[0px_3px_6px_0_rgba(0,0,0,0.16)] text-lg z-10"
        >
          <li @click.prevent="is_bar = false">
            <router-link
              :to="{ name: 'AccountSetting' }"
              class="py-2 px-3.5 border-b border-solid border-[#eee] text-nowrap hover:text-[#52528C] hover:font-bold"
            >
              帳戶設定
            </router-link>
          </li>
          <li>
            <button class="py-2 px-3.5 w-full text-left hover:text-[#52528C] hover:font-bold" type="button" @click.prevent="logout">登出</button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TheHeader',
  data: () => ({
    is_bar: false,
  }),
  computed: {
    ...mapState({ userInfo: (state) => state.userInfo }),
    pathName() {
      const name = this.$route.fullPath.slice(1)
      return name.split('/')
    },
  },
  methods: {
    /**@登出 */
    logout() {
      this.axios.logout().then((res) => {
        if (res.data.code === 200) {
          this.$store.dispatch('changeLoginStatus', false)
          this.$cookies.remove(`${process.env.VUE_APP_COOKIES}_Token`)
          localStorage.removeItem(`${process.env.VUE_APP_COOKIES}_LoginStatus`)
          localStorage.removeItem(`${process.env.VUE_APP_COOKIES}_User`)
          if (this.$route.name !== 'Login') this.$router.push({ name: 'Login' })
        }
      })
    },
  },
}
</script>
