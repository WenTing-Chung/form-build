<template>
  <div>
    <template v-if="listType === 'card'">
      <div :ref="`more-setting-${cardInfo.id}`" class="overflow-hidden rounded-2xl bg-white shadow-[4px_10px_10px_0_rgba(200,200,213,0.5)]">
        <div class="relative">
          <img
            src="https://donate-api.saleproduct.com/storage/upload/notice/nqTUTlwIYH3hVSshz47jLxRzx7EEVu6sKfDItyLI.jpg"
            class="w-full h-[200px]"
            alt="form-img"
          />
          <font-awesome-icon
            icon="fa-solid fa-star"
            size="xl"
            :class="['absolute left-3 bottom-3', cardInfo.is_star ? 'text-[#ecf371]' : 'text-[#eee]/70']"
            @click.prevent="child_collect"
          />
        </div>
        <div class="relative pl-3 pr-10 py-3.5">
          <div class="absolute top-3.5 right-1">
            <div
              :class="['relative flex justify-center items-center w-7 h-7 rounded-xl cursor-pointer', cardInfo.config ? 'bg-[#c8c8d5]' : 'bg-white']"
              @click.prevent="child_actionBar($event)"
            >
              <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
              <ul class="absolute">
                <li></li>
              </ul>
            </div>
          </div>
          <p class="break-words text-2xl">{{ cardInfo.text }}</p>
          <p class="text-[#888] text-sm">{{ '2024-05-20' }} 至 {{ '2024-07-31' }}<br />已過期</p>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="relative overflow-hidden pl-2 rounded-2xl mb-2.5 bg-white shadow-[0px_1px_4px_0px_rgba(78,78,85,0.5)]">
        <div class="absolute top-0 left-0 w-2 h-full bg-[#57588b]"></div>
        <div class="flex justify-between py-11 px-10">
          <div class="flex items-center">
            <div>
              <input id="is-delete" class="hidden" v-model="is_checked" type="checkbox" />
              <label for="is-delete" class="checkbox-control" @click.prevent="child_del" />
            </div>
            <font-awesome-icon
              icon="fa-solid fa-star"
              size="xl"
              :class="['mr-8 ml-16', cardInfo.is_star ? 'text-[#ecf371]' : 'text-[#dddee8]']"
              @click.prevent="child_collect"
            />
            <div>
              <p class="mb-1 text-2xl">{{ cardInfo.text }}</p>
              <p class="text-sm text-[#888]">
                <span class="mr-3.5 py-1 px-2.5 rounded-2xl bg-[#dddee8] text-[#555]">已過期</span>
                {{ '2024-05-20' }} 至 {{ '2024-07-31' }}
              </p>
            </div>
          </div>
          <div></div>
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
  },
  data: () => ({
    presentedOn: false,
  }),
  computed: {
    is_checked() {
      return this.delList.includes(this.cardInfo.id)
    },
  },
  methods: {
    /**@點擊3個點操作列_向上傳id */
    child_actionBar(e) {
      console.log(e)
      // const more = document.querySelector('.more-config').getBoundingClientRect().top
      // console.log('test: ', more)
      this.$emit('child_actionBar', this.cardInfo.id)
    },
    /**@星號 */
    child_collect() {
      this.$emit('child_collect', this.cardInfo.id)
    },
    /**@刪除勾選 */
    child_del() {
      this.$emit('child_del', this.cardInfo.id)
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
