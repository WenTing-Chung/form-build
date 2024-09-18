<template>
  <div class="flex items-center w-full setting-bg">
    <div class="overflow-y-auto py-10 xl:py-0 w-full max-h-full xl:w-1/2 scroll-style">
      <div class="mx-auto w-2/3 sm:w-1/2">
        <p class="mb-9 font-bold text-3xl">帳號設定</p>
        <ValidationObserver ref="SettingForm">
          <form class="mb-20">
            <ValidationProvider name="姓名" rules="required">
              <div class="mb-5" slot-scope="{ valid, errors }">
                <label for="SettingForm-name">
                  <span class="text-lg">姓名</span>
                  <FormInput
                    id="SettingForm-name"
                    v-model="form.name"
                    placeholder="請輸入姓名"
                    :input-value="form.name"
                    :is-errors="Boolean(errors[0])"
                    :state="errors[0] ? false : valid ? true : null"
                  />
                </label>
                <small :class="{ 'text-danger': errors[0] }">{{ errors[0] }}</small>
              </div>
            </ValidationProvider>
            <div class="mb-5">
              <label for="SettingForm-account">
                <span class="text-lg">帳號</span>
                <FormInput
                  id="SettingForm-account"
                  class="bg-[#eee]"
                  v-model="form.account"
                  placeholder="請輸入帳號"
                  :input-value="form.account"
                  disabled
                />
              </label>
            </div>
            <ValidationProvider name="E-mail" rules="required|email">
              <div class="mb-5" slot-scope="{ valid, errors }">
                <label for="SettingForm-email">
                  <span class="text-lg">E-mail</span>
                  <FormInput
                    id="SettingForm-email"
                    v-model="form.email"
                    placeholder="請輸入E-mail"
                    :input-value="form.email"
                    :is-errors="Boolean(errors[0])"
                    :state="errors[0] ? false : valid ? true : null"
                  />
                </label>
                <small :class="{ 'text-danger': errors[0] }">{{ errors[0] }}</small>
              </div>
            </ValidationProvider>
            <ValidationProvider name="舊密碼" rules="required">
              <div class="mb-5" slot-scope="{ valid, errors }">
                <label for="SettingForm-old_pwd">
                  <span class="text-lg">舊密碼</span>
                  <FormInput
                    id="SettingForm-old_pwd"
                    v-model="form.old_pwd"
                    placeholder="請輸入舊密碼"
                    :input-value="form.old_pwd"
                    :is-errors="Boolean(errors[0])"
                    :state="errors[0] ? false : valid ? true : null"
                  />
                </label>
                <small :class="{ 'text-danger': errors[0] }">{{ errors[0] }}</small>
              </div>
            </ValidationProvider>
            <ValidationProvider name="密碼" rules="required">
              <div class="mb-5" slot-scope="{ valid, errors }">
                <label for="SettingForm-new_pwd">
                  <span class="text-lg">密碼</span>
                  <FormInput
                    id="SettingForm-new_pwd"
                    v-model="form.new_pwd"
                    placeholder="請輸入密碼"
                    :input-value="form.new_pwd"
                    :is-errors="Boolean(errors[0])"
                    :state="errors[0] ? false : valid ? true : null"
                  />
                </label>
                <small :class="{ 'text-danger': errors[0] }">{{ errors[0] }}</small>
              </div>
            </ValidationProvider>
            <ValidationProvider name="確認密碼" rules="required">
              <div class="mb-5" slot-scope="{ valid, errors }">
                <label for="SettingForm-check_pwd">
                  <span class="text-lg">密碼</span>
                  <FormInput
                    id="SettingForm-check_pwd"
                    v-model="form.check_pwd"
                    placeholder="請輸入確認密碼"
                    :input-value="form.check_pwd"
                    :is-errors="Boolean(errors[0])"
                    :state="errors[0] ? false : valid ? true : null"
                  />
                </label>
                <small :class="{ 'text-danger': errors[0] }">{{ errors[0] }}</small>
              </div>
            </ValidationProvider>
          </form>
        </ValidationObserver>
        <button class="py-3 w-full rounded-full bg-[#57588b] hover:bg-[#3a3b72] text-white font-bold text-2xl" type="button">立即登入</button>
      </div>
    </div>
  </div>
</template>

<script>
import FormInput from '@/components/FormInput.vue'

export default {
  name: 'AccountSetting',
  components: { FormInput },
  data: () => ({
    form: {
      name: '',
      account: '',
      email: '',
      old_pwd: '',
      new_pwd: '',
      check_pwd: '',
    },
  }),
}
</script>

<style lang="scss" scoped>
.setting-bg::before {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background: url('../assets/image/bg.png') no-repeat top center;
  background-size: 100% 100%;
  content: '';
  transform: scaleX(-1);
}
</style>
