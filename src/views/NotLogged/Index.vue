<template>
  <section class="flex items-center min-h-screen gradient-mix-image">
    <Modal v-if="modal">
      <p class="mb-5 text-[#54588c] font-bold text-3xl">{{ is_finish ? '發送成功' : '忘記密碼' }}</p>
      <p :class="['text-lg', is_finish ? 'mb-9' : 'mb-3']">
        {{ is_finish ? '已將新密碼寄至您的信箱，請確認並完成修改動作。' : '請填寫您的註冊信箱，確認無誤後將寄信至您的信箱，並完成密碼重置。' }}
      </p>
      <template v-if="is_finish">
        <FormInput class="mb-4 rounded-full" :value="email" :input-value="email" disabled />
        <button
          class="py-2.5 w-full border border-solid border-[#cbcccd] rounded-full bg-white hover:bg-[#52528C] text-[#777] hover:text-[#eee] font-bold text-2xl"
          type="button"
          @click.prevent="$store.dispatch('isModal', false)"
        >
          確認
        </button>
      </template>
      <template v-else>
        <FormInput class="mb-4 rounded-full" v-model="email" placeholder="請輸入電子信箱" :input-value="email" />
        <button class="py-3 w-full rounded-full bg-[#54588c] hover:bg-[#3a3b72] text-white font-bold text-2xl" type="button">送出</button>
      </template>
    </Modal>
    <router-view />
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Modal from '@/components/Modal.vue'
import FormInput from '@/components/FormInput.vue'

export default {
  name: 'NotLogged',
  components: { Modal, FormInput },
  data: () => ({
    email: '',
    is_finish: false,
  }),
  computed: {
    ...mapState({ modal: (state) => state.isModal }),
  },
}
</script>
