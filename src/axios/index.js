import service from './config.js'

export default {
  /**@登入 */
  login(loginForm) {
    return service.post('/login', loginForm)
  },
  /**@登出 */
  logout() {
    return service.post('/logout')
  },
  /**@註冊 */
  register(registerForm) {
    return service.post('/register', registerForm)
  },
  /**@忘記密碼 */
  forget(forgetForm) {
    return service.post('/forgot', forgetForm)
  },
  /**@帳號設定_詳情 */
  userProfile() {
    return service.get('/user/profile')
  },
  /**@帳號設定_編輯 */
  userProfile_modify(form) {
    return service.put('/user/profile', form)
  },
}
