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
  /**
   * @資料夾清單
   */
  folderList() {
    return service.get('/folder')
  },
  folderInfo(id) {
    return service.get('/folder/modify', { params: id })
  },
  createdFolder(name) {
    return service.post('/folder/create', name)
  },
  /**
   * @帳號設定
   */
  userProfile() {
    return service.get('/user/profile')
  },
  userProfile_modify(form) {
    return service.put('/user/profile', form)
  },
}
