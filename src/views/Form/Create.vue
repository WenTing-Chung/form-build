<template>
  <section class="flex flex-row-reverse w-full h-full bg-[#eee]">
    <FormCreateBar />
    <div></div>
  </section>
</template>

<script>
import FormCreateBar from '@/components/FormCreateBar.vue'

export default {
  name: 'FormCreate',
  components: { FormCreateBar },
  metaInfo: {
    title: '表單問題設計',
  },
}
</script>
