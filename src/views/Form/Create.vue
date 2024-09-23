<template>
  <section class="flex flex-row-reverse w-full h-full bg-[#eee]">
    <FormCreateBar />
    <div class="overflow-y-auto flex-1 py-7 scroll-style" @drop="handleDrop($event)" @dragover.prevent>
      <div class="mx-auto w-10/12">
        <div class="mb-7 p-7 rounded-2xl bg-white">
          <input class="w-full font-bold text-4xl placeholder:text-[#333]" type="text" placeholder="未命名標題" />
          <hr class="mt-4 mb-7 bg-[#888]" />
          <input class="w-full placeholder:text-[#555]" type="text" placeholder="表單說明" />
        </div>
        <template v-if="questionList.length">
          <div v-for="item in questionList" :key="item.text" class="mb-7 w-full h-[50px] bg-white">{{ item.text }}</div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import FormCreateBar from '@/components/FormCreateBar.vue'

export default {
  name: 'FormCreate',
  components: { FormCreateBar },
  data: () => ({
    questionList: [],
  }),
  metaInfo: {
    title: '表單問題設計',
  },
  mounted() {},
  methods: {
    handleDrop(env) {
      console.log('env: ', env)
      const dropBox = JSON.parse(env.dataTransfer.getData('question'))
      console.log('drop: ', dropBox)
      this.questionList.push(dropBox)
    },
  },
}
</script>
