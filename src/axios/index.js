import service from './config.js'

export default {
  /**@param { 登入 } */
  login(loginForm) {
    return service.post('/login', loginForm)
  },
  /**@param { 登出 } */
  logout() {
    return service.post('/logout')
  },
  /**@param { 註冊 } */
  register(registerForm) {
    return service.post('/register', registerForm)
  },
  /**@param { 忘記密碼 } */
  forget(forgetForm) {
    return service.post('/forgot', forgetForm)
  },
  /**
   * @param { 資料夾 }
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
   * @param { 表單 }
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
  modifyForm(form) {
    return service.put('/form/modify', form)
  },
  deleteForm(id) {
    return service.delete('/form/delete', { params: id })
  },
  moveForm(form) {
    return service.post('/form/movement', form)
  },
  settingInfo(id) {
    return service.get('/form/configure', { params: id })
  },
  saveSetting(form) {
    return service.put('/form/configure', form)
  },
  publishInfo(id) {
    return service.get('/form/publish', { params: id })
  },
  createPublishLink(id) {
    return service.post('/form/publish', id)
  },
  renderInfo(form) {
    return service.get('/submit', { params: form })
  },
  submitQuestionnaire(form) {
    return service.post('/submit', form)
  },
  statistics(id) {
    return service.get('/form/record', { params: id })
  },
  export(id) {
    return service.get('/form/export', { params: id })
  },
  /**
   * @param { 帳號設定 }
   */
  userProfile() {
    return service.get('/user/profile')
  },
  userProfile_modify(form) {
    return service.put('/user/profile', form)
  },
  /**@param { 檔案上傳 } */
  upload(file) {
    return service.post('/upload', file)
  },
}
