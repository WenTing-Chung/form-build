<template>
  <div class="overflow-y-auto w-full h-full bg-[#eee] scroll-style">
    <div class="mx-auto p-8 w-[min(100%,_1024px)]">
      <template v-if="code.share_code">
        <div class="mb-8 py-9 px-[54px] rounded-2xl bg-white">
          <p class="mb-5 text-[#555] text-2xl">
            <font-awesome-icon icon="fa-solid fa-link" class="mr-5" />
            分享您的問卷
          </p>
          <FormInput id="share-link" class="mb-3.5 py-3 px-4 disabled:bg-[#eee]" :input-value="shareCode" disabled />
          <button
            class="py-3 px-9 rounded-md bg-[#52528c] text-white"
            type="button"
            v-clipboard:copy="`${shareCode}`"
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
            :value="embedCode"
            disabled
            style="min-height: 150px"
          />
          <button
            class="py-3 px-9 rounded-md bg-[#52528c] text-white"
            type="button"
            v-clipboard:copy="`${embedCode}`"
            v-clipboard:success="copy_success"
            v-clipboard:error="copy_error"
          >
            複製
          </button>
        </div>
      </template>
      <template v-else>
        <div class="flex items-center justify-center py-9 px-[54px] h-[150px] rounded-2xl bg-white">
          <button
            class="py-2.5 px-12 border border-solid border-[#52528c] rounded-full bg-[#52528c] hover:bg-[#424281] text-white font-bold text-2xl"
            type="button"
            @click.prevent="createPublishLink"
          >
            產生發布連結
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import FormInput from '@/components/FormInput.vue'

export default {
  name: 'FormRelease',
  components: { FormInput },
  data: () => ({
    locationLink: `${location.origin}/form-render`,
    code: '',
  }),
  created() {
    if (this.$route.query.formId) {
      const id = Number(this.$route.query.formId)
      this.getPublish(id)
    }
  },
  computed: {
    shareCode() {
      const id = Number(this.$route.query.formId)
      return `${this.locationLink}?formId=${id}&code=${this.code['share_code']}`
    },
    embedCode() {
      return `<iframe width="560" height="315" src="${this.shareCode}" title="${process.env.VUE_APP_TITLE}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
  },
  methods: {
    /**@取得表單發布資料 */
    getPublish(id) {
      this.axios.publishInfo({ id }).then((res) => {
        const { code, data } = res.data
        if (code === 200) this.code = data
      })
    },
    /**@產生發布連結 */
    createPublishLink() {
      const id = Number(this.$route.query.formId)
      this.axios.createPublishLink({ id }).then((res) => {
        if (res.data.code === 200) this.getPublish(id)
      })
    },
    copy_success() {
      this.$toasted.info('複製成功', { position: 'top-center' })
    },
    copy_error() {
      this.$toasted.error('無法複製內容、瀏覽器不支援', { position: 'top-center' })
    },
  },
}
</script>
