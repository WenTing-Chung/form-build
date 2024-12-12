<template>
  <div class="flex flex-row-reverse w-full h-full bg-[#eee]">
    <FormCreateBar :add="dragAdd" @drag_add_question="drag_add_question" />
    <div class="overflow-y-auto flex-1 py-7 scroll-style" @drop="handleDrop($event)" @dragover.prevent>
      <div class="mb-9 mx-auto w-10/12">
        <div class="mb-7 p-7 rounded-2xl bg-white">
          <input
            v-model="form.name"
            class="w-full font-bold text-4xl placeholder:text-[#333] focus:placeholder:text-[#ccc]"
            type="text"
            placeholder="未命名標題"
          />
          <hr class="mt-4 mb-7 bg-[#888]" />
          <input v-model="form.description" class="w-full placeholder:text-[#555] focus:placeholder:text-[#ccc]" type="text" placeholder="表單說明" />
        </div>
        <div class="mb-7 p-7 rounded-2xl bg-white">
          <p class="mb-5 font-bold text-2xl">上傳縮圖</p>
          <template v-if="Object.keys(filePresentation).length">
            <img class="mb-5 h-[200px]" :src="filePresentation.url" :alt="filePresentation.name" />
          </template>
          <template v-else>
            <img class="mb-5 h-[200px]" :src="form.form_image" />
          </template>
          <label for="coverImage" class="py-2 px-7 border border-solid border-[#888] rounded-md cursor-pointer">
            <input id="coverImage" class="hidden" type="file" accept="image/*" @change.prevent="changeCoverImg($event)" />
            選擇檔案
          </label>
        </div>
        <template v-if="form['questions'].length">
          <draggable
            :list="form['questions']"
            :disabled="!enabled"
            :handle="'.handle'"
            v-bind="dragOptions"
            @start="dragging = true"
            @end=";(dragging = false), dragEnd($event)"
          >
            <transition-group type="transition" :name="!dragging ? 'flip-list' : null">
              <div v-for="(item, i) in form['questions']" :key="i" class="flex mb-7 w-full">
                <font-awesome-icon icon="fa-solid fa-grip-vertical" size="xl" class="mr-2 text-[#aaa] cursor-move handle" />
                <div
                  :class="['flex items-center justify-center mr-2 w-10 h-10 rounded-[10px] text-white', active === i ? 'bg-[#52528c]' : 'bg-[#888]']"
                >
                  <img :src="require(`@/assets/image/${item.other['icon']}`)" width="50%" alt="表單縮圖" />
                </div>
                <div class="flex-1 py-5 px-7 rounded-lg bg-white" @click.prevent="active = i">
                  <span v-if="item['is_required'] && active !== i" class="mr-2 text-danger">*</span>
                  <input
                    :class="[
                      'mb-1 w-[min(80%,_600px)]',
                      {
                        'py-2.5 pl-3.5 border-b border-solid border-[#888] bg-[#eee]': active === i,
                        'font-bold': item.other.config['bold'],
                        italic: item.other.config['italic'],
                        underline: item.other.config['underline'],
                      },
                    ]"
                    v-model="item['title']"
                    type="text"
                    placeholder="未命名問題"
                  />
                  <!-- 標題文字設定 ↓ -->
                  <div v-if="active === i" class="flex mb-3">
                    <div
                      :class="[
                        'flex items-center justify-center mr-1.5 w-9 h-9 rounded-md',
                        item.other.config['bold'] ? 'bg-[#eee] text-[#555]' : 'text-[#888]',
                      ]"
                      role="button"
                      title="粗體"
                      @click.prevent="item.other.config['bold'] = !item.other.config['bold']"
                    >
                      <font-awesome-icon icon="fa-solid fa-bold" size="lg" />
                    </div>
                    <div
                      :class="[
                        'flex items-center justify-center mr-1.5 w-9 h-9 rounded-md',
                        item.other.config['italic'] ? 'bg-[#eee] text-[#555]' : 'text-[#888]',
                      ]"
                      role="button"
                      title="斜體"
                      @click.prevent="item.other.config['italic'] = !item.other.config['italic']"
                    >
                      <font-awesome-icon icon="fa-solid fa-italic" size="lg" />
                    </div>
                    <div
                      :class="[
                        'flex items-center justify-center mr-1.5 w-9 h-9 rounded-md',
                        item.other.config['underline'] ? 'bg-[#eee] text-[#555]' : 'text-[#888]',
                      ]"
                      role="button"
                      title="底線"
                      @click.prevent="item.other.config['underline'] = !item.other.config['underline']"
                    >
                      <font-awesome-icon icon="fa-solid fa-underline" size="lg" />
                    </div>
                    <div
                      class="flex items-center justify-center mr-1.5 w-9 h-9 text-[#888]"
                      role="button"
                      title="移除文字效果"
                      @click.prevent="
                        ;(item.other.config['bold'] = false), (item.other.config['italic'] = false), (item.other.config['underline'] = false)
                      "
                    >
                      <font-awesome-icon icon="fa-solid fa-text-slash" size="lg" />
                    </div>
                  </div>
                  <!-- 標題說明 ↓ -->
                  <input
                    :class="['w-[min(80%,_600px)] mb-5 text-sm', { 'py-1 pl-3.5 border-b border-solid border-[#888]': active === i }]"
                    v-model="item['description']"
                    type="text"
                    placeholder="說明"
                  />
                  <div>
                    <!-- 單行文字 ↓ -->
                    <template v-if="item.type === 'text'">
                      <input
                        :class="['py-1 w-[min(80%,_300px)] border-b border-dashed border-black bg-white text-sm', { 'mb-3': active === i }]"
                        placeholder="簡答文字"
                        disabled
                      />
                      <div v-if="active === i" class="flex text-sm">
                        <select id="inputType" class="mr-5 p-2.5 w-1/5 hover:shadow-md" name="inputType" v-model="item.other.config['type']">
                          <option v-for="kind in dropdown.inputType" :key="kind.value" :value="kind.value">{{ kind.text }}</option>
                        </select>
                        <span class="inline-block p-2.5">最大字元數</span>
                        <input
                          class="p-2.5 w-1/6 border-b border-solid border-[#0000001f] focus:shadow-md"
                          v-model.number="item.other.config['max']"
                          type="number"
                        />
                      </div>
                    </template>
                    <!-- 多行文字 ↓ -->
                    <template v-else-if="item.type === 'textarea'">
                      <textarea class="w-[min(80%,_600px)] h-[100px] border border-solid border-[#888] bg-white rounded-md resize-none" disabled />
                      <div v-if="active === i" class="flex text-sm">
                        <span class="inline-block p-2.5">最大字元數</span>
                        <input
                          class="p-2.5 w-1/6 border-b border-solid border-[#0000001f] focus:shadow-md"
                          v-model.number="item.other.config['max']"
                          type="number"
                        />
                      </div>
                    </template>
                    <!-- 單選題 ↓ -->
                    <template v-else-if="item.type === 'radio'">
                      <ul class="text-sm">
                        <li v-for="(opt, index) in item['option']" :key="index" class="flex items-center justify-between mb-3">
                          <div class="mr-3.5 w-4 h-4 border border-solid border-[#888] rounded-full bg-white" />
                          <input class="flex-1 py-0.5 border-b border-solid border-transparent focus:border-[#888]" v-model="opt.value" type="text" />
                          <font-awesome-icon
                            v-if="active === i"
                            icon="fa-solid fa-xmark"
                            size="2xl"
                            class="ml-3.5 text-[#888] cursor-pointer"
                            @click.prevent="item['option'].splice(index, 1)"
                          />
                        </li>
                        <li v-if="active === i" class="flex items-center">
                          <div class="mr-3.5 w-4 h-4 border border-solid border-[#888] rounded-full bg-white" />
                          <p>
                            <span
                              class="text-[#888]"
                              role="button"
                              @click.prevent="
                                item['option'].push({ value: `選項${item['option'].length + 1}`, text: `選項${item['option'].length + 1}` })
                              "
                            >
                              新增選項
                            </span>
                            或
                            <span class="text-[#00a8ff]" role="button" @click.prevent="item['option'].push({ value: '其他', text: '其他' })">
                              新增「其他」
                            </span>
                          </p>
                        </li>
                      </ul>
                    </template>
                    <!-- 複選題 ↓ -->
                    <template v-else-if="item.type === 'checkbox'">
                      <ul class="text-sm">
                        <li v-for="(opt, index) in item['option']" :key="index" class="flex items-center justify-between mb-3">
                          <div class="mr-3.5 w-4 h-4 border border-solid border-[#888] bg-white" />
                          <input class="flex-1 py-0.5 border-b border-solid border-transparent focus:border-[#888]" v-model="opt.value" type="text" />
                          <font-awesome-icon
                            v-if="active === i"
                            icon="fa-solid fa-xmark"
                            size="2xl"
                            class="ml-3.5 text-[#888] cursor-pointer"
                            @click.prevent="item['option'].splice(index, 1)"
                          />
                        </li>
                        <li v-if="active === i" class="flex items-center">
                          <div class="mr-3.5 w-4 h-4 border border-solid border-[#888] bg-white" />
                          <p>
                            <span
                              class="text-[#888]"
                              role="button"
                              @click.prevent="
                                item['option'].push({ value: `選項${item['option'].length + 1}`, text: `選項${item['option'].length + 1}` })
                              "
                            >
                              新增選項
                            </span>
                            或
                            <span class="text-[#00a8ff]" role="button" @click.prevent="item['option'].push({ value: '其他', text: '其他' })">
                              新增「其他」
                            </span>
                          </p>
                        </li>
                      </ul>
                    </template>
                    <!-- 下拉式 ↓ -->
                    <template v-else-if="item.type === 'select'">
                      <div>
                        <ul class="text-sm">
                          <li v-for="(opt, index) in item['option']" :key="index" class="flex items-center justify-between mb-3">
                            <span class="mr-3">{{ index + 1 }}.</span>
                            <input
                              class="flex-1 py-0.5 border-b border-solid border-transparent focus:border-[#888]"
                              v-model="opt.value"
                              type="text"
                            />
                            <font-awesome-icon
                              v-if="active === i"
                              icon="fa-solid fa-xmark"
                              size="2xl"
                              class="ml-3.5 text-[#888] cursor-pointer"
                              @click.prevent="item['option'].splice(index, 1)"
                            />
                          </li>
                        </ul>
                        <p v-if="active === i" class="flex items-center text-sm">
                          <span
                            class="text-[#888]"
                            role="button"
                            @click.prevent="
                              item['option'].push({ value: `選項${item['option'].length + 1}`, text: `選項${item['option'].length + 1}` })
                            "
                          >
                            新增選項
                          </span>
                        </p>
                      </div>
                    </template>
                    <!-- 雲端上傳 ↓ -->
                    <template v-else-if="item.type === 'file'">
                      <template v-if="active === i">
                        <div class="flex mb-6 text-sm">
                          <span class="w-1/5">檔案類型</span>
                          <div class="flex-1 w-4/5 2xl:w-1/2">
                            <div class="grid grid-flow-row grid-cols-3 lg:grid-cols-5 gap-3">
                              <div
                                v-for="(kind, j) in dropdown.mediaList"
                                :key="`${kind.value}-${j}`"
                                class="flex items-center cursor-pointer"
                                @click.prevent="mediaQuestion(item.other.file['type'], kind.value)"
                              >
                                <div
                                  :class="[
                                    'mr-3 w-5 h-5 border border-solid transition-all ease-in-out duration-500',
                                    item.other.file['type'].includes(kind.value) ? 'mediaChecked' : 'border-[#888]',
                                  ]"
                                />
                                <p>{{ kind.text }}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="flex text-sm">
                          <span class="w-1/5">檔案大小限制</span>
                          <div>
                            <input
                              id="file-size"
                              class="mr-2.5 py-1.5 px-2.5 w-20 border-b border-solid border-[#888] bg-[#eee] text-center"
                              v-model.number="item.other.file['size']"
                              type="number"
                              :min="1"
                              :max="5"
                            />
                            <label for="file-size">MB <span class="text-[#aaa]">*檔案大小上限為 5 MB</span></label>
                          </div>
                        </div>
                      </template>
                      <template v-else>
                        <div class="text-sm">
                          <input id="upload" class="hidden" type="file" disabled />
                          <label for="upload" class="mr-5 py-2 px-7 border border-solid border-[#888] rounded-md text-[#888]" type="button">
                            新增檔案
                          </label>
                          <span class="text-[#888]">大小限制 {{ item.other.file['size'] }} MB</span>
                        </div>
                      </template>
                    </template>
                    <!-- 線性刻度 ↓ -->
                    <template v-else-if="item.type === 'range'">
                      <template v-if="active === i">
                        <div class="flex items-center mb-4 text-sm">
                          <span class="mr-5 p-2.5 w-20 text-center hover:shadow-md">{{ item.other.config['min'] }}</span>
                          到
                          <select
                            id="range_max"
                            class="ml-5 p-2.5 w-20 text-center hover:shadow-md"
                            name="range_max"
                            v-model="item.other.config['max']"
                          >
                            <option v-for="num in [2, 3, 4, 5, 6, 7, 8, 9, 10]" :key="num" :value="num">{{ num }}</option>
                          </select>
                        </div>
                        <ul>
                          <li class="flex items-center mb-7">
                            <span class="mr-2.5 w-5">{{ item.other.config['min'] }}</span>
                            <div class="flex justify-between py-1.5 px-8 w-[min(80%,_300px)] border-b border-solid border-[#c7c7c7]">
                              <input v-model="item.other.config['min_text']" type="text" placeholder="最小值顯示文字" />
                              <font-awesome-icon
                                icon="fa-solid fa-xmark"
                                size="2xl"
                                class="text-[#888] cursor-pointer"
                                @click.prevent="item.other.config['min_text'] = ''"
                              />
                            </div>
                          </li>
                          <li class="flex items-center">
                            <span class="mr-2.5 w-5">{{ item.other.config['max'] }}</span>
                            <div class="flex justify-between py-1.5 px-8 w-[min(80%,_300px)] border-b border-solid border-[#c7c7c7]">
                              <input v-model="item.other.config['max_text']" type="text" placeholder="最大值顯示文字" />
                              <font-awesome-icon
                                icon="fa-solid fa-xmark"
                                size="2xl"
                                class="text-[#888] cursor-pointer"
                                @click.prevent="item.other.config['max_text'] = ''"
                              />
                            </div>
                          </li>
                        </ul>
                      </template>
                      <template v-else>
                        <div class="flex items-center justify-between">
                          <span>{{ item.other.config['min_text'] }}</span>
                          <div class="flex-1 flex justify-around mx-10 w-full">
                            <div v-for="num in item.other.config['max'] - item.other.config['min'] + 1" :key="num">
                              <p class="mb-4 text-center">{{ num }}</p>
                              <div class="w-5 h-5 border border-solid border-[#888] rounded-full" />
                            </div>
                          </div>
                          <span>{{ item.other.config['max_text'] }}</span>
                        </div>
                      </template>
                    </template>
                    <!-- 單選方塊 ↓ -->
                    <template v-else-if="item.type === 'single'">
                      <template v-if="active === i">
                        <div class="grid grid-cols-2 gap-x-5 w-[min(100%,_600px)]">
                          <div>
                            <span>列</span>
                            <ul>
                              <li v-for="(list_option, j) in item.option['list']" :key="j" class="flex items-center mb-5">
                                <span class="inline-block mr-2.5 w-5">{{ j + 1 }}.</span>
                                <div class="flex-1 flex justify-between py-1.5 px-4 border-b border-solid border-[#c7c7c7]">
                                  <input class="flex-1 mr-2.5" v-model="list_option.value" type="text" />
                                  <font-awesome-icon
                                    v-if="item.option['list'].length > 1"
                                    icon="fa-solid fa-xmark"
                                    size="xl"
                                    class="text-[#888] cursor-pointer"
                                    @click.prevent="item.option['list'].splice(j, 1)"
                                  />
                                </div>
                              </li>
                              <li class="flex items-center">
                                <span class="inline-block mr-2.5 w-5">{{ item.option['list'].length + 1 }}.</span>
                                <div
                                  class="py-1 px-7 border-b border-solid border-[#c7c7c7] text-[#888]"
                                  @click.prevent="item.option['list'].push({ value: `第${item.option['list'].length + 1}列` })"
                                >
                                  新增列
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <span>欄</span>
                            <ul>
                              <li v-for="(column_option, j) in item.option['column']" :key="j" class="flex items-center mb-5">
                                <div class="mr-2.5 w-5 h-5 border border-solid border-[#888] rounded-full" />
                                <div class="flex-1 flex justify-between py-1.5 px-4 border-b border-solid border-[#c7c7c7]">
                                  <input class="flex-1 mr-2.5" v-model="column_option.value" type="text" />
                                  <font-awesome-icon
                                    v-if="item.option['column'].length > 1"
                                    icon="fa-solid fa-xmark"
                                    size="xl"
                                    class="text-[#888] cursor-pointer"
                                    @click.prevent="item.option['column'].splice(j, 1)"
                                  />
                                </div>
                              </li>
                              <li v-if="item.option['column'].length < 10" class="flex items-center">
                                <div class="mr-2.5 w-5 h-5 border border-solid border-[#888] rounded-full" />
                                <div
                                  class="py-1 px-7 border-b border-solid border-[#c7c7c7] text-[#888]"
                                  @click.prevent="item.option['column'].push({ value: `第${item.option['column'].length + 1}欄` })"
                                >
                                  新增欄
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </template>
                      <template v-else>
                        <div class="table w-full">
                          <div class="table-row">
                            <div class="table-cell p-1 min-w-[20%] h-12" />
                            <div
                              v-for="(column_item, j) in item.option['column']"
                              :key="j"
                              class="table-cell p-1 h-12 text-center leading-[48px] whitespace-nowrap"
                            >
                              {{ column_item.value }}
                            </div>
                          </div>
                          <div v-for="(list_item, i) in item.option['list']" :key="i" class="table-row">
                            <div class="table-cell p-1 min-w-[20%] h-12 leading-[48px] whitespace-nowrap">{{ list_item.value }}</div>
                            <div
                              v-for="(column_item, j) in item.option['column'].length"
                              :key="j"
                              class="table-cell p-1 h-12 align-middle"
                              :data-column="column_item.value"
                            >
                              <div class="w-5 h-5 mx-auto border border-solid border-[#888] rounded-full bg-[#f9f9fb]" />
                            </div>
                          </div>
                        </div>
                      </template>
                    </template>
                    <!-- 複選方塊 ↓ -->
                    <template v-else-if="item.type === 'multiple'">
                      <template v-if="active === i">
                        <div class="grid grid-cols-2 gap-x-5 w-[min(100%,_600px)]">
                          <div>
                            <span>列</span>
                            <ul>
                              <li v-for="(list_option, j) in item.option['list']" :key="j" class="flex items-center mb-5">
                                <span class="mr-2.5 w-5">{{ j + 1 }}.</span>
                                <div class="flex-1 flex justify-between py-1.5 px-4 border-b border-solid border-[#c7c7c7]">
                                  <input class="flex-1 mr-2.5" v-model="list_option.value" type="text" />
                                  <font-awesome-icon
                                    v-if="item.option['list'].length > 1"
                                    icon="fa-solid fa-xmark"
                                    size="xl"
                                    class="text-[#888] cursor-pointer"
                                    @click.prevent="item.option['list'].splice(j, 1)"
                                  />
                                </div>
                              </li>
                              <li class="flex items-center">
                                <span class="mr-2.5 w-5">{{ item.option['list'].length + 1 }}.</span>
                                <div
                                  class="py-1 px-7 border-b border-solid border-[#c7c7c7] text-[#888]"
                                  @click.prevent="item.option['list'].push({ value: `第${item.option['list'].length + 1}列` })"
                                >
                                  新增列
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <span>欄</span>
                            <ul>
                              <li v-for="(column_option, j) in item.option['column']" :key="j" class="flex items-center mb-5">
                                <div class="mr-2.5 w-5 h-5 border border-solid border-[#888] rounded-sm" />
                                <div class="flex-1 flex justify-between py-1.5 px-4 border-b border-solid border-[#c7c7c7]">
                                  <input class="flex-1 mr-2.5" v-model="column_option.value" type="text" />
                                  <font-awesome-icon
                                    v-if="item.option['column'].length > 1"
                                    icon="fa-solid fa-xmark"
                                    size="xl"
                                    class="text-[#888] cursor-pointer"
                                    @click.prevent="item.option['column'].splice(j, 1)"
                                  />
                                </div>
                              </li>
                              <li v-if="item.option['column'].length < 10" class="flex items-center">
                                <div class="mr-2.5 w-5 h-5 border border-solid border-[#888] rounded-sm" />
                                <div
                                  class="py-1 px-7 border-b border-solid border-[#c7c7c7] text-[#888]"
                                  @click.prevent="item.option['column'].push({ value: `第${item.option['column'].length + 1}欄` })"
                                >
                                  新增欄
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </template>
                      <template v-else>
                        <div class="table w-full">
                          <div class="table-row">
                            <div class="table-cell p-1 min-w-[20%] h-12" />
                            <div
                              v-for="(column_item, j) in item.option['column']"
                              :key="j"
                              class="table-cell p-1 h-12 text-center leading-[48px] whitespace-nowrap"
                            >
                              {{ column_item.value }}
                            </div>
                          </div>
                          <div v-for="(list_item, i) in item.option['list']" :key="i" class="table-row">
                            <div class="table-cell p-1 min-w-[20%] h-12 leading-[48px] whitespace-nowrap">{{ list_item.value }}</div>
                            <div
                              v-for="(column_item, j) in item.option['column'].length"
                              :key="j"
                              class="table-cell p-1 h-12 align-middle"
                              :data-column="column_item.value"
                            >
                              <div class="w-5 h-5 mx-auto border border-solid border-[#888] rounded-sm bg-[#f9f9fb]" />
                            </div>
                          </div>
                        </div>
                      </template>
                    </template>
                    <template v-else-if="item.type === 'date'">
                      <div class="inline-block">
                        <div :class="['flex items-center py-0.5 border-b border-solid', { 'border-[#888]': active === i }]">
                          <input class="mr-2.5 bg-white placeholder:text-[#888] text-sm" placeholder="年 / 月 / 日" disabled />
                          <font-awesome-icon icon="fa-regular fa-calendar" size="lg" class="text-[#888]" />
                        </div>
                      </div>
                    </template>
                    <template v-else-if="item.type === 'time'">
                      <div class="inline-block">
                        <div :class="['flex items-center py-0.5 border-b border-solid', { 'border-[#888]': active === i }]">
                          <input class="mr-2.5 bg-white placeholder:text-[#888] text-sm" placeholder="時間" disabled />
                          <font-awesome-icon icon="fa-regular fa-clock" size="lg" class="text-[#888]" />
                        </div>
                      </div>
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
                          title="剪下複製"
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
                          <SwitchElement :status="item['is_required']" @switch_status="switch_status($event, item)" />
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </transition-group>
          </draggable>
        </template>
      </div>
      <div class="flex justify-center mx-auto w-10/12">
        <button
          v-if="$route.query.formId"
          class="py-2.5 px-12 border border-solid border-[#52528c] rounded-full bg-[#52528c] hover:bg-[#424281] text-white font-bold text-2xl"
          type="button"
          @click.prevent="modifyForm()"
        >
          儲存
        </button>
        <button
          v-else-if="form['questions'].length"
          class="py-2.5 px-12 border border-solid border-[#52528c] rounded-full bg-[#52528c] hover:bg-[#424281] text-white font-bold text-2xl"
          type="button"
          @click.prevent="createForm()"
        >
          新增
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import draggable from 'vuedraggable'
import question from '@/utils/question'
import { inputType, inputType_to_text, mediaList } from '@/utils/select'
import FormCreateBar from '@/components/FormCreateBar.vue'
import SwitchElement from '@/components/Switch.vue'

export default {
  name: 'FormCreate',
  components: { draggable, FormCreateBar, SwitchElement },
  data: () => ({
    form: {
      name: '',
      description: '',
      questions: [],
    },
    enabled: true,
    dragging: false,
    dragAdd: false,
    active: null, // 當前點擊問題Index
    filePresentation: {},
    dropdown: {
      inputType,
      mediaList,
    },
    fn: {
      inputType_to_text,
    },
  }),
  metaInfo: {
    title: '表單問題設計',
  },
  created() {
    if (this.$route.query.formId) {
      const id = Number(this.$route.query.formId)
      this.getFormInfo(id)
    } else if (this.$route.query.folderId) this.form.folder_id = Number(this.$route.query.folderId)
  },
  computed: {
    ...mapState({ temporaryData: (state) => state.temporaryData }),
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      }
    },
  },
  methods: {
    /**@取得表單資訊 */
    getFormInfo(id) {
      this.axios.formInfo({ id }).then((res) => {
        const { code, data } = res.data
        if (code === 200) {
          this.form = data
          this.form['id'] = id
          delete this.form.created_at
          delete this.form.updated_at
        }
      })
    },
    /**@拖曳放下題目類型_OK */
    handleDrop(env) {
      if (!this.dragging) {
        if (this.dragAdd) {
          const dropBox = env.dataTransfer.getData('question')
          const questionData = JSON.parse(JSON.stringify(question.find((x) => x.other['value'] === Number(dropBox))))
          questionData.other['id'] = Date.now()
          this.form['questions'].push(questionData)
        } else {
          /**@添加選中暫存選項 */
          const staging = JSON.parse(env.dataTransfer.getData('question'))
          this.form['questions'].push(staging)
          /**@更新資料回存 */
          const newData = JSON.parse(sessionStorage.getItem('temporary'))
          const stgeItem_index = newData.findIndex((x) => x.other['id'] === staging.other['id'])
          newData.splice(stgeItem_index, 1)
          sessionStorage.setItem('temporary', JSON.stringify(newData))
          this.$store.dispatch('set_temporaryData', newData)
        }
        this.active = this.form['questions'].length - 1
      }
    },
    /**@拖曳排序重取ID_OK */
    dragEnd(env) {
      this.active = env.newDraggableIndex
    },
    drag_add_question(val) {
      this.dragAdd = val
    },
    /**@複製問題_OK */
    copy_question(item, i) {
      const copyItem = JSON.parse(JSON.stringify(item))
      copyItem.other['id'] = Date.now()
      if (copyItem.form_question_id) delete copyItem.form_question_id
      this.form['questions'].splice(i + 1, 0, copyItem)
      this.active = i + 1
    },
    /**@剪下暫存問題_OK */
    temporary_storage(item, i) {
      let arr = []
      if (sessionStorage.getItem('temporary') !== null) arr = JSON.parse(sessionStorage.getItem('temporary'))
      arr.push(item)
      sessionStorage.setItem('temporary', JSON.stringify(arr))
      this.$store.dispatch('set_temporaryData', arr)
      this.form['questions'].splice(i, 1)
    },
    /**@刪除問題_OK */
    delete_question(i) {
      this.form['questions'].splice(i, 1)
    },
    /**@切換開關_OK */
    switch_status(val, info) {
      info['is_required'] = val
    },
    /**@新增表單_OK */
    createForm() {
      this.formFormat(this.form)
      this.axios.createdForm(this.form).then((res) => {
        if (res.data.code === 200) {
          sessionStorage.removeItem('temporary')
          this.$store.dispatch('set_temporaryData', [])
          this.$router.push({ name: 'GeneralList' })
        }
      })
    },
    /**@修改表單_OK */
    modifyForm() {
      this.formFormat(this.form)
      this.axios.modifyForm(this.form).then((res) => {
        if (res.data.code === 200) this.getFormInfo(this.form.id)
      })
    },
    /**@調整格式 */
    formFormat(form) {
      form['questions'].forEach((q) => {
        if (q['type'] === 'single' || q['type'] === 'multiple') {
          let obj = {}
          q.option['list'].forEach((l) => {
            obj[l.value] = []
            q.option['column'].forEach((c) => {
              obj[l.value].push(c.value)
            })
          })
          q.option['Ar'] = obj
        }
      })
    },
    /**@雲端上傳問題限制類型 */
    mediaQuestion(mediaArr, kind) {
      if (mediaArr.includes(kind)) {
        const i = mediaArr.findIndex((x) => x === kind)
        mediaArr.splice(i, 1)
      } else mediaArr.push(kind)
    },
    /**@修改縮圖 */
    changeCoverImg(env) {
      const formData = new FormData()
      const file = env.target.files[0]
      if (file) {
        formData.append('file[]', file)
        formData.append('belong', 'form')
        this.axios.upload(formData).then((res) => {
          const { code, data } = res.data
          if (code === 200) {
            this.filePresentation = data
            this.form['form_image'] = data.url
          }
        })
      }
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

.mediaChecked {
  position: relative;
  border-color: #52528c;
  background-color: #52528c;
  &::after {
    position: absolute;
    top: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: #fff;
    content: '';

    clip-path: polygon(15% 60%, 33% 80%, 85% 10%, 90% 15%, 33% 90%, 10% 65%);
  }
}
</style>
