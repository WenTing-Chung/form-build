<template>
  <section class="flex w-full">
    <Modal v-if="modal">
      <template v-if="folderEventType.type === 'addFolder'">
        <p class="mb-5 text-[#54588c] font-bold text-3xl">新增資料夾</p>
        <FormInput class="mb-4 rounded-full" v-model="name" placeholder="請輸入資料夾名稱" />
        <div class="flex">
          <button
            class="mr-5 py-2.5 px-12 border border-solid border-[#cbcccd] hover:border-[#e4e4f1] rounded-full bg-white hover:bg-[#e4e4f1] text-[#777] font-bold text-2xl"
            type="button"
            @click.prevent=";(folderEventType = null), (name = ''), $store.dispatch('isModal', false)"
          >
            取消
          </button>
          <button
            class="py-2.5 px-12 border border-solid border-[#52528c] rounded-full bg-[#52528c] hover:bg-[#424281] text-white font-bold text-2xl"
            type="button"
            @click.prevent="createFolder"
          >
            確認
          </button>
        </div>
      </template>
      <template v-if="folderEventType.type === 'del'">
        <p class="mb-5 text-[#54588c] font-bold text-3xl">刪除資料夾</p>
        <p class="mb-5 text-2xl">
          確定要刪除<span class="text-danger"> {{ folderEventType.name }} </span>資料夾嗎?
        </p>
        <div class="flex">
          <button
            class="mr-5 py-2.5 px-12 border border-solid border-[#cbcccd] hover:border-[#e4e4f1] rounded-full bg-white hover:bg-[#e4e4f1] text-[#777] font-bold text-2xl"
            type="button"
            @click.prevent=";(folderEventType = null), $store.dispatch('isModal', false)"
          >
            取消
          </button>
          <button
            class="py-2.5 px-12 border border-solid border-[#52528c] rounded-full bg-[#52528c] hover:bg-[#424281] text-white font-bold text-2xl"
            type="button"
            @click.prevent="deleteFolder(folderEventType.id)"
          >
            確認
          </button>
        </div>
      </template>
    </Modal>
    <Aside :folderList="folderList" :folderOperate_show="folderOperate_show" @folderOperateShow="folderOperateShow" @folderEvent="folderEvent" />
    <div class="flex-1 bg-[#eee] list-content">
      <div class="flex items-center justify-between pt-10 px-14 pb-3 border-b border-solid border-[#bcbbcb] search-bar">
        <div class="flex">
          <template v-if="show_type === 'list'">
            <button class="mr-3 py-3 px-[18px] rounded-[10px] bg-[#fafaf9] hover:bg-[#ff6060] text-[#57588B] hover:text-white" type="button">
              <font-awesome-icon icon="fa-regular fa-trash-can" size="2xl" />
            </button>
          </template>
          <date-picker class="mr-3" v-model="search.date" value-type="format" type="date">
            <template #input>
              <input
                class="py-3.5 pl-2.5 w-full rounded-[10px] bg-[#fafaf9] placeholder:text-[#888] text-lg"
                :value="search.date"
                placeholder="創建日期"
              />
            </template>
          </date-picker>
          <label for="form-name" class="py-3.5 px-5 rounded-[10px] bg-[#fafaf9]">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" size="lg" class="mr-3.5 text-[#888]" />
            <input id="form-name" class="bg-[#fafaf9] text-lg placeholder:text-[#888]" v-model="search.form_name" placeholder="查詢表單" />
          </label>
        </div>
        <div class="overflow-hidden rounded-[10px]">
          <button
            :class="['py-3 px-[18px]', show_type === 'card' ? 'bg-[#c8c8d5] text-[#57588b]' : 'bg-[#fafaf9] text-[#888]']"
            type="button"
            @click.prevent="type_reset('card')"
          >
            <font-awesome-icon icon="fa-brands fa-microsoft" size="2xl" />
          </button>
          <button
            :class="['py-3 px-[18px]', show_type === 'list' ? 'bg-[#c8c8d5] text-[#57588b]' : 'bg-[#fafaf9] text-[#888]']"
            type="button"
            @click.prevent="type_reset('list')"
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
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Aside from '@/layout/Aside.vue'
import Modal from '@/components/Modal.vue'
import FormCard from '@/components/FormCard.vue'
import FormInput from '@/components/FormInput.vue'

export default {
  name: 'GeneralList',
  components: { Aside, Modal, FormCard, FormInput },
  data: () => ({
    search: {
      date: null,
      form_name: '',
    },
    name: '', // 新增資料夾名稱
    folderList: [],
    folderEventType: null,
    folderOperate_show: false,
    // -------
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
  }),
  metaInfo: {
    title: '表單清單',
  },
  mounted() {
    this.get_folderList()
    // ---------- ---------- ----------
    this.is_containerHeight()
  },
  computed: {
    ...mapState({ modal: (state) => state.isModal }),
  },
  methods: {
    /**@取得資料夾清單 */
    get_folderList() {
      this.axios.folderList().then((res) => {
        const { code, data } = res.data
        if (code === 200) this.folderList = data.list
      })
    },
    /**@新增資料夾 */
    createFolder() {
      this.axios.createdFolder({ name: this.name }).then((res) => {
        if (res.data.code === 200) {
          this.get_folderList()
          this.folderEventType = null
          this.name = ''
          this.$store.dispatch('isModal', false)
        }
      })
    },
    /**@刪除資料夾 */
    deleteFolder(id) {
      this.axios.deleteFolder({ id }).then((res) => {
        if (res.data.code === 200) {
          this.get_folderList()
          this.folderEventType = null
          this.folderOperate_show = false
          this.$store.dispatch('isModal', false)
        }
      })
    },
    /**@資料夾操作型 */
    folderEvent(val) {
      this.folderEventType = val
    },
    folderOperateShow(val) {
      this.folderOperate_show = val
    },
    // ---------- ---------- ----------
    /**@計算高度 */
    is_containerHeight() {
      this.$nextTick(() => {
        const listContent = document.querySelector('.list-content')
        const search = document.querySelector('.search-bar').clientHeight
        listContent.style.setProperty('--search', `${search}px`)
      })
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
      this.list[i].is_star = !this.list[i].is_star
    },
    /**@刪除勾選 */
    is_delList(i) {
      if (this.delList.includes(i)) {
        let index = this.delList.findIndex((x) => x === i)
        this.delList.splice(index, 1)
      } else this.delList.push(i)
    },
    /**@切換顯示形式 */
    type_reset(kind) {
      this.show_type = kind
      this.list.map((x) => (x.config = false))
    },
  },
}
</script>

<style lang="scss" scoped>
.form-list {
  height: calc(100% - var(--search) - 1px);
}
</style>
