<template>
  <div class="fixed top-0 left-0 z-[999] flex justify-center items-center px-5 w-full h-screen bg-[#52528C]/40">
    <div class="relative p-12 w-[min(100%,_600px)] rounded-2xl bg-white shadow-[0_1px_18px_0_rgba(87,88,139,0.2)]">
      <font-awesome-icon
        v-if="closeBtn"
        icon="fa-solid fa-xmark"
        size="2xl"
        class="absolute top-3 right-3 cursor-pointer"
        @click.prevent="closeModal"
      />
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal-component',
  props: {
    closeBtn: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    closeModal() {
      this.$store.dispatch('isModal', false)
      this.$emit('closeModal')
    },
  },
}
</script>
