<template>
  <ul class="folderOperateList">
    <li @click.prevent="folderOperateEvent('create')">新增表單</li>
    <li @click.prevent="folderOperateEvent('rename')">重新命名</li>
    <li @click.prevent="folderOperateEvent('del')">刪除</li>
  </ul>
</template>

<script>
export default {
  name: 'FolderOperate',
  props: {
    location: {
      type: Object,
    },
  },
  data: () => ({
    screenH: null,
  }),
  mounted() {
    this.resizeFunction()
    window.addEventListener('resize', this.resizeFunction())
  },
  watch: {
    location(newVal) {
      if (newVal) this.resizeFunction()
    },
  },
  methods: {
    /**@資料夾事件 */
    folderOperateEvent(val) {
      const { id, name } = this.location
      if (['rename', 'del'].includes(val)) this.$store.dispatch('isModal', true)
      this.$emit('folderOperateEvent', { id, name, type: val })
    },
    /**@判斷更多操作顯示位置 */
    resizeFunction() {
      this.screenH = Math.floor(document.documentElement.clientHeight * 0.8)
      const folderOperate = document.querySelector('.folderOperateList')
      if (Object.keys(this.location).length) {
        const { y } = this.location
        if (this.location.y > 700) folderOperate.style.top = `${y - 140}px`
        else folderOperate.style.top = `${y}px`
      } else return
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeFunction)
  },
}
</script>

<style lang="scss" scoped>
ul {
  position: absolute;
  left: 290px;
  z-index: 9;
  overflow: hidden;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 10px 10px 0 rgba(#c8c8d5, 0.5);
  font-size: 18px;
  li {
    padding-top: 10px;
    padding-right: 44px;
    padding-bottom: 10px;
    padding-left: 28px;
    white-space: nowrap;
    cursor: pointer;
    &:hover {
      background-color: rgba(#57588b, 0.2);
      color: #52528c;
    }
    &:not(:last-child) {
      border-bottom: 1px solid #eee;
    }
  }
}
</style>
