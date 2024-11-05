<template>
  <section class="overflow-y-auto w-full h-full bg-[#eee] scroll-style">
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
                <SwitchElement :status="switch_progressBar" @switch_status="progress_switch" />
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
                    v-model="message"
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
                        @click.prevent=";(message = old_message), (edit_message = false)"
                      >
                        取消
                      </button>
                    </div>
                  </template>
                  <template v-else>
                    <button
                      class="p-2 rounded text-[#0054ff] text-lg hover:bg-[rgba(66,133,244,0.04)]"
                      type="button"
                      @click.prevent=";(old_message = message), (edit_message = true)"
                    >
                      編輯
                    </button>
                  </template>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="py-10 px-[50px]">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h3 class="mb-4 text-lg">時間效期</h3>
              <p>設定表單有效時間，過了時段就關閉</p>
            </div>
            <SwitchElement :status="switch_timeValid" @switch_status="timeValid_switch" />
          </div>
          <ul class="pl-9 pr-5">
            <li class="mb-7">
              <p class="mb-3.5 text-[#888] text-xs">表單時間</p>
              <div>
                <v-date-picker
                  v-model="start.date"
                  mode="dateTime"
                  :timezone="start.timezone"
                  :model-config="{ type: 'string', mask: 'YYYY-MM-DD' }"
                  is24hr
                >
                  <template v-slot="{ inputValue, inputEvents }">
                    <input
                      class="-ml-1 mr-3 p-1 rounded-[10px] bg-white placeholder:text-[#888] text-lg"
                      :value="inputValue"
                      v-on="inputEvents"
                      placeholder="開始時間"
                    />
                  </template>
                </v-date-picker>
                <span>至</span>
                <v-date-picker
                  v-model="end.date"
                  mode="dateTime"
                  :timezone="end.timezone"
                  :model-config="{ type: 'string', mask: 'YYYY-MM-DD' }"
                  is24hr
                >
                  <template v-slot="{ inputValue, inputEvents }">
                    <input
                      class="ml-3 p-1 rounded-[10px] bg-white placeholder:text-[#888] text-lg"
                      :value="inputValue"
                      v-on="inputEvents"
                      placeholder="結束時間"
                    />
                  </template>
                </v-date-picker>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SwitchElement from '@/components/Switch.vue'

export default {
  name: 'FormSettings',
  components: { SwitchElement },
  data: () => ({
    message: '我們已經收到你回覆的表單',
    old_message: '', // 回復訊息暫存
    switch_progressBar: false,
    switch_timeValid: false,
    edit_message: false,
    start: {
      date: '',
      timezone: null,
    },
    end: {
      date: '',
      timezone: null,
    },
  }),
  metaInfo: {
    title: '表單設定',
  },
  methods: {
    /**@顯示進度列開關 */
    progress_switch(val) {
      this.switch_progressBar = val
    },
    /**@時間效期開關 */
    timeValid_switch(val) {
      this.switch_timeValid = val
    },
  },
}
</script>
