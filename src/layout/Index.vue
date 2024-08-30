<template>
  <div class="h-screen">
    <Header />
    <div class="flex">
      <Aside />
    </div>
  </div>
</template>

<script>
import Header from '@/layout/Header.vue'
import Aside from '@/layout/Aside.vue'

export default {
  name: 'TheLayout',
  components: { Header, Aside },
  computed: {},
}
</script>
