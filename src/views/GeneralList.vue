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
      <template v-if="folderEventType.type === 'rename'">
        <p class="mb-5 text-[#54588c] font-bold text-3xl">重新命名資料夾</p>
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
            @click.prevent="modifyFolderName({ id: folderEventType.id, name })"
          >
            確認
          </button>
        </div>
      </template>
      <template v-if="folderEventType.type === 'del'">
        <p class="mb-5 text-[#54588c] font-bold text-3xl">刪除資料夾</p>
        <p class="mb-5 text-2xl">
          確定要刪除<span class="text-danger text-3xl"> {{ folderEventType.name }} </span>資料夾嗎?
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
    <Aside
      :folderList="folderList"
      :active-operate-id="folderOperate.info['id']"
      @folderInfo="folderOperateInfo"
      @folderSelect="folderSelect"
      @folderEvent="folderEvent"
      ref="folderList"
    >
      <template v-slot:addFormButton>
        <router-link :to="{ name: 'FormCreate' }" id="add-btn" class="p-8 w-full bg-[#ecf371] text-left text-lg">
          <font-awesome-icon icon="fa-solid fa-plus" size="2xl" class="mr-5" />
          新增表單
        </router-link>
      </template>
      <template v-slot:operate>
        <FolderOperate v-show="folderOperate.show" :location="folderOperate.info" @folderOperateEvent="folderEvent" />
      </template>
    </Aside>
    <div class="flex-1 bg-[#eee] list-content">
      <div class="flex items-center justify-between pt-10 px-6 pb-3 border-b border-solid border-[#bcbbcb] search-bar">
        <div class="flex">
          <template v-if="show_type === 'list'">
            <button class="mr-3 py-1.5 px-2 rounded-[10px] bg-[#fafaf9] hover:bg-[#ff6060] text-[#57588B] hover:text-white" type="button">
              <font-awesome-icon icon="fa-regular fa-trash-can" size="2xl" />
            </button>
          </template>
          <select
            name="dateType"
            id="dateType"
            v-model="searchDateType"
            class="mr-3 py-2 pl-2.5 pr-7 rounded-[10px] bg-[#fafaf9] text-[#888] text-lg"
            @change="resetSearchDate"
          >
            <option v-for="kind in dateType" :key="kind.value" :value="kind.value">{{ kind.text }}</option>
          </select>
          <template v-if="searchDateType === 'creation_date'">
            <date-picker class="mr-3" v-model="search.created_from" value-type="format" type="date">
              <template #input>
                <input
                  class="py-2 pl-2.5 w-full rounded-[10px] bg-[#fafaf9] placeholder:text-[#888] text-lg"
                  :value="search.created_from"
                  placeholder="創建日期起始"
                />
              </template>
            </date-picker>
            <date-picker class="mr-3" v-model="search.created_to" value-type="format" type="date">
              <template #input>
                <input
                  class="py-2 pl-2.5 w-full rounded-[10px] bg-[#fafaf9] placeholder:text-[#888] text-lg"
                  :value="search.created_to"
                  placeholder="創建日期結束"
                />
              </template>
            </date-picker>
          </template>
          <template v-else-if="searchDateType === 'recently_edited'">
            <date-picker class="mr-3" v-model="search.edited_from" value-type="format" type="date">
              <template #input>
                <input
                  class="py-2 pl-2.5 w-full rounded-[10px] bg-[#fafaf9] placeholder:text-[#888] text-lg"
                  :value="search.edited_from"
                  placeholder="最近編輯起始"
                />
              </template>
            </date-picker>
            <date-picker class="mr-3" v-model="search.edited_to" value-type="format" type="date">
              <template #input>
                <input
                  class="py-2 pl-2.5 w-full rounded-[10px] bg-[#fafaf9] placeholder:text-[#888] text-lg"
                  :value="search.edited_to"
                  placeholder="最近編輯結束"
                />
              </template>
            </date-picker>
          </template>
          <template v-else-if="searchDateType === 'expiration_date'">
            <date-picker class="mr-3" v-model="search.expired_from" value-type="format" type="date">
              <template #input>
                <input
                  class="py-2 pl-2.5 w-full rounded-[10px] bg-[#fafaf9] placeholder:text-[#888] text-lg"
                  :value="search.expired_from"
                  placeholder="失效日期起始"
                />
              </template>
            </date-picker>
            <date-picker class="mr-3" v-model="search.expired_to" value-type="format" type="date">
              <template #input>
                <input
                  class="py-2 pl-2.5 w-full rounded-[10px] bg-[#fafaf9] placeholder:text-[#888] text-lg"
                  :value="search.expired_to"
                  placeholder="失效日期結束"
                />
              </template>
            </date-picker>
          </template>
          <!-- <label for="form-name" class="mr-3 py-2 px-5 rounded-[10px] bg-[#fafaf9]">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" size="lg" class="mr-3.5 text-[#888]" />
            <input id="form-name" class="bg-[#fafaf9] text-lg placeholder:text-[#888]" v-model="search.form_name" placeholder="查詢表單" />
          </label> -->
          <button class="px-2.5 rounded-[10px] bg-[#54588c] hover:bg-[#3a3b72] text-white font-bold text-xl" type="button">查詢</button>
        </div>
        <!-- <div class="overflow-hidden rounded-[10px]">
          <button
            :class="['py-2 px-3', show_type === 'card' ? 'bg-[#c8c8d5] text-[#57588b]' : 'bg-[#fafaf9] text-[#888]']"
            type="button"
            @click.prevent="type_reset('card')"
          >
            <font-awesome-icon icon="fa-brands fa-microsoft" size="2xl" />
          </button>
          <button
            :class="['py-2 px-3', show_type === 'list' ? 'bg-[#c8c8d5] text-[#57588b]' : 'bg-[#fafaf9] text-[#888]']"
            type="button"
            @click.prevent="type_reset('list')"
          >
            <font-awesome-icon icon="fa-solid fa-bars" size="2xl" />
          </button>
        </div> -->
      </div>
      <div class="pt-3 px-6 pb-14 overflow-y-auto form-list scroll-style">
        <div
          :class="[
            'mb-6',
            show_type === 'card' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols- xl:grid-cols-4 2xl:grid-cols-5 gap-4 auto-rows-auto' : '',
          ]"
        >
          <FormCard
            v-for="card in formList"
            :key="card.id"
            :list-type="show_type"
            :card-info="card"
            :del-list="delList"
            :active-form-operate="formOperate.info['id']"
            @child_actionBar="actionBar"
            @child_collect="is_collect"
            @child_del="is_delList"
          />
        </div>
        <Pagination :page="page" :page-count="total_page" :item-count="total_count" @changePage="changePage" />
        <MoreOperate v-show="formOperate.show" :location="formOperate.info" />
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
import MoreOperate from '@/components/MoreOperate.vue'
import FolderOperate from '@/components/FolderOperate.vue'
import Pagination from '@/components/Pagination/Pagination.vue'

export default {
  name: 'GeneralList',
  components: { Aside, Modal, FormCard, FormInput, MoreOperate, FolderOperate, Pagination },
  data: () => ({
    name: '', // 新增資料夾名稱
    formList: [], // 表單列表
    folderList: [], // 資料夾列表
    folderEventType: null,
    folderOperate: {
      // 資料夾操作顯示狀態
      show: false,
      info: {},
    },
    formOperate: {
      // 表單操作顯示狀態
      show: false,
      info: {},
    },
    search: {
      // 表單搜尋條件
      folder_id: null,
      created_from: null,
      created_to: null,
      edited_from: null,
      edited_to: null,
      expired_from: null,
      expired_to: null,
      starred: 0,
    },
    show_type: 'card', // 表單呈現方式
    searchDateType: 'creation_date', // 日期搜尋條件
    dateType: [
      { text: '創建日期', value: 'creation_date' },
      { text: '最近編輯', value: 'recently_edited' },
      { text: '失效日期', value: 'expiration_date' },
    ],
    page: 1,
    total_page: 1,
    total_count: 0,
    // -------
    delList: [],
  }),
  metaInfo: {
    title: '表單清單',
  },
  mounted() {
    this.is_containerHeight()
    document.addEventListener('click', this.operateList)
  },
  computed: {
    ...mapState({ modal: (state) => state.isModal }),
  },
  methods: {
    /**@更多3個點操作顯示 */
    operateList(e) {
      const folder_operate = document.querySelector('.folderOperateList')
      const more_operate = document.querySelector('.moreOperate')
      if (this.folderOperate.show && !folder_operate.contains(e.target)) this.folderOperate = { show: false, info: {} }
      if (this.formOperate.show && !more_operate.contains(e.target)) this.formOperate = { show: false, info: {} }
    },
    /**@計算高度_OK */
    is_containerHeight() {
      this.$nextTick(() => {
        const listContent = document.querySelector('.list-content')
        const search = document.querySelector('.search-bar').clientHeight
        listContent.style.setProperty('--search', `${search}px`)
        this.get_folderList()
        this.get_formList()
      })
    },
    /**@取得資料夾清單_OK */
    get_folderList() {
      this.axios.folderList().then((res) => {
        const { code, data } = res.data
        if (code === 200) this.folderList = data.list
      })
    },
    /**@資料夾功能 */
    // 新增資料夾_OK
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
    // 更多操作_刪除資料夾_OK
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
    // 更多操作_重新命名_OK
    folderInfo(id) {
      this.axios.folderName({ id }).then((res) => {
        const { code, data } = res.data
        if (code === 200) this.name = data.name
      })
    },
    modifyFolderName(obj) {
      this.axios.modifyFolderName(obj).then((res) => {
        if (res.data.code === 200) {
          this.get_folderList()
          this.folderEventType = null
          this.folderOperate_show = false
          this.$store.dispatch('isModal', false)
        }
      })
    },
    // 3個點更多功能_OK
    folderOperateInfo(val) {
      if (val['id'] !== this.folderOperate.info['id'] && this.folderOperate.info['id'] !== undefined) this.folderOperate['info'] = val
      else if (val['id'] === this.folderOperate.info['id'] && this.folderOperate['show']) this.folderOperate = { show: false, info: {} }
      else {
        this.folderOperate.show = true
        this.folderOperate.info = val
      }
    },
    /**@資料夾功能操作 */
    folderEvent(val) {
      this.folderEventType = val
      if (val.type === 'create') this.$router.push({ name: 'FormCreate', query: { folderId: val.id } })
      else if (val.type === 'rename') this.folderInfo(val.id)
    },
    // 點擊資料夾_OK
    folderSelect(val) {
      const { kind, value } = val
      switch (kind) {
        case 'star':
          this.search.folder_id = null
          this.search.starred = 1
          break
        default:
          this.search.folder_id = value
          this.search.starred = 0
          break
      }
      this.get_formList()
    },
    /**@表單功能_OK */
    get_formList() {
      this.axios.formList(this.search).then((res) => {
        const { code, data } = res.data
        if (code === 200) {
          this.formList = data.list
          this.total_page = data.total_page
          this.total_count = data.total_count
        }
      })
    },
    /**@切換日期搜尋條件並重製_OK */
    resetSearchDate() {
      this.search.created_from = null
      this.search.created_to = null
      this.search.edited_from = null
      this.search.edited_to = null
      this.search.expired_from = null
      this.search.expired_to = null
    },
    /**@切換分頁_OK */
    changePage(val) {
      const cardList = document.querySelector('.form-list')
      this.page = val
      this.get_formList()
      cardList.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    },
    // ---------- ---------- ----------
    /**@表單卡片點擊3個點操作列_OK */
    actionBar(val) {
      if (val['id'] !== this.formOperate.info['id'] && this.formOperate.info['id'] !== undefined) this.formOperate['info'] = val
      else if (val['id'] === this.formOperate.info['id'] && this.formOperate['show']) this.formOperate = { show: false, info: {} }
      else {
        this.formOperate.show = true
        this.formOperate.info = val
      }
    },
    /**@切換收藏_OK */
    is_collect(i) {
      this.axios.formStar({ id: i }).then((res) => {
        if (res.data.code === 200) this.get_formList()
      })
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
    },
  },
  beforeDestroy() {
    document.removeEventListener('click', this.operateList)
  },
}
</script>

<style lang="scss" scoped>
.form-list {
  height: calc(100% - var(--search) - 1px);
}
</style>
