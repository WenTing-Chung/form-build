<template>
  <div class="flex-1 h-screen bg-[#d8d7e3] overflow-y-auto scroll-style">
    <div class="mx-auto pt-10 xl:pt-24 px-5 pb-10 xl:pb-20 w-full md:w-4/5 xl:w-[60%]">
      <template v-if="form_data.form_image && Object.keys(form_data.form_image).length">
        <div class="overflow-hidden mb-6 rounded-[10px]">
          <img class="w-full h-56 object-cover" :src="form_data.form_image['path']" alt="top-of-page" />
        </div>
      </template>
      <div
        class="pb-10 overflow-hidden rounded-2xl bg-[#f9f9fb] shadow-[0_3px_6px_0_rgb(82,82,140)] before:block before:w-full before:h-2.5 before:bg-[#52528c] before:content-['']"
      >
        <div class="py-6 px-8 border-b border-solid border-[#707070]">
          <p class="mb-4 font-bold text-4xl">{{ form_data['name'] }}</p>
          <p class="text-base">{{ form_data['description'] }}</p>
        </div>
        <ul>
          <ValidationObserver ref="renderForm">
            <li v-for="item in form_data['questions']" :key="item['form_question_id']">
              <div class="py-5 px-8">
                <p class="mb-1.5 text-lg">
                  <span v-if="item['is_required']" class="mr-1 text-[#c81d25]">*</span>
                  <span
                    :class="{
                      'font-bold': item.other.config['bold'],
                      italic: item.other.config['italic'],
                      underline: item.other.config['underline'],
                    }"
                  >
                    {{ item['title'] }}
                  </span>
                </p>
                <p class="mb-4">{{ item['description'] }}</p>
                <template v-if="item['type'] === 'text'">
                  <ValidationProvider :name="item['title']" :rules="{ required: item['is_required'] }">
                    <div slot-scope="{ valid, errors }">
                      <div>
                        <input
                          v-model="form[item['title']]"
                          :class="['pb-0.5 w-4/5 border-b border-solid bg-[#f9f9fb]', errors[0] ? 'border-danger' : 'border-[#cbcccd]']"
                          :maxlength="item.other.config['max']"
                          :type="item.other.config['type']"
                          :state="errors[0] ? false : valid ? true : null"
                          placeholder="您的回答"
                        />
                      </div>
                      <small :class="{ 'text-danger': errors[0] }">{{ errors[0] }}</small>
                    </div>
                  </ValidationProvider>
                </template>
                <template v-else-if="item['type'] === 'textarea'">
                  <ValidationProvider :name="item['title']" :rules="{ required: item['is_required'] }">
                    <div slot-scope="{ valid, errors }">
                      <div>
                        <textarea
                          v-model="form[item['title']]"
                          :class="[
                            'w-full border-b border-solid bg-[#f9f9fb] resize-none focus-visible:outline-none',
                            errors[0] ? 'border-danger' : 'border-[#cbcccd]',
                          ]"
                          :id="`${item['title']}-${item.other['id']}`"
                          :maxlength="item.other.config['max']"
                          :state="errors[0] ? false : valid ? true : null"
                          :style="{ height: item.other['style'] }"
                          placeholder="您的回答"
                          @keydown="textareaCount(item.other['id'])"
                          @keyup="textareaCount(item.other['id'])"
                          @keyup.enter="textareaCount(item.other['id'])"
                        />
                      </div>
                      <small :class="{ 'text-danger': errors[0] }">{{ errors[0] }}</small>
                    </div>
                  </ValidationProvider>
                </template>
                <template v-else-if="item['type'] === 'radio'">
                  <ValidationProvider :name="item['title']" :rules="{ required: item['is_required'] }">
                    <div slot-scope="{ valid, errors }">
                      <div v-for="(radio, i) in item['option']" :key="i" class="[&:not(:last-child)]:mb-3">
                        <label :for="`${item['title']}-${radio.text}-${i}`" :class="['w-full text-left text-base']">
                          <input
                            v-model="form[item['title']]"
                            :id="`${item['title']}-${radio.text}-${i}`"
                            :name="item['title']"
                            :value="radio.value"
                            :state="errors[0] ? false : valid ? true : null"
                            class="hidden"
                            type="radio"
                          />
                          <span
                            class="relative py-2 pl-10 before:absolute before:rounded-full before:top-1/2 before:left-0 before:block before:-translate-y-1/2 before:w-5 before:h-5 before:border before:border-solid before:border-[#d8d7e3] before:bg-white before:content-[''] radio-control"
                          >
                            {{ radio.text }}
                          </span>
                        </label>
                      </div>
                      <small :class="{ 'text-danger': errors[0] }">{{ errors[0] }}</small>
                    </div>
                  </ValidationProvider>
                </template>
                <template v-else-if="item['type'] === 'checkbox'">
                  <ValidationProvider :name="item['title']" :rules="{ required: item['is_required'] }">
                    <div slot-scope="{ valid, errors }">
                      <div v-for="(checkbox, i) in item['option']" :key="i" class="[&:not(:last-child)]:mb-3">
                        <label :for="`${item['title']}-${checkbox.text}-${i}`" :class="['py-2 pl-10 cursor-pointer question-checkbox']">
                          <input
                            v-model="form[item['title']]"
                            :id="`${item['title']}-${checkbox.text}-${i}`"
                            :name="item['title']"
                            :value="checkbox.value"
                            :state="errors[0] ? false : valid ? true : null"
                            class="checkbox-checked"
                            type="checkbox"
                          />
                          <span class="relative">{{ checkbox.text }}</span>
                        </label>
                      </div>
                      <small :class="{ 'text-danger': errors[0] }">{{ errors[0] }}</small>
                    </div>
                  </ValidationProvider>
                </template>
                <template v-else-if="item['type'] === 'select'">
                  <ValidationProvider :name="item['title']" :rules="{ required: item['is_required'] }">
                    <div slot-scope="{ valid, errors }">
                      <div class="relative overflow-hidden w-1/2 h-10 border border-solid border-[#cbcccd] rounded-md">
                        <select
                          :name="`question-${item['title']}`"
                          :id="`question-${item['title']}`"
                          class="px-5 w-full h-full outline-none border-0 select"
                          :state="errors[0] ? false : valid ? true : null"
                        >
                          <option value="" selected disabled>請選擇</option>
                          <option v-for="opt in item['option']" :key="opt.value" :value="opt.value">{{ opt.text }}</option>
                        </select>
                        <font-awesome-icon icon="fa-solid fa-angle-down" class="absolute top-1/2 right-2.5 -translate-y-1/2" />
                      </div>
                      <small :class="{ 'text-danger': errors[0] }">{{ errors[0] }}</small>
                    </div>
                  </ValidationProvider>
                </template>
                <template v-else-if="item['type'] === 'file'">
                  <ValidationProvider :name="item['title']" :rules="{ required: item['is_required'], size: 100 }">
                    <div slot-scope="{ valid, errors }">
                      <label
                        :for="`${item['title']}-file`"
                        class="py-2 px-7 border border-solid border-[#888] hover:border-[#acaccc] rounded-md hover:bg-[#acaccc]/30 text-[#1c77c3] cursor-pointer"
                      >
                        <input
                          class="hidden"
                          type="file"
                          :id="`${item['title']}-file`"
                          :accept="formatFileType(item.other.file['type'])"
                          :state="errors[0] ? false : valid ? true : null"
                          @change.prevent="uploadFile($event, item['title'])"
                        />
                        <font-awesome-icon icon="fa-solid fa-arrow-up-from-bracket" class="mr-3" />
                        <span>新增檔案</span>
                      </label>
                      <small :class="{ 'text-danger': errors[0] }">{{ errors[0] }}</small>
                    </div>
                  </ValidationProvider>
                </template>
              </div>
            </li>
          </ValidationObserver>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormRender',
  data: () => ({
    form_data: {}, // 問題資料
    form: {}, // 送出答案
    search: {},
  }),
  created() {
    if (this.$route.query) {
      const form_id = Number(this.$route.query['formId'])
      const share_code = this.$route.query['code']
      this.formRenderInfo(form_id, share_code)
    }
  },
  methods: {
    /**@取得表單資訊 */
    formRenderInfo(form_id, share_code) {
      this.axios.renderInfo({ form_id, share_code }).then((res) => {
        const { code, data } = res.data
        if (code === 200) {
          this.form_data = data
          document.title = `${data['name']} - ${process.env.VUE_APP_TITLE}`
          this.form_data['questions'].forEach((x) => {
            if (x['type'] === 'checkbox') this.form[x['title']] = []
            else this.form[x['title']] = ''
          })
        }
      })
    },
    /**@計算textarea行數 */
    textareaCount(id) {
      const q = this.form_data['questions'].find((x) => x.other['id'] === id)
      const tmp = document.querySelector(`#${q['title']}-${id}`).value
      const lines = tmp.split(/\r*\n/)
      const linesCount = lines.length - (navigator.userAgent.indexOf('MSIE') !== -1)
      q.other['style'] = `${linesCount * 30 + 20}px`
    },
    /**@檔案上傳限制類型拼組 */
    formatFileType(val) {
      let str = ''
      val.forEach((x, i) => {
        if (i + 1 === val.length) str = str + x
        else str = str + x + ', '
      })
      return str
    },
    /**@檔案上傳設定key值 */
    uploadFile(env, key) {
      console.log(env, key)
    },
  },
}
</script>

<style lang="scss" scoped>
.question-checkbox span {
  &::before,
  &::after {
    position: absolute;
    top: 50%;
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    content: '';
    transform: translateY(-50%);
  }
  &::before {
    border: 1px solid #cbcccd;
    background-color: #fff;
  }
}
input[type='checkbox'] {
  display: none;
}
input[class='checkbox-checked']:checked + span {
  &::before {
    border-color: #52528c;
    background-color: #52528c;
    box-shadow: 0 0 4px 0 #52528c;
  }
  &::after {
    background-color: #fff;

    clip-path: polygon(15% 60%, 33% 80%, 85% 10%, 90% 15%, 33% 90%, 10% 65%);
  }
}

.select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>
