<template>
  <ul class="moreOperate">
    <!-- <li>重新命名</li> -->
    <li @click.prevent="formOperateEvent('blank')">新分頁開啟</li>
    <!-- <li>編輯</li> -->
    <li @click.prevent="formOperateEvent('log')">紀錄</li>
    <li @click.prevent="formOperateEvent('move')">移動到資料夾</li>
    <li @click.prevent="formOperateEvent('del')">刪除</li>
  </ul>
</template>

<script>
export default {
  name: 'MoreOperate',
  props: {
    location: {
      type: Object,
    },
    listType: {
      type: String,
      default: 'card',
    },
  },
  data: () => ({
    screenW: null,
  }),
  watch: {
    location() {
      this.moreConfig()
    },
  },
  mounted() {
    this.resizeFunction()
    window.addEventListener('resize', this.resizeFunction)
  },
  methods: {
    resizeFunction() {
      this.screenW = Math.floor(document.documentElement.scrollWidth * 0.8)
      this.moreConfig()
    },
    /**@計算更多功能顯示位置_OK */
    moreConfig() {
      const { x, y } = this.location
      const operate = document.querySelector('.moreOperate')
      if (this.listType === 'card') {
        operate.style.left = `${x}px`
        // if (y > 600) operate.style.top = `${y - 310}px`
        if (y > 600) operate.style.top = `${y - 210}px`
        else operate.style.top = `${y + 25}px`

        if (x > this.screenW) operate.style.left = `${x - 180}px`
      } else {
        operate.style.right = '40px'
        operate.style.top = 'calc(100% - 44px)'
      }
    },
    formOperateEvent(val) {
      if (['log', 'move', 'del'].includes(val)) this.$store.dispatch('isModal', true)
      this.$emit('formOperateEvent', { id: this.location.id, name: this.location.name, type: val })
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
