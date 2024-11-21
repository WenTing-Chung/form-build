<template>
  <aside class="w-[300px] border-r border-solid border-[#d8d7e3] bg-[#d8d7e3]">
    <slot name="addFormButton" />
    <div class="overflow-y-auto folder-list scroll-style">
      <div class="py-5 px-2.5 border-b border-solid border-[#cac9da]">
        <div
          :class="[
            'flex py-2 pl-6 pr-2 w-full rounded-md text-left text-lg cursor-pointer hover:bg-[#acaccc]/50 folder-kind',
            { active: is_click.value === null },
          ]"
          @click.prevent="folderSelect('all', null)"
        >
          <font-awesome-icon icon="fa-solid fa-file-lines" size="xl" class="mr-7 left-6 text-[#797979] icon" />
          全部
        </div>
      </div>
      <ul class="py-5 px-2.5 border-b border-solid border-[#cac9da]">
        <li
          :class="[
            'flex py-2 pl-6 pr-2 w-full rounded-md text-left text-lg cursor-pointer hover:bg-[#acaccc]/50 folder-kind',
            { 'mb-3': folderList.length },
          ]"
          title="新增資料夾"
          @click.prevent="folderEvent({ id: null, type: 'addFolder' }), $store.dispatch('isModal', true)"
        >
          <font-awesome-icon icon="fa-solid fa-folder-plus" size="xl" class="mr-5 left-6 text-[#797979] icon" />
          新增資料夾
        </li>
        <li
          v-for="(folder, i) in folderList"
          :key="folder.id"
          :class="[
            'relative flex py-2 pl-6 pr-2 w-full rounded-md text-left text-lg cursor-pointer hover:bg-[#acaccc]/50 folder-kind',
            { 'mb-3': i !== folderList.length - 1, active: folder.id === is_click.value },
          ]"
          :title="folder.name"
          @click.prevent="folderSelect('folder', folder.id)"
        >
          <font-awesome-icon icon="fa-solid fa-folder" size="xl" class="mr-5 text-[#797979] icon" />
          <p class="overflow-hidden flex-1 text-ellipsis whitespace-nowrap">{{ folder.name }}</p>
          <button
            :class="['top-1/2 right-1 w-7 h-7 rounded-full hover:bg-[#acaccc]', { 'bg-[#acaccc]': folder.id === activeOperateId }]"
            type="button"
            @click.stop="folderOperateCheck(folder, $event)"
          >
            <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="text-[#797979]" />
          </button>
        </li>
      </ul>
      <div class="py-5 px-2.5">
        <div
          :class="[
            'flex py-2 pl-6 pr-2 w-full rounded-md text-left text-lg cursor-pointer hover:bg-[#acaccc]/50 folder-kind',
            { active: is_click.value === 'star' },
          ]"
          @click.prevent="folderSelect('star', 'star')"
        >
          <font-awesome-icon icon="fa-solid fa-star" size="xl" class="mr-5 left-6 text-[#797979] icon" />
          星號
        </div>
      </div>
    </div>
    <slot name="operate" />
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
    activeOperateId: {
      type: Number,
    },
  },
  data: () => ({
    is_click: {
      kind: 'all',
      value: null,
    },
  }),
  mounted() {
    this.is_listHeight()
  },
  methods: {
    /**@計算側欄高度_OK */
    is_listHeight() {
      this.$nextTick(() => {
        const aside = document.querySelector('aside')
        const list = document.querySelector('#add-btn').clientHeight
        aside.style.setProperty('--list', `${list}px`)
      })
    },
    /**@選擇資料夾_OK
     * @param {String} type 類型
     * @param {Number, String} val 值
     */
    folderSelect(type, val) {
      this.is_click = { kind: type, value: val }
      this.$emit('folderSelect', { kind: type, value: val })
    },
    /**@資料夾操作_OK */
    folderEvent(type) {
      this.$emit('folderEvent', type)
    },
    /**@資校夾功能列3個點 */
    folderOperateCheck(info, e) {
      this.$emit('folderInfo', { id: info.id, name: info.name, y: e.clientY })
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
