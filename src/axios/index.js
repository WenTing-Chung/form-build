import service from './config.js'

export default {
  /**@登入 */
  login(loginForm) {
    return service.post('/login', loginForm)
  },
}
