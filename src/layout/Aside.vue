<template>
  <aside class="w-[300px] border-r border-solid border-[#d8d7e3] bg-[#d8d7e3]">
    <router-link :to="{ name: 'FormCreate' }" id="add-btn" class="py-9 px-8 w-full bg-[#ecf371] text-left text-lg">
      <font-awesome-icon icon="fa-solid fa-plus" size="2xl" class="mr-5" />
      新增表單
    </router-link>
    <div class="pt-4 overflow-y-auto folder-list scroll-style">
      <div class="py-5 px-2.5 border-b border-solid border-[#cac9da]">
        <div
          :class="[
            'relative py-2 pl-[72px] w-full rounded-md text-left text-lg cursor-pointer hover:bg-[#acaccc]/50 folder-kind',
            { active: is_active === null },
          ]"
          @click.prevent="folder_select('all', null)"
        >
          <font-awesome-icon icon="fa-solid fa-file-lines" size="xl" class="absolute left-6 text-[#797979] icon" />
          全部
        </div>
      </div>
      <ul class="py-6 px-2.5 border-b border-solid border-[#cac9da]">
        <li>
          <div
            :class="[
              'relative py-2 pl-[72px] w-full rounded-md text-left text-lg cursor-pointer hover:bg-[#acaccc]/50 folder-kind',
              { 'mb-5': folderList.length },
            ]"
            title="新增資料夾"
            @click.prevent="folderEvent('add'), $store.dispatch('isModal', true)"
          >
            <font-awesome-icon icon="fa-solid fa-folder-plus" size="xl" class="absolute left-6 text-[#797979] icon" />
            新增資料夾
          </div>
        </li>
        <li v-for="(folder, i) in folderList" :key="folder.id">
          <div
            :class="[
              'relative overflow-hidden py-2 pl-[72px] pr-8 w-full rounded-md text-left text-ellipsis whitespace-nowrap text-lg cursor-pointer hover:bg-[#acaccc]/50 folder-kind',
              { 'mb-5': i !== folderList.length - 1, active: folder.id === is_active },
            ]"
            :title="folder.name"
            @click.prevent="folder_select('folder', folder.id)"
          >
            <font-awesome-icon icon="fa-solid fa-folder" size="xl" class="absolute left-6 text-[#797979] icon" />
            {{ folder.name }}
            <div class="absolute top-1/2 right-1 flex items-center justify-center w-7 h-7 -translate-y-1/2">
              <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="text-[#797979]" />
            </div>
          </div>
        </li>
      </ul>
      <div class="py-5 px-2.5">
        <div
          :class="['relative py-2 pl-[72px] w-full rounded-md text-left text-lg hover:bg-[#acaccc]/50 folder-kind', { active: is_active === 'star' }]"
          @click.prevent="folder_select('star', 'star')"
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
  props: {
    folderList: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    is_active: null,
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
    folder_select(type, val) {
      this.is_active = val
      switch (type) {
        case 'folder':
          break
        case 'star':
          break
        case 'all':
          break
      }
    },
    /**@資料夾操作 */
    folderEvent(type) {
      this.$emit('folderEvent', type)
    },
  },
}
</script>

<style lang="scss" scoped>
.folder-list {
  height: calc(100% - var(--list));
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
