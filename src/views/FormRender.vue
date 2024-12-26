<template>
  <section>
    <Modal v-if="modal" :close-btn="false" class="text-center">
      <p class="mb-5 text-[#54588c] font-bold text-3xl">{{ form_data['name'] }}</p>
      <p class="mb-10 text-lg">{{ finishText }}</p>
      <p class="font-bold">感謝您撥空填寫</p>
    </Modal>
    <div class="flex-1 h-screen bg-[#d8d7e3] overflow-y-auto scroll-style">
      <div
        :class="['mx-auto pt-10 xl:pt-24 px-5 pb-10 xl:pb-20 w-full md:w-4/5 xl:w-[60%]', { 'flex items-center h-screen': form_data['is_expired'] }]"
      >
        <template v-if="form_data['is_expired']">
          <div
            class="relative py-10 px-5 w-full overflow-hidden rounded-2xl bg-[#f9f9fb] shadow-[0_3px_6px_0_rgb(82,82,140)] before:absolute before:top-0 before:left-0 before:block before:w-full before:h-2.5 before:bg-[#52528c] before:content-['']"
          >
            <p class="font-bold text-center text-3xl">此表單已超過可填寫時間</p>
          </div>
        </template>
        <template v-else>
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
              <div v-html="form_data['description']" />
            </div>
            <ul :class="['mb-5', form_data['question_number'] ? 'pl-8 pr-4 lg:pl-10 list-decimal' : 'px-2.5 lg:px-5 list-none']">
              <ValidationObserver ref="renderForm">
                <li v-for="(item, index) in form_data['questions']" :key="item['form_question_id']">
                  <div class="p-2.5 lg:py-3 lg:px-6">
                    <template v-if="item['type'] === 'text'">
                      <ValidationProvider :name="item['title']" :rules="{ required: item['is_required'] }">
                        <div
                          :class="['p-2 rounded-md border border-solid', errors[0] ? 'border-[#ff3a3a]' : 'border-[#f9f9fb]']"
                          slot-scope="{ valid, errors }"
                        >
                          <QuestionTitle :info="item" />
                          <div>
                            <input
                              v-model="form.answers[index].answer['value']"
                              :class="['pb-0.5 w-4/5 border-b border-solid bg-[#f9f9fb]', errors[0] ? 'border-[#ff3a3a]' : 'border-[#cbcccd]']"
                              :maxlength="item.other.config['max']"
                              :type="item.other.config['type']"
                              :state="errors[0] ? false : valid ? true : null"
                              placeholder="您的回答"
                            />
                          </div>
                          <small :class="{ 'text-[#ff3a3a]': errors[0] }">{{ errors[0] }}</small>
                        </div>
                      </ValidationProvider>
                    </template>
                    <template v-else-if="item['type'] === 'textarea'">
                      <ValidationProvider :name="item['title']" :rules="{ required: item['is_required'] }">
                        <div
                          :class="['p-2 rounded-md border border-solid', errors[0] ? 'border-[#ff3a3a]' : 'border-[#f9f9fb]']"
                          slot-scope="{ valid, errors }"
                        >
                          <QuestionTitle :info="item" />
                          <textarea
                            v-model="form.answers[index].answer['value']"
                            :class="[
                              'w-full border-b border-solid bg-[#f9f9fb] resize-none focus-visible:outline-none',
                              errors[0] ? 'border-[#ff3a3a]' : 'border-[#cbcccd]',
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
                          <small :class="{ 'text-[#ff3a3a]': errors[0] }">{{ errors[0] }}</small>
                        </div>
                      </ValidationProvider>
                    </template>
                    <template v-else-if="item['type'] === 'radio'">
                      <ValidationProvider :name="item['title']" :rules="{ required: item['is_required'] }">
                        <div
                          :class="['p-2 rounded-md border border-solid', errors[0] ? 'border-[#ff3a3a]' : 'border-[#f9f9fb]']"
                          slot-scope="{ valid, errors }"
                        >
                          <QuestionTitle :info="item" />
                          <div v-for="(radio, i) in item['option']" :key="i" class="[&:not(:last-child)]:mb-3">
                            <label :for="`${item['title']}-${radio.text}-${i}`" :class="['w-full text-left text-base']">
                              <input
                                v-model="form.answers[index].answer['value']"
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
                          <small :class="{ 'text-[#ff3a3a]': errors[0] }">{{ errors[0] }}</small>
                        </div>
                      </ValidationProvider>
                    </template>
                    <template v-else-if="item['type'] === 'checkbox'">
                      <ValidationProvider :name="item['title']" :rules="{ required: item['is_required'] }">
                        <div
                          :class="['p-2 rounded-md border border-solid', errors[0] ? 'border-[#ff3a3a]' : 'border-[#f9f9fb]']"
                          slot-scope="{ valid, errors }"
                        >
                          <QuestionTitle :info="item" />
                          <div v-for="(checkbox, i) in item['option']" :key="i" class="[&:not(:last-child)]:mb-3">
                            <label :for="`${item['title']}-${checkbox.text}-${i}`" :class="['py-2 pl-10 cursor-pointer question-checkbox']">
                              <input
                                v-model="form.answers[index].answer['value']"
                                :id="`${item['title']}-${checkbox.text}-${i}`"
                                :name="item['title']"
                                :value="checkbox.value"
                                :state="errors[0] ? false : valid ? true : null"
                                class="checkbox-checked"
                                type="checkbox"
                              />
                              <span class="relative before:-translate-y-1/2 after:-translate-y-1/2">{{ checkbox.text }}</span>
                            </label>
                          </div>
                          <small :class="{ 'text-[#ff3a3a]': errors[0] }">{{ errors[0] }}</small>
                        </div>
                      </ValidationProvider>
                    </template>
                    <template v-else-if="item['type'] === 'select'">
                      <ValidationProvider :name="item['title']" :rules="{ required: item['is_required'] }">
                        <div
                          :class="['p-2 rounded-md border border-solid', errors[0] ? 'border-[#ff3a3a]' : 'border-[#f9f9fb]']"
                          slot-scope="{ valid, errors }"
                        >
                          <QuestionTitle :info="item" />
                          <div class="relative overflow-hidden w-full lg:w-1/2 h-10 border border-solid border-[#cbcccd] rounded-md">
                            <select
                              v-model="form.answers[index].answer['value']"
                              class="px-5 w-full h-full outline-none border-0 select"
                              :name="`question-${item['title']}`"
                              :id="`question-${item['title']}`"
                              :state="errors[0] ? false : valid ? true : null"
                            >
                              <option value="" selected disabled>請選擇</option>
                              <option v-for="opt in item['option']" :key="opt.value" :value="opt.value">{{ opt.text }}</option>
                            </select>
                            <font-awesome-icon icon="fa-solid fa-angle-down" class="absolute top-1/2 right-2.5 -translate-y-1/2" />
                          </div>
                          <small :class="{ 'text-[#ff3a3a]': errors[0] }">{{ errors[0] }}</small>
                        </div>
                      </ValidationProvider>
                    </template>
                    <template v-else-if="item['type'] === 'file'">
                      <ValidationProvider
                        :name="item['title']"
                        :rules="{ required: item['is_required'] && !Boolean(form.answers[index].answer['value']) }"
                      >
                        <div
                          :class="[
                            'p-2 rounded-md border border-solid',
                            errors[0] && !form.answers[index][item['title']] ? 'border-[#ff3a3a]' : 'border-[#f9f9fb]',
                          ]"
                          slot-scope="{ valid, errors }"
                        >
                          <QuestionTitle :info="item" />
                          <div class="flex items-center">
                            <label
                              :for="`${item['title']}-file`"
                              class="mr-8 py-2 px-7 border border-solid border-[#888] hover:border-[#acaccc] rounded-md hover:bg-[#acaccc]/30 text-[#1c77c3] cursor-pointer"
                            >
                              <input
                                class="hidden"
                                type="file"
                                :id="`${item['title']}-file`"
                                :accept="formatFileType(item.other.file['type'])"
                                :state="errors[0] ? false : valid ? true : null"
                                @change.prevent="uploadFile($event, index)"
                              />
                              <font-awesome-icon icon="fa-solid fa-arrow-up-from-bracket" class="mr-3" />
                              <span>新增檔案</span>
                            </label>
                            <small v-if="Object.keys(fileTemporaryInfo).length">
                              {{ fileTemporaryInfo.name }}<br />{{ fileTemporaryInfo.size }} KB
                            </small>
                          </div>
                          <small
                            v-if="errors[0] && !form.answers[index][item['title']]"
                            :class="{ 'text-[#ff3a3a]': errors[0] && !form.answers[index][item['title']] }"
                            >{{ errors[0] }}</small
                          >
                          <small v-if="fileTemporaryInfo.size > item.other.file['size'] * 1024" class="text-danger">
                            檔案大小不可超過 {{ item.other.file['size'] }} MB
                          </small>
                        </div>
                      </ValidationProvider>
                    </template>
                    <template v-else-if="item['type'] === 'range'">
                      <ValidationProvider :name="item['title']" :rules="{ required: item['is_required'] }">
                        <div
                          :class="['p-2 rounded-md border border-solid', errors[0] ? 'border-[#ff3a3a]' : 'border-[#f9f9fb]']"
                          slot-scope="{ valid, errors }"
                        >
                          <QuestionTitle :info="item" />
                          <div class="flex overflow-x-auto items-center justify-between p-5 min-w-full">
                            <p class="text-nowrap">{{ item.other.config['min_text'] }}</p>
                            <div class="flex flex-1 justify-around mx-10">
                              <div v-for="num in item.other.config['max']" :key="num" class="mx-2.5 min-w-10">
                                <label :for="`${item['title']}-${num}`" class="block text-left text-base cursor-pointer">
                                  <input
                                    v-model="form.answers[index].answer['value']"
                                    :id="`${item['title']}-${num}`"
                                    :name="item['title']"
                                    :value="num"
                                    :state="errors[0] ? false : valid ? true : null"
                                    class="hidden"
                                    type="radio"
                                  />
                                  <p
                                    class="pb-10 text-center before:bottom-0 before:left-1/2 before:block before:w-5 before:h-5 before:border before:border-solid before:border-[#d8d7e3] before:rounded-full before:bg-white before:content-[''] before:-translate-x-1/2 radio-control"
                                  >
                                    {{ num }}
                                  </p>
                                </label>
                              </div>
                            </div>
                            <p class="text-nowrap">{{ item.other.config['max_text'] }}</p>
                          </div>
                          <small :class="{ 'text-[#ff3a3a]': errors[0] }">{{ errors[0] }}</small>
                        </div>
                      </ValidationProvider>
                    </template>
                    <template v-else-if="item['type'] === 'single'">
                      <div
                        :class="[
                          'p-2 rounded-md border border-solid',
                          form.answers[index].errorStatus['status'] && item['is_required'] ? 'border-[#ff3a3a]' : 'border-[#f9f9fb]',
                        ]"
                      >
                        <QuestionTitle :info="item" />
                        <div class="overflow-x-auto whitespace-nowrap">
                          <div class="table min-w-full table-auto border-spacing-y-2">
                            <div class="table-row">
                              <div class="table-cell p-1 w-20 h-12" />
                              <div
                                v-for="(column_item, i) in item.option['column']"
                                :key="i"
                                class="table-cell p-1 w-20 h-12 text-center leading-[48px] whitespace-nowrap"
                              >
                                {{ column_item.value }}
                              </div>
                            </div>
                            <div v-for="(list, i) in Object.keys(item.option['Ar'])" :key="`${list}-${i}`" class="table-row bg-[#e0e0e0]/30">
                              <div class="table-cell p-1 min-w-20 h-12 whitespace-nowrap leading-[48px]">{{ list }}</div>
                              <div v-for="(column, j) in item.option['Ar'][list]" :key="`${column}-${j}`" class="table-cell p-1">
                                <label :for="`single_${list}-${column}`" class="p-1 block cursor-pointer">
                                  <input
                                    v-model="form.answers[index].answer.value[list]"
                                    class="hidden"
                                    type="radio"
                                    :id="`single_${list}-${column}`"
                                    :name="`${list}`"
                                    :value="column"
                                    @change="arrayChange(item['is_required'], form.answers[index], item['title'])"
                                  />
                                  <p
                                    class="relative mx-auto py-2 before:absolute before:rounded-full before:top-1/2 before:left-1/2 before:block before:w-5 before:h-5 before:border before:border-solid before:border-[#d8d7e3] before:bg-white before:content-[''] before:-translate-x-1/2 before:-translate-y-1/2 radio-control"
                                  >
                                    &emsp;
                                  </p>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <small v-if="form.answers[index].errorStatus['status'] && item['is_required']" class="text-[#ff3a3a]">
                          {{ form.answers[index].errorStatus['errorText'] }}
                        </small>
                      </div>
                    </template>
                    <template v-else-if="item['type'] === 'multiple'">
                      <div
                        :class="[
                          'p-2 rounded-md border border-solid',
                          form.answers[index].errorStatus['status'] && item['is_required'] ? 'border-[#ff3a3a]' : 'border-[#f9f9fb]',
                        ]"
                      >
                        <QuestionTitle :info="item" />
                        <div class="overflow-x-auto whitespace-nowrap">
                          <div class="table min-w-full table-auto border-spacing-y-2">
                            <div class="table-row">
                              <div class="table-cell p-1 w-20 h-12" />
                              <div
                                v-for="(column_item, i) in item.option['column']"
                                :key="i"
                                class="table-cell p-1 w-20 h-12 text-center leading-[48px] whitespace-nowrap"
                              >
                                {{ column_item.value }}
                              </div>
                            </div>
                            <div v-for="(list, i) in Object.keys(item.option['Ar'])" :key="`${list}-${i}`" class="table-row bg-[#e0e0e0]/30">
                              <div class="table-cell p-1 min-w-20 h-12 whitespace-nowrap leading-[48px]">{{ list }}</div>
                              <div v-for="(column, j) in item.option['Ar'][list]" :key="`${column}-${j}`" class="table-cell p-1">
                                <label :for="`multiple_${list}-${column}`" class="p-1 block cursor-pointer question-checkbox">
                                  <input
                                    v-model="form.answers[index].answer.value[list]"
                                    class="checkbox-checked"
                                    type="checkbox"
                                    :id="`multiple_${list}-${column}`"
                                    :name="`${list}`"
                                    :value="column"
                                    @change="arrayChange(item['is_required'], form.answers[index], item['title'])"
                                  />
                                  <p
                                    class="relative py-2.5 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 checkbox-control"
                                  >
                                    &emsp;
                                  </p>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <small v-if="form.answers[index].errorStatus['status'] && item['is_required']" class="text-[#ff3a3a]">
                          {{ form.answers[index].errorStatus['errorText'] }}
                        </small>
                      </div>
                    </template>
                    <template v-else-if="item['type'] === 'date'">
                      <ValidationProvider :name="item['title']" :rules="{ required: item['is_required'] }">
                        <div
                          :class="['p-2 rounded-md border border-solid', errors[0] ? 'border-[#ff3a3a]' : 'border-[#f9f9fb]']"
                          slot-scope="{ valid, errors }"
                        >
                          <QuestionTitle :info="item" />
                          <div>
                            <date-picker class="mr-3" v-model="form.answers[index].answer['value']" value-type="format" type="date">
                              <template #input>
                                <input
                                  :class="[
                                    'py-1 px-3 w-full border-b border-solid bg-[#fafaf9] placeholder:text-[#888] text-lg',
                                    errors[0] ? 'border-[#ff3a3a]' : 'border-[#cbcccd]',
                                  ]"
                                  :value="form.answers[index].answer['value']"
                                  :state="errors[0] ? false : valid ? true : null"
                                  placeholder="年 / 月 / 日"
                                />
                              </template>
                            </date-picker>
                          </div>
                          <small :class="{ 'text-[#ff3a3a]': errors[0] }">{{ errors[0] }}</small>
                        </div>
                      </ValidationProvider>
                    </template>
                    <template v-else-if="item['type'] === 'time'">
                      <ValidationProvider :name="item['title']" :rules="{ required: item['is_required'] }">
                        <div
                          :class="['p-2 rounded-md border border-solid', errors[0] ? 'border-[#ff3a3a]' : 'border-[#f9f9fb]']"
                          slot-scope="{ valid, errors }"
                        >
                          <QuestionTitle :info="item" />
                          <div>
                            <date-picker class="mr-3" v-model="form.answers[index].answer['value']" format="hh:mm a" value-type="format" type="time">
                              <template #input>
                                <input
                                  :class="[
                                    'py-1 px-3 w-full border-b border-solid bg-[#fafaf9] placeholder:text-[#888] text-lg',
                                    errors[0] ? 'border-[#ff3a3a]' : 'border-[#cbcccd]',
                                  ]"
                                  :value="form.answers[index].answer['value']"
                                  :state="errors[0] ? false : valid ? true : null"
                                  placeholder="時間"
                                />
                              </template>
                            </date-picker>
                          </div>
                          <small :class="{ 'text-[#ff3a3a]': errors[0] }">{{ errors[0] }}</small>
                        </div>
                      </ValidationProvider>
                    </template>
                  </div>
                </li>
              </ValidationObserver>
            </ul>

            <div class="flex justify-center">
              <button
                class="py-1 lg:py-3 px-12 lg:px-10 rounded-full bg-[#54588c] hover:bg-[#3a3b72] text-white font-bold text-2xl"
                type="button"
                @click.prevent="submit"
              >
                送出
              </button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Modal from '@/components/Modal.vue'
import QuestionTitle from '@/components/QuestionTitle.vue'

export default {
  name: 'FormRender',
  components: { Modal, QuestionTitle },
  data: () => ({
    form_data: {}, // 問題資料
    form: {
      // 送出答案
      form_id: null,
      answers: [],
    },
    fileTemporaryInfo: {},
    finishText: '',
  }),
  mounted() {
    if (this.$route.query) {
      const form_id = Number(this.$route.query['formId'])
      const share_code = this.$route.query['code']
      this.formRenderInfo(form_id, share_code)
    }
  },
  // computed: {
  //   rangeWidth: function () {
  //     return function (num) {
  //       return { width: `calc(100% / ${num})` }
  //     }
  //   },
  // },
  computed: {
    ...mapState({ modal: (state) => state.isModal }),
  },
  methods: {
    /**@取得表單資訊
     * @param {Number} form_id 表單ID
     * @param {String} share_code 表單隨機碼
     */
    formRenderInfo(form_id, share_code) {
      this.axios.renderInfo({ form_id, share_code }).then((res) => {
        const { code, data } = res.data
        if (code === 200) {
          this.form_data = data
          this.form['form_id'] = form_id
          document.title = data['name']
          this.finishText = data.submit_message
          this.form_data['questions'].forEach((x) => {
            let obj = {}
            obj['questionsType'] = x['type']
            obj['form_question_id'] = x['form_question_id']
            if (x['type'] === 'checkbox') obj['answer'] = { text: x['title'], value: [] }
            else if (['file', 'date', 'time'].includes(x['type'])) obj['answer'] = { text: x['title'], value: null }
            else if (x['type'] === 'single') {
              let ans = {}
              Object.keys(x.option['Ar']).forEach((item) => (ans[item] = null))
              obj['errorStatus'] = {
                isRequired: x['is_required'],
                status: false,
                errorText: '在這個問題中，您必須針對每一列選取一個回覆',
              }
              obj['answer'] = { text: x['title'], value: ans }
            } else if (x['type'] === 'multiple') {
              let ans = {}
              Object.keys(x.option['Ar']).forEach((item) => (ans[item] = []))
              obj['errorStatus'] = {
                isRequired: x['is_required'],
                status: false,
                errorText: '在這個問題中，您必須針對每一列選取一個或多個回覆',
              }
              obj['answer'] = { text: x['title'], value: ans }
            } else obj['answer'] = { text: x['title'], value: '' }
            this.form['answers'].push(obj)
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
    /**@檔案上傳限制類型拼組
     * @param {Array} val 檔案類型限制
     */
    formatFileType(val) {
      let str = ''
      val.forEach((x, i) => {
        if (i + 1 === val.length) str = str + x
        else str = str + x + ', '
      })
      return str
    },
    /**@檔案上傳設定key值
     * @param {Object} env 上傳檔案事件
     * @param {Number} i 問題索引值
     */
    uploadFile(env, i) {
      const formData = new FormData()
      const file = env.target.files[0]
      const sizeFormat = Math.ceil(file.size / 1024)
      this.fileTemporaryInfo = { file, name: file.name, size: sizeFormat }
      if (file) {
        formData.append('file[]', file)
        formData.append('belong', 'answer')
        this.axios.upload(formData).then((res) => {
          const { code, data } = res.data
          if (code === 200) this.form.answers[i].answer['value'] = data.url
        })
      }
    },
    /**@陣列radio_checkbox樣式判斷
     * @param {Boolean} isRequired 是否必填
     * @param {Object} info 問題資訊
     */
    arrayChange(isRequired, info) {
      if (isRequired) {
        for (let i = 0; i < Object.values(info.answer['value']).length; i++) {
          if (info['questionsType'] === 'single') {
            if (Object.values(info.answer['value'])[i] === null) {
              info.errorStatus['status'] = true
              break
            } else info.errorStatus['status'] = false
          } else if (info['questionsType'] === 'multiple') {
            if (Object.values(info.answer['value'])[i].length === 0) {
              info.errorStatus['status'] = true
              break
            } else info.errorStatus['status'] = false
          }
        }
      }
    },
    /**@表單送出 */
    submit() {
      this.$refs.renderForm.validate().then((success) => {
        let Arr_success = true
        this.form['answers'].forEach((q) => {
          if (['single', 'multiple'].includes(q.questionsType)) {
            this.arrayChange(q.errorStatus['isRequired'], q)
            if (q.questionsType === 'single') {
              if (Object.values(q.answer['value']).some((x) => x === null)) Arr_success = false
            } else if (q.questionsType === 'multiple') {
              if (Object.values(q.answer['value']).some((x) => x.length === 0)) Arr_success = false
            }
          }
        })
        if (!success || !Arr_success) {
          this.$toasted.error('問題未填寫完全', { position: 'top-center' })
          return
        }
        if (Arr_success && success) {
          this.axios.submitQuestionnaire(this.form).then((res) => {
            if (res.data.code === 200) this.$store.dispatch('isModal', true)
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.question-checkbox span,
.question-checkbox p {
  &::before,
  &::after {
    position: absolute;
    top: 50%;
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    content: '';
  }
  &::before {
    border: 1px solid #cbcccd;
    background-color: #fff;
  }
}
input[type='checkbox'] {
  display: none;
}
input[class='checkbox-checked']:checked + span,
input[class='checkbox-checked']:checked + p {
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
