<template>
  <div class="overflow-y-auto w-full h-full bg-[#eee] scroll-style">
    <div class="mx-auto p-8 w-[min(100%,_1024px)]">
      <div class="py-11 px-9 rounded-2xl bg-white">
        <h2 class="pb-5 border-b border-solid border-[#ccc] text-2xl">設定</h2>
        <div class="py-10 px-[50px] border-b border-solid border-[#ccc]">
          <div class="mb-8">
            <h3 class="mb-4 text-lg">簡報</h3>
            <p>管理表單和回覆的顯示方式</p>
          </div>
          <ul class="pl-9 pr-5">
            <li class="mb-7">
              <p class="mb-3.5 text-[#888] text-xs">表單呈現方式</p>
              <div class="flex items-center justify-between">
                <p>顯示進度列</p>
                <SwitchElement :status="form['progress_bar']" @switch_status="switchControl($event, 'progress_bar')" />
              </div>
            </li>
            <li class="mb-7">
              <p class="mb-3.5 text-[#888] text-xs">題號顯示</p>
              <div class="flex items-center justify-between">
                <p>題號顯示與不顯示</p>
                <SwitchElement :status="form['question_number']" @switch_status="switchControl($event, 'question_number')" />
              </div>
            </li>
            <li>
              <p class="mb-3.5 text-[#888] text-xs">提交表單後</p>
              <div class="relative">
                <p :class="['ease-in-out duration-200', { 'absolute -top-2.5 left-3 py-0.5 px-1 bg-white text-[#5f6368] text-sm': edit_message }]">
                  確認訊息
                </p>
                <div class="flex items-center justify-between">
                  <input
                    v-model="form['submit_message']"
                    :class="[
                      'flex-1 mr-5 rounded bg-white',
                      edit_message ? 'p-4 border border-solid border-[#dadce0]' : 'text-[#5f6368] italic text-sm',
                    ]"
                    type="text"
                    :disabled="!edit_message"
                  />
                  <template v-if="edit_message">
                    <div class="flex">
                      <button
                        class="p-2 rounded text-[#0054ff] text-lg hover:bg-[rgba(66,133,244,0.04)]"
                        type="button"
                        @click.prevent="edit_message = false"
                      >
                        儲存
                      </button>
                      <button
                        class="p-2 rounded text-[#5f6368] text-lg hover:bg-[rgba(95,99,104,0.04)]"
                        type="button"
                        @click.prevent=";(form['submit_message'] = oldData['submit_message']), (edit_message = false)"
                      >
                        取消
                      </button>
                    </div>
                  </template>
                  <template v-else>
                    <button
                      class="p-2 rounded text-[#0054ff] text-lg hover:bg-[rgba(66,133,244,0.04)]"
                      type="button"
                      @click.prevent=";(oldData['submit_message'] = form['submit_message']), (edit_message = true)"
                    >
                      編輯
                    </button>
                  </template>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="mb-10 py-10 px-[50px]">
          <div :class="['flex items-center justify-between', { 'mb-8': form['time_enable_status'] }]">
            <div>
              <h3 class="mb-4 text-lg">時間效期</h3>
              <p>設定表單有效時間，過了時段就關閉</p>
            </div>
            <SwitchElement
              :status="form['time_enable_status']"
              @switch_status=";(edit_timeValid = false), switchControl($event, 'time_enable_status')"
            />
          </div>
          <ul
            :class="[
              'pl-9 pr-5 overflow-hidden',
              form['time_enable_status'] ? 'max-h-[500px] h-auto transition-all ease-in-out duration-[500ms]' : 'max-h-0',
            ]"
          >
            <li>
              <p class="mb-3.5 text-[#888] text-xs">表單時間</p>
              <div class="flex items-center justify-between">
                <template v-if="edit_timeValid">
                  <div class="flex-1 mr-5">
                    <date-picker class="mr-3" v-model="form['start_time']" value-type="format" type="datetime">
                      <template #input>
                        <input
                          class="py-2 pl-2.5 w-full rounded-[10px] bg-[#fafaf9] placeholder:text-[#888] text-base"
                          :value="form['start_time']"
                          placeholder="開始時間"
                        />
                      </template>
                    </date-picker>
                    <span>至</span>
                    <date-picker class="ml-3" v-model="form['end_time']" value-type="format" type="datetime">
                      <template #input>
                        <input
                          class="py-2 pl-2.5 w-full rounded-[10px] bg-[#fafaf9] placeholder:text-[#888] text-base"
                          :value="form['end_time']"
                          placeholder="結束時間"
                        />
                      </template>
                    </date-picker>
                  </div>
                </template>
                <template v-else>
                  <input :value="dateShow" class="flex-1 mr-5 bg-white text-[#5f6368] italic text-sm" type="text" disabled />
                </template>
                <template v-if="edit_timeValid">
                  <div class="flex">
                    <button
                      class="p-2 rounded text-[#0054ff] text-lg hover:bg-[rgba(66,133,244,0.04)]"
                      type="button"
                      @click.prevent="edit_timeValid = false"
                    >
                      儲存
                    </button>
                    <button
                      class="p-2 rounded text-[#5f6368] text-lg hover:bg-[rgba(95,99,104,0.04)]"
                      type="button"
                      @click.prevent="
                        ;(form['start_time'] = oldData['start_time']), (form['end_time'] = oldData['end_time']), (edit_timeValid = false)
                      "
                    >
                      取消
                    </button>
                  </div>
                </template>
                <template v-else>
                  <button
                    class="p-2 rounded text-[#0054ff] text-lg hover:bg-[rgba(66,133,244,0.04)]"
                    type="button"
                    @click.prevent=";(oldData['start_time'] = form['start_time']), (oldData['end_time'] = form['end_time']), (edit_timeValid = true)"
                  >
                    編輯
                  </button>
                </template>
              </div>
            </li>
          </ul>
        </div>
        <div class="flex justify-center">
          <button
            class="py-2.5 px-12 border border-solid border-[#52528c] rounded-full bg-[#52528c] hover:bg-[#424281] text-white font-bold text-2xl"
            type="button"
            @click.prevent="saveSetting"
          >
            儲存設定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SwitchElement from '@/components/Switch.vue'

export default {
  name: 'FormSettings',
  components: { SwitchElement },
  data: () => ({
    edit_message: false,
    edit_timeValid: false,
    form: {
      end_time: null,
      is_required_default: false,
      progress_bar: false, // 是否顯示進度條
      start_time: null,
      submit_message: '我們已經收到您回覆的表單',
      time_enable_status: false,
      question_number: false,
    },
    oldData: {
      end_time: null,
      start_time: null,
      submit_message: '',
    },
  }),
  created() {
    if (this.$route.query.formId) {
      const id = Number(this.$route.query.formId)
      this.getSettingInfo(id)
    }
  },
  computed: {
    dateShow() {
      if (this.form['start_time'] && this.form['end_time']) return `${this.form['start_time']} ~ ${this.form['end_time']}`
      else return '選擇日期區間'
    },
  },
  methods: {
    /**@取得設定資訊 */
    getSettingInfo(id) {
      this.axios.settingInfo({ id }).then((res) => {
        const { code, data } = res.data
        if (code === 200) {
          this.form = data
          if (!this.form['submit_message']) this.form['submit_message'] = '我們已經收到您回覆的表單'
        }
      })
    },
    /**@開關切換 */
    switchControl(env, key) {
      this.form[key] = env
    },
    /**@儲存設定 */
    saveSetting() {
      this.form['id'] = this.$route.query['formId']
      this.axios.saveSetting(this.form).then((res) => {
        if (res.data.code === 200) this.getSettingInfo()
      })
    },
  },
}
</script>
