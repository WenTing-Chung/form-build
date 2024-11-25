<template>
  <ul class="flex justify-center pager">
    <!-- 第 1 頁 -->
    <li :class="['pager-item', { 'text-white pager-bg': current === 1, 'sm:mr-2': totalPage > 1 }]" @click="changeCurrentPage(1)">
      <div class="flex justify-center items-center h-full">1</div>
    </li>
    <!-- 左側更多 -->
    <li
      v-if="totalPage > centerSize + 2 && current - centerSize / 2 + 1 > 1"
      class="sm:mr-2 pager-item"
      @click="changeCurrentPage(current - jumpSize)"
    >
      <div class="flex justify-center items-center h-full">...</div>
    </li>
    <li
      v-for="(page, index) in centerPages"
      :key="index"
      :class="['sm:mr-2 pager-item', { 'text-white pager-bg': current === page }]"
      @click="changeCurrentPage(page)"
    >
      <div class="h-full flex justify-center items-center">
        {{ page }}
      </div>
    </li>
    <!-- 右側更多 -->
    <li
      v-if="totalPage > centerSize + 2 && current + centerSize / 2 + 1 < totalPage"
      class="sm:mr-2 pager-item"
      @click="changeCurrentPage(current + jumpSize)"
    >
      <div class="h-full flex justify-center items-center">...</div>
    </li>
    <!-- 最後一頁 -->
    <li v-if="totalPage !== 1" :class="['pager-item', { 'text-white pager-bg': current === totalPage }]" @click="changeCurrentPage(totalPage)">
      <div class="h-full flex justify-center items-center">
        {{ totalPage }}
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Component-Pager',
  props: {
    page: { type: Number, default: 1, required: true },
    totalPage: { type: Number, default: 1, required: true },
    centerSize: {
      type: Number,
      default() {
        return 5
      },
    },
    jumpSize: {
      type: Number,
      default() {
        return 5
      },
    },
  },
  data: () => ({
    current: 1,
  }),
  watch: {
    page(newVal) {
      this.current = newVal
    },
  },
  computed: {
    centerPages() {
      let centerPage = this.current
      if (this.current > this.totalPage - 3) centerPage = this.totalPage - 3
      if (this.current < 4) centerPage = 4
      if (this.totalPage <= this.centerSize + 2) {
        const centerArr = []
        for (let i = 2; i < this.totalPage; i++) {
          centerArr.push(i)
        }
        return centerArr
      } else {
        const centerArr = []
        for (let i = centerPage - 2; i <= centerPage + 2; i++) {
          centerArr.push(i)
        }
        return centerArr
      }
    },
  },
  methods: {
    changeCurrentPage(page) {
      if (page < 1) this.current = 1
      else if (page > this.totalPage) this.current = this.totalPage
      else this.current = page
      this.$emit('changePage', this.current)
    },
  },
}
</script>

<style lang="scss" scoped>
.pager-item {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  background-color: #acaccc;
}
</style>
