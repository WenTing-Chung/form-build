<template>
  <section class="flex items-center min-h-screen gradient-mix-image">
    <Modal v-if="modal">
      <template v-if="is_finish"> 123 </template>
      <template v-else>
        <p class="mb-5 text-violet font-bold text-3xl">忘記密碼</p>
        <p class="mb-3 text-base">請填寫您的註冊信箱，確認無誤後將寄信至您的信箱，並點選郵件中的網址完成密碼重置。</p>
      </template>
    </Modal>
    <router-view />
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Modal from '@/components/Modal.vue'

export default {
  name: 'NotLogged',
  components: { Modal },
  data: () => ({
    is_finish: false,
  }),
  computed: {
    ...mapState({
      modal: (state) => state.isModal,
    }),
  },
}
</script>
