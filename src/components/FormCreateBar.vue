<template>
  <div class="border-l border-solid border-[#cbcccd]">
    <ul class="flex create-bar">
      <li
        v-for="item in list"
        :key="item.value"
        :class="['py-5 px-8 cursor-pointer', active === item.value ? 'bg-[#52528c] text-white font-bold' : 'bg-[#eee] text-[#888]']"
        @click.prevent="active = item.value"
      >
        {{ item.text }}
      </li>
    </ul>
    <div class="bg-white create-bar-content"></div>
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
    active: 'question-type',
  }),
  mounted() {
    this.createBarHeight()
  },
}
</script>
