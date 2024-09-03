<template>
  <header class="relative py-6 px-8 w-full bg-white shadow-[0px_3px_6px_0_rgba(0,0,0,0.16)]">
    <div class="flex justify-between">
      <p class="text-[#52528c] font-bold text-2xl">表單設計</p>
      <div class="relative">
        <button class="text-[#333] text-2xl" type="button" @click.prevent="is_bar = !is_bar">
          {{ 'name' }}
          <font-awesome-icon icon="fa-solid fa-caret-down" :class="is_bar ? 'text-[#52528C]' : 'text-[#878787]'" />
        </button>
        <ul
          v-if="is_bar"
          class="absolute top-[calc(100%_+_8px)] left-1/2 p-2 min-w-[calc(100%_+_20px)] rounded-[10px] bg-white shadow-[0px_3px_6px_0_rgba(0,0,0,0.16)] -translate-x-1/2 text-lg"
        >
          <li>
            <router-link to="" class="py-2 px-3.5 border-b border-solid border-[#eee] text-nowrap hover:text-[#52528C] hover:font-bold">
              帳戶設定
            </router-link>
          </li>
          <li>
            <button class="py-2 px-3.5 w-full text-left hover:text-[#52528C] hover:font-bold" type="button">登出</button>
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
  }),
}
</script>
