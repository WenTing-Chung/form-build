<template>
  <div class="fixed z-[999] flex justify-center items-center w-full h-screen bg-black/40">
    <div class="p-12 max-w-xl rounded-2xl bg-white">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal-component',
}
</script>
