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
   * @資料夾
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
  folderName(id) {
    return service.get('/folder/modify', { params: id })
  },
  modifyFolderName(form) {
    return service.put('/folder/modify', form)
  },
  deleteFolder(id) {
    return service.delete('/folder/delete', { params: id })
  },
  /**
   * @表單
   */
  formList(searchForm) {
    return service.get('/form', { params: searchForm })
  },
  formStar(id) {
    return service.post('/form/switch', id)
  },
  createdForm(form) {
    return service.post('/form/create', form)
  },
  formInfo(id) {
    return service.get('/form/modify', { params: id })
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
