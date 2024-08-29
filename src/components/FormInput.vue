<template>
  <input
    :class="['py-2.5 px-5 w-full border border-solid rounded-[5px]', isErrors ? 'border-danger' : 'border-[#cbcccd]']"
    :type="inputType"
    :inputmode="inputMode"
    :value="inputValue"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  name: 'FormInput-component',
  props: {
    inputType: {
      type: String,
      default: 'text',
    },
    inputMode: {
      type: String,
      default: 'text',
    },
    inputValue: [String, Number],
    isErrors: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
input:focus {
  border-color: #57588b;
}
</style>
