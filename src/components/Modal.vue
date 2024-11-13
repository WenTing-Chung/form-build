<template>
  <div class="fixed top-0 left-0 z-[999] flex justify-center items-center px-5 w-full h-screen bg-black/40">
    <div class="relative p-12 max-w-xl rounded-2xl bg-white">
      <font-awesome-icon
        icon="fa-solid fa-xmark"
        size="2xl"
        class="absolute top-3 right-3 cursor-pointer"
        @click.prevent="$store.dispatch('isModal', false)"
      />
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal-component',
}
</script>
