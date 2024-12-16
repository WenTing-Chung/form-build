<template>
  <div>
    <p class="mb-1.5">
      <span v-if="info['is_required']" class="mr-1 text-[#ff3a3a]">*</span>
      <span
        :class="{
          'font-bold': info.other.config['bold'],
          italic: info.other.config['italic'],
          underline: info.other.config['underline'],
        }"
      >
        {{ info['title'] }}
      </span>
    </p>
    <p class="mb-4">{{ info['description'] }}</p>
  </div>
</template>

<script>
export default {
  name: 'QuestionTitle',
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
}
</script>
