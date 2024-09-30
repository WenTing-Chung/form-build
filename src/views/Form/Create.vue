<template>
  <section class="w-full">
    <div class="flex flex-row-reverse w-full h-full bg-[#eee]">
      <FormCreateBar :add="dragAdd" @drag_add_question="drag_add_question" />
      <div class="overflow-y-auto flex-1 py-7 scroll-style" @drop="handleDrop($event)" @dragover.prevent>
        <div class="mx-auto w-10/12">
          <div class="mb-7 p-7 rounded-2xl bg-white">
            <input class="w-full font-bold text-4xl placeholder:text-[#333]" type="text" placeholder="未命名標題" />
            <hr class="mt-4 mb-7 bg-[#888]" />
            <input class="w-full placeholder:text-[#555]" type="text" placeholder="表單說明" />
          </div>
          <template v-if="questionList.length">
            <draggable
              :list="questionList"
              :disabled="!enabled"
              handle=".handle"
              v-bind="dragOptions"
              @start="dragging = true"
              @end=";(dragging = false), dragEnd($event)"
            >
              <transition-group type="transition" :name="!dragging ? 'flip-list' : null">
                <div v-for="(item, i) in questionList" :key="item.id" class="flex mb-7 w-full">
                  <font-awesome-icon icon="fa-solid fa-grip-vertical" size="xl" class="mr-2 text-[#aaa] cursor-move handle" />
                  <div
                    :class="[
                      'flex items-center justify-center mr-2 w-10 h-10 rounded-[10px] text-white',
                      active === i ? 'bg-[#52528c]' : 'bg-[#888]',
                    ]"
                  >
                    <img :src="item.img" width="50%" :alt="item.img" />
                  </div>
                  <div class="flex-1 py-5 px-7 rounded-lg bg-white" @click.prevent="active = i">
                    <span v-if="item.data.required && active !== i" class="text-danger">*</span>
                    <input
                      :class="[
                        'mb-1 w-[min(80%,_600px)]',
                        {
                          'py-2.5 pl-3.5 border-b border-solid border-[#888] bg-[#eee]': active === i,
                          'font-bold': item.data.label['bold'],
                          italic: item.data.label['italic'],
                          underline: item.data.label['underline'],
                        },
                      ]"
                      v-model="item.data.label['value']"
                      :type="item.data['type']"
                      placeholder="未命名問題"
                    />
                    <!-- 標題文字設定 ↓ -->
                    <div v-if="active === i" class="flex mb-3">
                      <div
                        :class="[
                          'flex items-center justify-center mr-1.5 w-9 h-9 rounded-md',
                          item.data.label['bold'] ? 'bg-[#eee] text-[#555]' : 'text-[#888]',
                        ]"
                        role="button"
                        title="粗體"
                        @click.prevent="item.data.label['bold'] = !item.data.label['bold']"
                      >
                        <font-awesome-icon icon="fa-solid fa-bold" size="lg" />
                      </div>
                      <div
                        :class="[
                          'flex items-center justify-center mr-1.5 w-9 h-9 rounded-md',
                          item.data.label['italic'] ? 'bg-[#eee] text-[#555]' : 'text-[#888]',
                        ]"
                        role="button"
                        title="斜體"
                        @click.prevent="item.data.label['italic'] = !item.data.label['italic']"
                      >
                        <font-awesome-icon icon="fa-solid fa-italic" size="lg" />
                      </div>
                      <div
                        :class="[
                          'flex items-center justify-center mr-1.5 w-9 h-9 rounded-md',
                          item.data.label['underline'] ? 'bg-[#eee] text-[#555]' : 'text-[#888]',
                        ]"
                        role="button"
                        title="底線"
                        @click.prevent="item.data.label['underline'] = !item.data.label['underline']"
                      >
                        <font-awesome-icon icon="fa-solid fa-underline" size="lg" />
                      </div>
                      <div
                        class="flex items-center justify-center mr-1.5 w-9 h-9 text-[#888]"
                        role="button"
                        title="移除文字效果"
                        @click.prevent="
                          ;(item.data.label['bold'] = false), (item.data.label['italic'] = false), (item.data.label['underline'] = false)
                        "
                      >
                        <font-awesome-icon icon="fa-solid fa-text-slash" size="lg" />
                      </div>
                    </div>
                    <!-- 標題說明 ↓ -->
                    <input
                      :class="['w-[min(80%,_600px)] mb-5 text-sm', { 'py-1 pl-3.5 border-b border-solid border-[#888]': active === i }]"
                      v-model="item.data.question_desc"
                      type="text"
                      placeholder="說明"
                    />
                    <div>
                      <!-- 單行文字 ↓ -->
                      <template v-if="item.kind === 'input'">
                        <input
                          :class="['py-1 w-[min(80%,_300px)] border-b border-dashed border-black bg-white text-sm', { 'mb-3': active === i }]"
                          v-model="item.data['value']"
                          placeholder="簡答文字"
                          disabled
                        />
                        <div v-if="active === i" class="flex text-sm">
                          <select id="inputType" class="mr-5 p-2.5 w-1/5 hover:shadow-md" name="inputType" v-model="item.data.type">
                            <option v-for="kind in dropdown.inputType" :key="kind.value" :value="kind.value">{{ kind.text }}</option>
                          </select>
                          <span class="inline-block p-2.5">最大字元數</span>
                          <input class="p-2.5 w-1/6 border-b border-solid border-[#0000001f] focus:shadow-md" v-model="item.data.max" type="number" />
                        </div>
                      </template>
                      <!-- 多行文字 ↓ -->
                      <template v-else-if="item.kind === 'textarea'">
                        <textarea
                          class="w-[min(80%,_600px)] h-[100px] border border-solid border-[#888] bg-white rounded-md resize-none"
                          v-model="item.data['value']"
                          disabled
                        />
                        <div v-if="active === i" class="flex text-sm">
                          <span class="inline-block p-2.5">最大字元數</span>
                          <input class="p-2.5 w-1/6 border-b border-solid border-[#0000001f] focus:shadow-md" v-model="item.data.max" type="number" />
                        </div>
                      </template>
                      <!-- 單選題 ↓ -->
                      <template v-else-if="item.kind === 'radio'">
                        <ul class="text-sm">
                          <li v-for="(opt, index) in item.data['option']" :key="index" class="flex items-center justify-between mb-3">
                            <div class="mr-3.5 w-4 h-4 border border-solid border-[#888] rounded-full bg-white" />
                            <input class="flex-1 py-0.5 border-solid border-[#888] focus:border-b" v-model="opt.value" type="text" />
                            <font-awesome-icon
                              v-if="active === i"
                              icon="fa-solid fa-xmark"
                              size="2xl"
                              class="ml-3.5 text-[#888] cursor-pointer"
                              @click.prevent="item.data['option'].splice(i, 1)"
                            />
                          </li>
                          <li v-if="active === i" class="flex items-center">
                            <div class="mr-3.5 w-4 h-4 border border-solid border-[#888] rounded-full bg-white" />
                            <p>
                              <span
                                class="text-[#888]"
                                role="button"
                                @click.prevent="item.data['option'].push({ value: `選項${item.data['option'].length + 1}` })"
                              >
                                新增選項
                              </span>
                              或
                              <span
                                class="text-[#00a8ff] cursor-pointer"
                                role="button"
                                @click.prevent="item.data['option'].push({ value: '其他...' })"
                              >
                                新增「其他」
                              </span>
                            </p>
                          </li>
                        </ul>
                      </template>
                    </div>
                    <template v-if="active === i">
                      <hr class="mt-5 border-[#c7c7c7]" />
                      <div class="flex justify-end py-1">
                        <div class="flex">
                          <!-- <div
                            class="flex items-center justify-center mr-1.5 w-10 h-10 rounded-md text-[#888] hover:bg-[#eee] hover:text-[#555]"
                            role="button"
                            title="圖片"
                          >
                            <font-awesome-icon icon="fa-regular fa-image" size="xl" />
                          </div> -->
                          <div
                            class="flex items-center justify-center mr-1.5 w-10 h-10 rounded-md text-[#888] hover:bg-[#eee] hover:text-[#555]"
                            role="button"
                            title="暫存"
                            @click.prevent="temporary_storage(item, i)"
                          >
                            <font-awesome-icon icon="fa-solid fa-scissors" size="xl" />
                          </div>
                          <div
                            class="flex items-center justify-center mr-1.5 w-10 h-10 rounded-md text-[#888] hover:bg-[#eee] hover:text-[#555]"
                            role="button"
                            title="複製"
                            @click.prevent="copy_question(item, i)"
                          >
                            <font-awesome-icon icon="fa-regular fa-copy" size="xl" />
                          </div>
                          <div
                            class="flex items-center justify-center mr-8 w-10 h-10 rounded-md text-[#888] hover:bg-[#eee] hover:text-[#555]"
                            role="button"
                            title="刪除"
                            @click.prevent="delete_question(i)"
                          >
                            <font-awesome-icon icon="fa-regular fa-trash-can" size="xl" />
                          </div>
                          <div class="flex items-center py-3 px-4 border-l border-solid border-[#ccc]">
                            <p class="mr-2 text-[#333] text-sm">必填</p>
                            <div
                              :class="['w-10 h-3 rounded-md cursor-pointer', item.data['required'] ? 'bg-[#52528c]' : 'bg-[#888]']"
                              @click.prevent="item.data['required'] = !item.data['required']"
                            >
                              <div
                                :class="[
                                  'w-5 h-5 rounded-full -translate-y-[20%] transition-all ease-in-out duration-300',
                                  item.data['required']
                                    ? 'ml-[calc(100%_-_20px)] bg-[#acaccc] shadow-[0_0_6px_0_rgba(82,82,140,0.6)]'
                                    : 'bg-[#f9f9fb] shadow-[0_0_6px_0_rgba(85,85,85,0.5)]',
                                ]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </transition-group>
            </draggable>
            {{ questionList }}
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import draggable from 'vuedraggable'
import question from '@/utils/question'
import { inputType, inputType_to_text } from '@/utils/select'
import FormCreateBar from '@/components/FormCreateBar.vue'

export default {
  name: 'FormCreate',
  components: { draggable, FormCreateBar },
  data: () => ({
    questionList: [],
    temporaryList: [],
    enabled: true,
    dragging: false,
    dragAdd: false,
    active: null, // 當前點擊問題Index
    dropdown: {
      inputType,
    },
    fn: {
      inputType_to_text,
    },
  }),
  metaInfo: {
    title: '表單問題設計',
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      }
    },
  },
  mounted() {},
  methods: {
    /**@拖曳放下題目類型 */
    handleDrop(env) {
      if (this.dragAdd) {
        const dropBox = env.dataTransfer.getData('question')
        const questionData = JSON.parse(JSON.stringify(question.find((x) => x.value == dropBox)))
        this.questionList.push({ ...questionData, id: Date.now() })
        this.active = this.questionList.length - 1
        this.dragAdd = false
      } else return
    },
    /**@拖曳排序重取ID */
    dragEnd(env) {
      this.active = env.newDraggableIndex
    },
    drag_add_question(val) {
      this.dragAdd = val
    },
    /**@複製問題 */
    copy_question(item, i) {
      const copyItem = JSON.parse(JSON.stringify({ ...item, id: Date.now() }))
      this.questionList.splice(i + 1, 0, copyItem)
    },
    /**@剪下暫存問題 */
    temporary_storage(item, i) {
      let arr = []
      if (sessionStorage.getItem('temporary') !== null) arr = JSON.parse(sessionStorage.getItem('temporary'))
      arr.push(item)
      sessionStorage.setItem('temporary', JSON.stringify(arr))
      this.questionList.splice(i, 1)
    },
    /**@刪除問題 */
    delete_question(i) {
      this.questionList.splice(i, 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
</style>
