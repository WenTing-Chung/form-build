<template>
  <div class="flex-1 min-h-screen bg-[#cee8f3]">
    <div class="mx-auto pt-10 xl:pt-24 px-5 pb-10 xl:pb-20 w-full md:w-4/5 xl:w-[60%]">
      <div class="overflow-hidden mb-6 h-56 rounded-[10px]">
        <img
          class="w-full"
          src="https://cdn.cybassets.com/s/files/18098/ckeditor/pictures/content_c07533a8-24bd-4af6-b8ed-ba3912ff2f1c.jpg"
          alt="top-of-page"
        />
      </div>
      <div
        class="overflow-hidden rounded-2xl bg-white shadow-[0_3px_6px_0_rgb(14,98,168)] before:block before:w-full before:h-2.5 before:bg-[#1c77c3] before:content-['']"
      >
        <div class="p-8 border-b border-solid border-[#707070]">
          <p class="mb-4 font-bold text-4xl">{{ form_data.form_title }}</p>
          <p class="text-base">{{ form_data.form_desc }}</p>
        </div>
        <ValidationObserver ref="renderForm">
          <ValidationProvider
            v-for="item in questionList"
            :key="item.id"
            :name="item.data.label['value']"
            :rules="{ required: item.data['required'] }"
          >
            <div class="p-7">
              <p class="text-lg">
                <span class="text-[#c81d25]">*</span>
                <span :class="{ 'font-bold': item.data.label['bold'], italic: item.data.label['italic'], underline: item.data.label['underline'] }">
                  {{ item.data.label['value'] }}
                </span>
              </p>
              <p class="mt-1.5">{{ item.data['question_desc'] }}</p>
            </div>
          </ValidationProvider>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { form_data } from '@/utils/test'

export default {
  name: 'FormRender',
  data: () => ({
    form_data,
    questionList: form_data.questionList,
  }),
  metaInfo: {
    title: '表單',
  },
}
</script>
