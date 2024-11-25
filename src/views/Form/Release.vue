<template>
  <div class="overflow-y-auto w-full h-full bg-[#eee] scroll-style">
    <div class="mx-auto p-8 w-[min(100%,_1024px)]">
      <div class="mb-8 py-9 px-[54px] rounded-2xl bg-white">
        <p class="mb-5 text-[#555] text-2xl">
          <font-awesome-icon icon="fa-solid fa-link" class="mr-5" />
          分享您的問卷
        </p>
        <FormInput id="share-link" class="mb-3.5 py-3 px-4 disabled:bg-[#eee]" :input-value="share_link" disabled />
        <button
          class="py-3 px-9 rounded-md bg-[#52528c] text-white"
          type="button"
          v-clipboard:copy="share_link"
          v-clipboard:success="copy_success"
          v-clipboard:error="copy_error"
        >
          複製
        </button>
      </div>
      <div class="py-9 px-[54px] rounded-2xl bg-white">
        <p class="mb-5 text-[#555] text-2xl">
          <font-awesome-icon icon="fa-solid fa-code" class="mr-5" />
          嵌入碼
        </p>
        <textarea
          id="share-code"
          class="mb-3.5 py-3 px-4 w-full border border-solid border-[#cbcccd] rounded-[5px] disabled:bg-[#eee]"
          :value="share_code"
          disabled
          style="min-height: 150px"
        />
        <button
          class="py-3 px-9 rounded-md bg-[#52528c] text-white"
          type="button"
          v-clipboard:copy="share_code"
          v-clipboard:success="copy_success"
          v-clipboard:error="copy_error"
        >
          複製
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FormInput from '@/components/FormInput.vue'

export default {
  name: 'FormRelease',
  components: { FormInput },
  data: () => ({
    share_link: 'http://www.so-buy.com/s/dwwyk',
    share_code: `<iframe sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
    width="100%" height="600px" src="https://www.surveycake.com/s/dwwyK" style="border:#ddd 1px solid;" `,
  }),
  metaInfo: {
    title: '表單發布',
  },
  methods: {
    copy_success() {
      this.$toasted.info('複製成功', { position: 'top-center' })
    },
    copy_error() {
      this.$toasted.error('無法複製內容、瀏覽器不支援', { position: 'top-center' })
    },
  },
}
</script>
