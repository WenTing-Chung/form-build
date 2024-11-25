<template>
  <div>
    <div class="mb-3.5 flex items-center justify-center">
      <div v-show="pageCount > 1 && page !== 1" class="flex items-center justify-center md:mr-2.5 switch-item" @click="setPage(false)">&lt;</div>
      <Pager :class="{ 'sm:mr-2.5': pageCount > 1 }" :page="page" :total-page="pageCount" @changePage="changePage" />
      <div v-show="pageCount > 1 && page !== pageCount" class="flex items-center justify-center switch-item" @click="setPage(true)">&gt;</div>
    </div>
    <p class="text-center font-bold">第 {{ page }} / {{ pageCount }} 頁&emsp;共{{ itemCount }}筆</p>
  </div>
</template>

<script>
import Pager from './Pager.vue'

export default {
  name: 'Component-Pagination',
  components: { Pager },
  props: {
    page: { type: Number, default: 1 },
    pageCount: { type: Number, default: 1 },
    itemCount: { type: Number, default: 1 },
  },
  methods: {
    setPage(isNext) {
      let now = this.page
      if (now < 1) now = 1
      else if (now > this.pageCount) now = this.pageCount
      else if (isNext && now < this.pageCount) now++
      else if (!isNext && now > 1) now--
      this.$emit('changePage', now)
    },
    changePage(page) {
      this.nowPage = page
      this.$emit('changePage', page)
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    },
  },
}
</script>

<style lang="scss" scoped>
.switch-item {
  width: 18px;
  height: 18px;
  border: 1px solid #a3a3a3;
  border-radius: 50%;
  color: #a3a3a3;
  font-size: 14px;
  cursor: pointer;
}
</style>
