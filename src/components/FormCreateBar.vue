<template>
  <div class="border-l border-solid border-[#cbcccd] create-aside">
    <ul class="flex create-aside-item">
      <li
        v-for="item in list"
        :key="item.value"
        :class="['py-5 px-8 cursor-pointer', active === item.value ? 'bg-[#52528c] text-white font-bold' : 'bg-[#eee] text-[#888]']"
        @click.prevent="active = item.value"
      >
        {{ item.text }}
      </li>
    </ul>
    <div class="overflow-y-auto py-8 bg-white scroll-style create-aside-content">
      <template v-if="active === 'question-type'">
        <ul>
          <li
            v-for="(item, i) in questionList"
            :key="i"
            :class="[
              'flex items-center py-4 pl-9 hover:bg-[#e4e4f1] cursor-pointer',
              { 'border-b border-solid border-[#d3d3d3]': [1, 4, 5, 8].includes(i) },
            ]"
            draggable
            @dragstart="handleDragStart($event, item)"
          >
            <div class="flex items-center justify-center mr-7 w-14 h-14 rounded-md bg-[#52528c]">
              <img :src="item.img" :alt="item.img" />
            </div>
            {{ item.text }}
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormCreateBar',
  data: () => ({
    list: [
      { text: '題目類型', value: 'question-type' },
      { text: '暫存區', value: 'staging-area' },
      { text: '主題', value: 'theme' },
    ],
    questionList: [
      { text: '單行文字', img: require('@/assets/image/icon_input.svg') },
      { text: '多行文字', img: require('@/assets/image/icon_textarea.svg') },
      { text: '單選題', img: require('@/assets/image/icon_radio.svg') },
      { text: '複選題', img: require('@/assets/image/icon_checkbox.svg') },
      { text: '下拉式', img: require('@/assets/image/icon_select.svg') },
      { text: '雲端上傳', img: require('@/assets/image/icon_file.svg') },
      { text: '線性刻度', img: require('@/assets/image/icon_progress.svg') },
      { text: '單選方塊', img: require('@/assets/image/icon_radio_ar.svg') },
      { text: '複選方塊', img: require('@/assets/image/icon_checkbox_ar.svg') },
      { text: '日期', img: require('@/assets/image/icon_date.svg') },
      { text: '時間', img: require('@/assets/image/icon_time.svg') },
    ],
    active: 'question-type',
  }),
  mounted() {
    this.createBarHeight()
  },
  methods: {
    /**@計算高度 */
    createBarHeight() {
      this.$nextTick(() => {
        const bar = document.querySelector('.create-aside')
        const item = document.querySelector('.create-aside-item').clientHeight
        bar.style.setProperty('--item', `${item}px`)
      })
    },
    /**@拖曳開始 */
    handleDragStart(env, item) {
      const info = JSON.stringify(item)
      env.dataTransfer.setData('question', info)
    },
  },
}
</script>

<style lang="scss" scoped>
.create-aside-content {
  height: calc(100% - var(--item));
}
</style>
