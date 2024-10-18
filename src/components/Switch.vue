<template>
  <div :class="['w-10 h-3 rounded-md cursor-pointer', status ? 'bg-[#52528c]' : 'bg-[#888]']" @click.prevent="changeSwitch">
    <div
      :class="[
        'w-5 h-5 rounded-full -translate-y-[20%] transition-all ease-in-out duration-300',
        status ? 'ml-[calc(100%_-_20px)] bg-[#acaccc] shadow-[0_0_6px_0_rgba(82,82,140,0.6)]' : 'bg-[#f9f9fb] shadow-[0_0_6px_0_rgba(85,85,85,0.5)]',
      ]"
    />
  </div>
</template>

<script>
export default {
  name: 'Switch-component',
  props: {
    status: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    changeSwitch() {
      this.$emit('switch_status', !this.status)
    },
  },
}
</script>
