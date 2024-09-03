<template>
  <aside class="min-w-[300px] w-[300px] border-r border-solid border-[#d8d7e3] bg-[#d8d7e3]">
    <router-link to="" id="add-btn" class="py-9 px-8 w-full bg-[#ecf371] text-left text-lg">
      <font-awesome-icon icon="fa-solid fa-plus" size="2xl" class="mr-5" />
      新增表單
    </router-link>
    <div class="pt-4 overflow-y-auto folder-list">
      <div class="py-5 px-2.5 border-b border-solid border-[#cac9da]">
        <div
          class="relative py-2 pl-[72px] w-full rounded-md text-left text-lg cursor-pointer hover:bg-[#acaccc]/50 folder-kind"
          @click.prevent="folder_select('all')"
        >
          <font-awesome-icon icon="fa-solid fa-file-lines" size="xl" class="absolute left-6 text-[#797979] icon" />
          全部
        </div>
      </div>
      <ul v-if="list && list.length" class="py-6 px-2.5 border-b border-solid border-[#cac9da]">
        <li v-for="item in list" :key="item.id">
          <div
            class="relative overflow-hidden mb-5 py-2 pl-[72px] w-full rounded-md text-left text-ellipsis whitespace-nowrap text-lg cursor-pointer hover:bg-[#acaccc]/50 folder-kind"
            :title="item.folder_name"
            @click.prevent="folder_select(item.folder_name)"
          >
            <font-awesome-icon icon="fa-solid fa-folder" size="xl" class="absolute left-6 text-[#797979] icon" />
            {{ item.folder_name }}
          </div>
        </li>
      </ul>
      <div class="py-5 px-2.5">
        <div
          class="relative py-2 pl-[72px] w-full rounded-md text-left text-lg hover:bg-[#acaccc]/50 folder-kind"
          @click.prevent="folder_select('star')"
        >
          <font-awesome-icon icon="fa-solid fa-star" size="xl" class="absolute left-6 text-[#797979] icon" />
          星號
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'TheAside',
  data: () => ({
    list: [
      { id: 0, folder_name: '新增資料夾' },
      { id: 1, folder_name: '活動報名' },
    ],
  }),
  mounted() {
    this.is_listHeight()
  },
  methods: {
    /**@計算側欄高度 */
    is_listHeight() {
      this.$nextTick(() => {
        const aside = document.querySelector('aside')
        const list = document.querySelector('#add-btn').clientHeight
        aside.style.setProperty('--list', `${list}px`)
      })
    },
    /**@選擇資料夾
     * @param {String} type
     */
    folder_select(type) {
      this.$EventBus.$emit('folder-select', type)
    },
  },
}
</script>

<style lang="scss" scoped>
.folder-list {
  height: calc(100% - var(--list));
  &::-webkit-scrollbar {
    width: 15px;
  }
  &::-webkit-scrollbar-track {
    background-color: #cecece;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #9c9ca0;
  }
  .folder-kind:hover > .icon {
    color: #57588b;
  }
  .folder-kind.active {
    background-color: rgba(#acaccc, 0.5);
    & > .icon {
      color: #57588b;
    }
  }
}
</style>
