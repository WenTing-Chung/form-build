<template>
  <div>
    <template v-if="listType === 'card'">
      <div class="relative cursor-pointer" :title="cardInfo.description" @click="$router.push({ name: 'FormCreate', params: { id: cardInfo.id } })">
        <div class="overflow-hidden rounded-2xl bg-white shadow-[4px_10px_10px_0_rgba(200,200,213,0.5)]">
          <div class="relative">
            <template v-if="cardInfo.form_image">
              <img :src="cardInfo.form_image" class="w-full h-[200px]" alt="form-img" />
            </template>
            <template v-else>
              <div class="flex items-center justify-center w-full h-[200px]">
                <p>無設置圖片</p>
              </div>
            </template>
            <button class="absolute left-3 bottom-3" type="button" @click.stop="child_collect">
              <font-awesome-icon icon="fa-solid fa-star" size="xl" :class="cardInfo.starred ? 'text-[#ecf371]' : 'text-[#eee]/70'" />
            </button>
          </div>
          <div class="flex px-2.5 py-3">
            <div class="flex-1">
              <div class="flex justify-between">
                <p class="flex-1 mr-1 line-clamp-3 break-words text-2xl">{{ cardInfo.description }}</p>
                <button
                  :class="[
                    'flex justify-center items-center w-7 h-7 rounded-full cursor-pointer hover:bg-[#c8c8d5]',
                    { 'bg-[#c8c8d5]': cardInfo.id === activeFormOperate },
                  ]"
                  type="button"
                  @click.stop="child_actionBar($event)"
                >
                  <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
                </button>
              </div>
              <div class="text-[#888] text-sm">
                <span>{{ dateFormat_compare(cardInfo.start_time) }}</span>
                <span v-if="cardInfo.start_time && cardInfo.end_time">&ensp;至&ensp;</span>
                <span>{{ dateFormat_compare(cardInfo.end_time) }}</span>
                <template v-if="cardInfo.start_time && cardInfo.end_time">
                  <br />
                  已過期
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="relative cursor-pointer" :title="cardInfo.description" @click="$router.push({ name: 'FormCreate', params: { id: cardInfo.id } })">
        <div
          class="relative overflow-hidden pl-2 rounded-2xl mb-2.5 bg-white shadow-[0px_1px_4px_0px_rgba(78,78,85,0.5)] before:content-[''] before:absolute before:block before:top-0 before:left-0 before:w-2 before:h-full before:bg-[#57588b]"
        >
          <div class="flex justify-between py-11 px-10">
            <div class="flex items-center">
              <div>
                <input id="is-delete" class="hidden" v-model="is_checked" type="checkbox" />
                <label for="is-delete" class="checkbox-control" @click.prevent="child_del" />
              </div>
              <button class="mr-8 ml-16" type="button" @click.stop="child_collect">
                <font-awesome-icon icon="fa-solid fa-star" size="xl" :class="cardInfo.is_star ? 'text-[#ecf371]' : 'text-[#dddee8]'" />
              </button>
              <div>
                <p class="mb-1 text-2xl">{{ cardInfo.text }}</p>
                <p class="text-sm text-[#888]">
                  <span class="mr-3.5 py-1 px-2.5 rounded-2xl bg-[#dddee8] text-[#555]">已過期</span>
                  {{ '2024-05-20' }} 至 {{ '2024-07-31' }}
                </p>
              </div>
            </div>
            <div class="flex items-center text-[#57588b]">
              <div :class="['flex items-center justify-center w-10 h-10 rounded-full']">
                <font-awesome-icon icon="fa-solid fa-pen-to-square" size="2xl" />
              </div>
              <div :class="['flex items-center justify-center mx-16 w-10 h-10 rounded-full']">
                <font-awesome-icon icon="fa-solid fa-chart-line" size="2xl" />
              </div>
              <button
                :class="['flex items-center justify-center w-10 h-10 rounded-full', { 'bg-[#c8c8d5]/20': cardInfo.config }]"
                @click.stop="child_actionBar($event)"
              >
                <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" size="2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'FormCard-component',
  props: {
    listType: {
      type: String,
    },
    cardInfo: {
      type: Object,
      required: true,
    },
    delList: {
      type: Array,
      required: true,
      default: () => [],
    },
    activeFormOperate: {
      type: Number,
    },
  },
  computed: {
    is_checked() {
      return this.delList.includes(this.cardInfo.id)
    },
  },
  methods: {
    /**@點擊3個點操作列_向上傳id */
    child_actionBar(e) {
      this.$emit('child_actionBar', { id: this.cardInfo.id, x: e.clientX, y: e.clientY })
    },
    /**@星號 */
    child_collect() {
      this.$emit('child_collect', this.cardInfo.id)
    },
    /**@刪除勾選 */
    child_del() {
      this.$emit('child_del', this.cardInfo.id)
    },
    /**@日期Format並比對當前時間 */
    dateFormat_compare(val) {
      if (val) return val.split(' ')[0]
      else return null
    },
  },
}
</script>

<style lang="scss" scoped>
.checkbox-control {
  &::before,
  &::after {
    display: block;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    transform: translateY(-50%);
  }
  &::before {
    border: 1px solid #888;
    background-color: #fff;
  }
}
input[id='is-delete']:checked + .checkbox-control {
  &::before {
    background-color: #d8d7e3;
  }
  &::after {
    background-color: #57588b;

    clip-path: polygon(15% 60%, 33% 80%, 85% 10%, 90% 15%, 33% 90%, 10% 65%);
  }
}
</style>
