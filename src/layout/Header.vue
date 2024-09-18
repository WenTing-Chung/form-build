<template>
  <header class="relative shadow-[0px_3px_6px_0_rgba(0,0,0,0.16)]">
    <div class="relative flex justify-between py-6 px-8 w-full bg-white">
      <router-link :to="{ name: 'GeneralList' }" class="text-[#52528c] font-bold text-2xl"> 表單設計 </router-link>
      <div class="relative">
        <button class="text-[#333] text-2xl" type="button" @click.prevent="is_bar = !is_bar">
          {{ 'name' }}
          <font-awesome-icon icon="fa-solid fa-caret-down" :class="is_bar ? 'text-[#52528C]' : 'text-[#878787]'" />
        </button>
        <ul
          v-if="is_bar"
          class="absolute top-[calc(100%_+_8px)] left-1/2 p-2 min-w-[calc(100%_+_20px)] rounded-[10px] bg-white shadow-[0px_3px_6px_0_rgba(0,0,0,0.16)] -translate-x-1/2 text-lg"
        >
          <li @click.prevent="is_bar = false">
            <router-link
              :to="{ name: 'AccountSetting' }"
              class="py-2 px-3.5 border-b border-solid border-[#eee] text-nowrap hover:text-[#52528C] hover:font-bold"
            >
              帳戶設定
            </router-link>
          </li>
          <li>
            <button class="py-2 px-3.5 w-full text-left hover:text-[#52528C] hover:font-bold" type="button">登出</button>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="pathName.includes('form')" class="pt-2.5 border-t border-solid border-[#cbcccd]">
      <div class="flex justify-between mx-auto w-10/12">
        <ul class="flex">
          <li v-for="item in formItemList" :key="item.link" :class="['relative form-item', { active: $route.name === item.link }]">
            <router-link :to="{ name: item.link }" class="py-2.5 px-3">{{ item.text }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  data: () => ({
    is_bar: false,
    formItemList: [
      { text: '問題設計', link: 'FormCreate' },
      { text: '設定', link: 'FormSettings' },
      { text: '發布', link: 'FormRelease' },
    ],
  }),
  computed: {
    pathName() {
      const name = this.$route.fullPath.slice(1)
      return name.split('/')
    },
  },
}
</script>

<style lang="scss" scoped>
.form-item {
  &.active::before {
    background-color: #52528c;
  }
  &::before {
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 4px;
    border-radius: 2px 2px 0 0;
    content: '';
  }
  &:hover::before {
    background-color: rgba(#52528c, 0.5);
  }
  &:not(:last-child) {
    margin-right: 14px;
  }
}
</style>
