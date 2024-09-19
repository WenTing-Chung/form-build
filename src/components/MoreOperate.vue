<template>
  <ul class="moreOperate">
    <li>重新命名</li>
    <li>新分頁開啟</li>
    <li>編輯</li>
    <li>紀錄</li>
    <li>移動到資料夾</li>
    <li>刪除</li>
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
  mounted() {
    this.resizeFunction()
    window.addEventListener('resize', this.resizeFunction)
  },
  methods: {
    resizeFunction() {
      this.screenW = Math.floor(document.documentElement.scrollWidth * 0.8)
      this.moreConfig()
    },
    moreConfig() {
      const { x, y } = this.location
      const operate = document.querySelector('.moreOperate')
      if (this.listType === 'card') {
        if (y > 600) operate.style.top = '-80px'
        else operate.style.top = '250px'

        if (x > this.screenW) {
          operate.style.right = '-20px'
          operate.style.left = ''
        } else {
          operate.style.right = ''
          operate.style.left = 'calc(100% - 40px)'
        }
      } else {
        operate.style.right = '40px'
        operate.style.top = 'calc(100% - 44px)'
      }
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
