<template>
  <section class="w-full h-full config-wrap">
    <div class="relative pt-2.5 border-t border-solid border-[#cbcccd] shadow-[0px_3px_6px_0_rgba(0,0,0,0.16)] bg-white form-operate-list">
      <div class="flex justify-between mx-auto w-10/12">
        <ul class="flex">
          <li v-for="item in formItemList" :key="item.link" :class="['relative form-item', { active: $route.name === item.link }]">
            <router-link v-show="item.show" :to="{ name: item.link, query: item.query }" class="py-2.5 px-3">
              {{ item.text }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <router-view class="form-container" />
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FormIndex',
  mounted() {
    this.formConfig_wrap_height()
  },
  computed: {
    ...mapState({ configID: (state) => state.configID }),
    formItemList() {
      return [
        { text: '問題設計', link: 'FormCreate', query: this.configID, show: true },
        {
          text: '設定',
          link: 'FormSettings',
          query: this.configID,
          show: this.configID.folderId || !Object.keys(this.configID).length ? false : true,
        },
        {
          text: '發布',
          link: 'FormRelease',
          query: this.configID,
          show: this.configID.folderId || !Object.keys(this.configID).length ? false : true,
        },
      ]
    },
  },
  methods: {
    /**@計算內容顯示高度 */
    formConfig_wrap_height() {
      this.$nextTick(() => {
        const operateList = document.querySelector('.form-operate-list').clientHeight
        const configWrap = document.querySelector('.config-wrap')
        configWrap.style.setProperty('--operateList', `${operateList + 1}px`)
      })
    },
  },
  beforeDestroy() {
    localStorage.removeItem(`${process.env.VUE_APP_COOKIES}_Config`)
  },
}
</script>

<style lang="scss" scoped>
.form-item {
  &.active::before {
    background-color: #52528c;
  }
  &::before {
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 4px;
    border-radius: 2px 2px 0 0;
    content: '';
  }
  &:hover::before {
    background-color: rgba(#52528c, 0.5);
  }
  &:not(:last-child) {
    margin-right: 14px;
  }
}
.form-container {
  height: calc(100% - var(--operateList));
}
</style>
