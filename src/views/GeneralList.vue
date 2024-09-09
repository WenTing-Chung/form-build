<template>
  <section class="flex-1 w-full bg-[#eee] list-content">
    <div class="flex items-center justify-between pt-10 px-14 pb-3 border-b border-solid border-[#bcbbcb] search-bar">
      <div class="flex">
        <template v-if="show_type === 'list'">
          <button class="mr-3 py-3 px-[18px] rounded-[10px] bg-[#fafaf9] hover:bg-[#ff6060] text-[#57588B] hover:text-white" type="button">
            <font-awesome-icon icon="fa-regular fa-trash-can" size="2xl" />
          </button>
        </template>
        <v-date-picker v-model="search.date" :model-config="{ type: 'string', mask: 'YYYY-MM-DD' }">
          <template v-slot="{ inputValue, inputEvents }">
            <input
              class="mr-3 py-3.5 pl-5 rounded-[10px] bg-[#fafaf9] placeholder:text-[#888] text-lg"
              :value="inputValue"
              v-on="inputEvents"
              placeholder="創建日期"
            />
          </template>
        </v-date-picker>
        <label for="form-name" class="py-3.5 px-7 rounded-[10px] bg-[#fafaf9]">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" size="lg" class="mr-3.5 text-[#888]" />
          <input id="form-name" class="bg-[#fafaf9] text-lg placeholder:text-[#ccc]" placeholder="查詢表單" />
        </label>
      </div>
      <div class="overflow-hidden rounded-[10px]">
        <button
          :class="['py-3 px-[18px]', show_type === 'card' ? 'bg-[#c8c8d5] text-[#57588b]' : 'bg-[#fafaf9] text-[#888]']"
          type="button"
          @click.prevent="show_type = 'card'"
        >
          <font-awesome-icon icon="fa-brands fa-microsoft" size="2xl" />
        </button>
        <button
          :class="['py-3 px-[18px]', show_type === 'list' ? 'bg-[#c8c8d5] text-[#57588b]' : 'bg-[#fafaf9] text-[#888]']"
          type="button"
          @click.prevent="show_type = 'list'"
        >
          <font-awesome-icon icon="fa-solid fa-bars" size="2xl" />
        </button>
      </div>
    </div>
    <div class="pt-3 px-14 pb-14 overflow-y-auto form-list scroll-style">
      <div :class="show_type === 'card' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols- xl:grid-cols-4 2xl:grid-cols-5 gap-4 auto-rows-auto' : ''">
        <FormCard
          v-for="card in list"
          :key="card.id"
          :list-type="show_type"
          :card-info="card"
          :del-list="delList"
          class="cursor-pointer"
          @child_actionBar="actionBar"
          @child_collect="is_collect"
          @child_del="is_delList"
        />
      </div>
    </div>
  </section>
</template>

<script>
import FormCard from '@/components/FormCard.vue'

export default {
  name: 'GeneralList',
  components: { FormCard },
  data: () => ({
    search: {
      date: '',
    },
    list: [
      { id: 0, text: '標題名稱111', config: false, is_star: false },
      { id: 1, text: '標題名稱222', config: false, is_star: true },
      { id: 2, text: '標題名稱333', config: false, is_star: true },
      { id: 3, text: '標題名稱444', config: false, is_star: false },
      { id: 4, text: '標題名稱555', config: false, is_star: false },
      { id: 5, text: '標題名稱666', config: false, is_star: false },
      { id: 6, text: '標題名稱777', config: false, is_star: true },
      { id: 7, text: '標題名稱888', config: false, is_star: false },
      { id: 8, text: '標題名稱999', config: false, is_star: true },
      { id: 9, text: '標題名稱101010', config: false, is_star: true },
      { id: 10, text: '標題名稱111111', config: false, is_star: false },
      { id: 11, text: '標題名稱121212', config: false, is_star: false },
    ],
    delList: [],
    show_type: 'card',
    folder_name: '',
  }),
  created() {
    this.$EventBus.$on('folder-select', (val) => this.get_folderName(val))
  },
  mounted() {
    this.is_containerHeight()
  },
  methods: {
    /**@計算高度 */
    is_containerHeight() {
      this.$nextTick(() => {
        const listContent = document.querySelector('.list-content')
        const search = document.querySelector('.search-bar').clientHeight
        listContent.style.setProperty('--search', `${search}px`)
      })
    },
    /**@EventBus_取得資料夾名稱 */
    get_folderName(name) {
      this.folder_name = name
    },
    /**@點擊3個點操作列 */
    actionBar(i) {
      const other = this.list.filter((x) => {
        return x.id !== i
      })
      other.map((x) => (x.config = false))
      this.list[i].config = !this.list[i].config
    },
    /**@切換收藏 */
    is_collect(i) {
      console.log('star: ', i)
      this.list[i].is_star = !this.list[i].is_star
    },
    /**@刪除勾選 */
    is_delList(i) {
      if (this.delList.includes(i)) {
        let index = this.delList.findIndex((x) => x === i)
        this.delList.splice(index, 1)
      } else this.delList.push(i)
    },
  },
  beforeDestroy() {
    // 銷毁監聽
    this.$EventBus.$off('folder-select')
  },
}
</script>

<style lang="scss" scoped>
.form-list {
  height: calc(100% - var(--search) - 1px);
}
</style>
