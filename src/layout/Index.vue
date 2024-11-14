<template>
  <main class="h-screen">
    <Header />
    <div class="flex content">
      <router-view />
    </div>
  </main>
</template>

<script>
import Header from '@/layout/Header.vue'

export default {
  name: 'TheLayout',
  components: { Header },
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
