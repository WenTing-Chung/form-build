<template>
  <div class="ml-auto w-full xl:w-1/2">
    <div class="mx-auto w-2/3 sm:w-1/2">
      <p class="mb-8 font-bold text-3xl">歡迎回來</p>
      <ValidationObserver ref="LoginForm">
        <form class="mb-5">
          <ValidationProvider name="帳號" rules="required">
            <div class="mb-5" slot-scope="{ valid, errors }">
              <label for="LoginForm-account">
                <span class="text-lg">帳號</span>
                <FormInput
                  id="LoginForm-account"
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
          <ValidationProvider name="密碼" rules="required">
            <div slot-scope="{ valid, errors }">
              <label for="LoginForm-password">
                <span class="text-lg">密碼</span>
                <button
                  class="inline ml-4 text-[#54588c] underline hover:font-bold hover:underline"
                  type="button"
                  @click.prevent="$store.dispatch('isModal', true)"
                >
                  忘記密碼
                </button>
                <div class="relative z-0">
                  <FormInput
                    id="LoginForm-password"
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
        </form>
      </ValidationObserver>
      <div class="mb-5">
        <input id="is-remember" v-model="is_remember" type="checkbox" class="hidden" />
        <label for="is-remember" class="pl-8 checkbox-control">記住帳號</label>
      </div>
      <button class="mb-10 py-3 w-full rounded-full bg-[#54588c] hover:bg-[#3a3b72] text-white font-bold text-2xl" type="button">立即登入</button>
      <router-link :to="{ name: 'Register' }" class="inline text-[#54588c] text-lg underline hover:font-bold hover:underline">立即註冊</router-link>
    </div>
  </div>
</template>

<script>
import FormInput from '@/components/FormInput.vue'

export default {
  name: 'Login-page',
  components: { FormInput },
  data: () => ({
    form: {
      account: '',
      password: '',
    },
    is_show: false,
    is_remember: false,
  }),
  metaInfo: {
    title: '登入',
  },
}
</script>

<style lang="scss" scoped>
.checkbox-control {
  &::before,
  &::after {
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 4px;
  }
  &::before {
    border: 1px solid #cbcccd;
    background-color: #fff;
  }
}
input[id='is-remember']:checked + .checkbox-control {
  &::before {
    border-color: #52528c;
    background-color: #52528c;
  }
  &::after {
    background-color: #fff;

    clip-path: polygon(15% 60%, 33% 80%, 85% 10%, 90% 15%, 33% 90%, 10% 65%);
  }
}
</style>
