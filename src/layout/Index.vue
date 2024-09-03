<template>
  <main class="h-screen">
    <Header />
    <div class="flex content">
      <Aside v-if="$route.name === 'GeneralList'" />
      <router-view />
    </div>
  </main>
</template>

<script>
import Header from '@/layout/Header.vue'
import Aside from '@/layout/Aside.vue'

export default {
  name: 'TheLayout',
  components: { Header, Aside },
  data: () => ({}),
  mounted() {
    this.is_contentHeight()
  },
  watch: {
    $route: {
      handler() {
        this.is_contentHeight()
      },
    },
  },
  methods: {
    is_contentHeight() {
      this.$nextTick(() => {
        const main = document.querySelector('main')
        const header = document.querySelector('header').clientHeight
        main.style.setProperty('--header', `${header}px`)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  height: calc(100vh - var(--header));
}
</style>
