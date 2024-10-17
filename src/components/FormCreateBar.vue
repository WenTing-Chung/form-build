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
    <div class="overflow-y-auto pb-8 bg-white scroll-style create-aside-content">
      <template v-if="active === 'question-type'">
        <p class="my-3.5 text-center font-bold">請拖曳至左側以新增題目</p>
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
      <template v-if="active === 'staging-area'">
        <ul v-if="stagingData && stagingData.length">
          <li
            v-for="info in stagingData"
            :key="info.id"
            class="flex items-center py-4 pl-9 hover:bg-[#e4e4f1] cursor-pointer"
            draggable
            @dragstart="handleDragStart($event, info)"
          >
            <div class="flex items-center justify-center mr-7 w-14 h-14 rounded-md bg-[#52528c]">
              <img :src="info.img" :alt="info.img" />
            </div>
            {{ info.data.label['value'] }}
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
      { text: '主題', value: 'theme' },
    ],
    active: 'question-type',
  }),
  mounted() {
    this.createBarHeight()
  },
  computed: {
    ...mapState({ stagingData: (state) => state.stagingData }),
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
      // if (this.active === 'question-type') {
      //   env.dataTransfer.setData('question', item.value)
      //   this.$emit('drag_add_question', true)
      // } else if (this.active === 'staging-area') {
      //   env.dataTransfer.setData('question', item)
      //   this.$emit('drag_add_question', false)
      // }
      switch (this.active) {
        case 'question-type':
          env.dataTranㄑfer.setData('question', item.value)
          this.$emit('drag_add_question', true)
          break
        case 'staging-area':
          env.dataTransfer.setData('question', JSON.stringify(item))
          this.$emit('drag_add_question', false)
          break
        default:
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
