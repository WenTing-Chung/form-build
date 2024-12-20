<template>
  <div class="flex items-center w-full setting-bg">
    <div class="overflow-y-auto py-20 w-full max-h-full scroll-style">
      <div class="py-10 xl:py-0 xl:w-1/2">
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
                  <label for="SettingForm-password">
                    <span class="text-lg">舊密碼</span>
                    <div class="relative">
                      <FormInput
                        id="SettingForm-password"
                        v-model="form.password"
                        placeholder="請輸入舊密碼"
                        :input-type="is_show_oldPwd ? 'text' : 'password'"
                        :input-value="form.password"
                        :is-errors="Boolean(errors[0])"
                        :state="errors[0] ? false : valid ? true : null"
                      />
                      <font-awesome-icon
                        size="lg"
                        class="absolute top-1/2 right-5 cursor-pointer -translate-y-1/2"
                        :icon="['fa-regular', is_show_oldPwd ? 'fa-eye' : 'fa-eye-slash']"
                        @click.prevent="is_show_oldPwd = !is_show_oldPwd"
                      />
                    </div>
                  </label>
                  <small :class="{ 'text-danger': errors[0] }">{{ errors[0] }}</small>
                </div>
              </ValidationProvider>
              <ValidationProvider name="密碼" rules="required">
                <div class="mb-5" slot-scope="{ valid, errors }">
                  <label for="SettingForm-new_password">
                    <span class="text-lg">密碼</span>
                    <div class="relative">
                      <FormInput
                        id="SettingForm-new_password"
                        v-model="form.new_password"
                        placeholder="請輸入密碼"
                        :input-type="is_show_pwd ? 'text' : 'password'"
                        :input-value="form.new_password"
                        :is-errors="Boolean(errors[0])"
                        :state="errors[0] ? false : valid ? true : null"
                      />
                      <font-awesome-icon
                        size="lg"
                        class="absolute top-1/2 right-5 cursor-pointer -translate-y-1/2"
                        :icon="['fa-regular', is_show_pwd ? 'fa-eye' : 'fa-eye-slash']"
                        @click.prevent="is_show_pwd = !is_show_pwd"
                      />
                    </div>
                  </label>
                  <small :class="{ 'text-danger': errors[0] }">{{ errors[0] }}</small>
                </div>
              </ValidationProvider>
              <ValidationProvider name="確認密碼" rules="required">
                <div class="mb-5" slot-scope="{ valid, errors }">
                  <label for="SettingForm-new_password_confirmation">
                    <span class="text-lg">確認密碼</span>
                    <div class="relative">
                      <FormInput
                        id="SettingForm-new_password_confirmation"
                        v-model="form.new_password_confirmation"
                        placeholder="請輸入確認密碼"
                        :input-type="is_show_checkPwd ? 'text' : 'password'"
                        :input-value="form.new_password_confirmation"
                        :is-errors="Boolean(errors[0])"
                        :state="errors[0] ? false : valid ? true : null"
                      />
                      <font-awesome-icon
                        size="lg"
                        class="absolute top-1/2 right-5 cursor-pointer -translate-y-1/2"
                        :icon="['fa-regular', is_show_checkPwd ? 'fa-eye' : 'fa-eye-slash']"
                        @click.prevent="is_show_checkPwd = !is_show_checkPwd"
                      />
                    </div>
                  </label>
                  <small :class="{ 'text-danger': errors[0] }">{{ errors[0] }}</small>
                </div>
              </ValidationProvider>
            </form>
          </ValidationObserver>
          <button
            class="py-3 w-full rounded-full bg-[#57588b] hover:bg-[#3a3b72] text-white font-bold text-2xl"
            type="button"
            @click.prevent="userInfo_modify"
          >
            儲存變更
          </button>
        </div>
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
    },
    is_show_oldPwd: false,
    is_show_pwd: false,
    is_show_checkPwd: false,
  }),
  created() {
    this.userInfo()
  },
  methods: {
    /**@帳號資料 */
    userInfo() {
      this.axios.userProfile().then((res) => {
        const { code, data } = res.data
        if (code === 200) this.form = data
      })
    },
    /**@修改帳號資料 */
    userInfo_modify() {
      this.axios.userProfile_modify(this.form).then((res) => {
        if (res.data.code === 200) {
          const { id, name } = this.form
          const storageUser = { id, name }
          localStorage.setItem(`${process.env.VUE_APP_COOKIES}_User`, JSON.stringify(storageUser))
          this.$store.dispatch('set_userInfo', storageUser)
          this.userInfo()
        }
      })
    },
  },
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
