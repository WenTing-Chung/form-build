<template>
  <div class="overflow-y-auto ml-auto py-10 xl:py-0 w-full max-h-screen xl:w-1/2 scroll-style">
    <div class="mx-auto w-2/3 sm:w-1/2">
      <p class="mb-8 font-bold text-3xl">歡迎加入</p>
      <ValidationObserver ref="RegisterForm">
        <form class="mb-10 xl:mb-40">
          <ValidationProvider name="帳號" rules="required">
            <div class="mb-5" slot-scope="{ valid, errors }">
              <label for="RegisterForm-account">
                <span class="text-lg">帳號</span>
                <FormInput
                  id="RegisterForm-account"
                  v-model="form.account"
                  placeholder="請輸入帳號"
                  :input-value="form.account"
                  :is-errors="Boolean(errors[0])"
                  :state="errors[0] ? false : valid ? true : null"
                />
              </label>
              <small :class="{ 'text-danger': errors[0] }">{{ errors[0] }}</small>
            </div>
          </ValidationProvider>
          <ValidationProvider name="密碼" vid="register_confirmPassword" rules="required">
            <div class="mb-5" slot-scope="{ valid, errors }">
              <label for="RegisterForm-password">
                <span class="text-lg">密碼</span>
                <div class="relative">
                  <FormInput
                    id="RegisterForm-password"
                    class="pr-11"
                    v-model="form.password"
                    placeholder="請輸入密碼"
                    :input-type="is_show ? 'text' : 'password'"
                    :input-value="form.password"
                    :is-errors="Boolean(errors[0])"
                    :state="errors[0] ? false : valid ? true : null"
                  />
                  <font-awesome-icon
                    size="lg"
                    class="absolute top-1/2 right-5 cursor-pointer -translate-y-1/2"
                    :icon="['fa-regular', is_show ? 'fa-eye' : 'fa-eye-slash']"
                    @click.prevent="is_show = !is_show"
                  />
                </div>
              </label>
              <small :class="{ 'text-danger': errors[0] }">{{ errors[0] }}</small>
            </div>
          </ValidationProvider>
          <ValidationProvider name="確認密碼" :rules="{ required: true, confirmed: 'register_confirmPassword' }">
            <div class="mb-5" slot-scope="{ valid, errors }">
              <label for="RegisterForm-password_confirmation">
                <span class="text-lg">確認密碼</span>
                <div class="relative">
                  <FormInput
                    id="RegisterForm-password_confirmation"
                    class="pr-11"
                    v-model="form.password_confirmation"
                    placeholder="請再次輸入密碼"
                    :input-type="is_show ? 'text' : 'password'"
                    :input-value="form.password_confirmation"
                    :is-errors="Boolean(errors[0])"
                    :state="errors[0] ? false : valid ? true : null"
                  />
                  <font-awesome-icon
                    size="lg"
                    class="absolute top-1/2 right-5 cursor-pointer -translate-y-1/2"
                    :icon="['fa-regular', is_show ? 'fa-eye' : 'fa-eye-slash']"
                    @click.prevent="is_show = !is_show"
                  />
                </div>
              </label>
              <small :class="{ 'text-danger': errors[0] }">{{ errors[0] }}</small>
            </div>
          </ValidationProvider>
          <ValidationProvider name="姓名" rules="required">
            <div class="mb-5" slot-scope="{ valid, errors }">
              <label for="RegisterForm-name">
                <span class="text-lg">姓名</span>
                <FormInput
                  id="RegisterForm-name"
                  v-model="form.name"
                  placeholder="請輸入真實姓名"
                  :input-value="form.name"
                  :is-errors="Boolean(errors[0])"
                  :state="errors[0] ? false : valid ? true : null"
                />
              </label>
              <small :class="{ 'text-danger': errors[0] }">{{ errors[0] }}</small>
            </div>
          </ValidationProvider>
          <ValidationProvider name="E-mail" rules="required|email">
            <div slot-scope="{ valid, errors }">
              <label for="RegisterForm-email">
                <span class="text-lg">E-mail</span>
                <FormInput
                  id="RegisterForm-email"
                  v-model="form.name"
                  placeholder="請輸入電子信箱"
                  :input-value="form.email"
                  :is-errors="Boolean(errors[0])"
                  :state="errors[0] ? false : valid ? true : null"
                />
              </label>
              <small :class="{ 'text-danger': errors[0] }">{{ errors[0] }}</small>
            </div>
          </ValidationProvider>
        </form>
      </ValidationObserver>
      <button class="mb-6 py-3 w-full rounded-full bg-[#54588c] hover:bg-[#3a3b72] text-white font-bold text-2xl" type="button">註冊</button>
      <router-link :to="{ name: 'Login' }" class="inline text-[#54588c] text-lg underline hover:font-bold hover:underline">立即登入</router-link>
    </div>
  </div>
</template>

<script>
import FormInput from '@/components/FormInput.vue'

export default {
  name: 'Register-page',
  components: { FormInput },
  data: () => ({
    form: {
      account: '',
      password: '',
      password_confirmation: '',
      name: '',
      email: '',
    },
    is_show: false,
  }),
  metaInfo: {
    title: '註冊',
  },
}
</script>
