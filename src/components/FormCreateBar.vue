<template>
  <div class="w-[350px] border-l border-solid border-[#cbcccd] create-aside">
    <ul class="flex justify-around create-aside-item">
      <li
        v-for="item in list"
        :key="item.value"
        :class="['py-5 px-8 cursor-pointer', active === item.value ? 'bg-[#52528c] text-white font-bold' : 'bg-[#eee] text-[#888]']"
        @click.prevent="active = item.value"
      >
        {{ item.text }}
      </li>
    </ul>
    <div class="overflow-y-auto pb-8 bg-white scroll-style create-aside-content">
      <template v-if="active === 'question-type'">
        <p class="my-3.5 text-center font-bold">請拖曳至左側以新增題目</p>
        <ul>
          <li
            v-for="(item, i) in questionList"
            :key="i"
            :class="[
              'flex items-center py-4 px-9 hover:bg-[#e4e4f1] cursor-pointer',
              { 'border-b border-solid border-[#d3d3d3]': [1, 4, 5, 8].includes(i) },
            ]"
            draggable
            @dragstart="handleDragStart($event, item)"
          >
            <div class="flex items-center justify-center mr-7 w-14 h-14 rounded-md bg-[#52528c]">
              <img :src="require(`@/assets/image/${item.other['icon']}`)" alt="題目類型圖示" />
            </div>
            <p class="flex-1">{{ item.other['text'] }}</p>
          </li>
        </ul>
      </template>
      <template v-if="active === 'staging-area'">
        <ul v-if="temporaryData && temporaryData.length" class="pt-6">
          <li
            v-for="info in temporaryData"
            :key="info.other['id']"
            class="flex items-center py-4 px-9 border-b border-solid border-[#d3d3d3] hover:bg-[#e4e4f1] cursor-pointer"
            :title="info['title']"
            draggable
            @dragstart="handleDragStart($event, info)"
          >
            <div class="flex items-center justify-center mr-7 w-14 h-14 rounded-md bg-[#52528c]">
              <img :src="require(`@/assets/image/${info.other['icon']}`)" alt="題目類型圖示" />
            </div>
            <p class="flex-1 text-ellipsis overflow-hidden">{{ info['title'] ? info['title'] : '未命名問題' }}</p>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import questionList from '@/utils/question'

export default {
  name: 'FormCreateBar',
  props: {
    add: {
      type: Boolean,
    },
  },
  data: () => ({
    questionList,
    list: [
      { text: '題目類型', value: 'question-type' },
      { text: '暫存區', value: 'staging-area' },
      // { text: '主題', value: 'theme' },
    ],
    active: 'question-type',
  }),
  mounted() {
    this.createBarHeight()
  },
  computed: {
    ...mapState({ temporaryData: (state) => state.temporaryData }),
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
    /**@拖曳目標開始 */
    handleDragStart(env, item) {
      switch (this.active) {
        case 'question-type':
          env.dataTransfer.setData('question', item.other.value)
          this.$emit('drag_add_question', true)
          break
        case 'staging-area':
          env.dataTransfer.setData('question', JSON.stringify(item))
          this.$emit('drag_add_question', false)
          break
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.create-aside-content {
  height: calc(100% - var(--item));
}
</style>
