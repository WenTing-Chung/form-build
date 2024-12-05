import Vue from 'vue'
import axios from 'axios'
import store from '@/store/index'
import router from '@/router/index'

const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 30000, // timeout 30s
  headers: { 'Content-type': 'application/json;charset=utf-8' },
})
const tokenWhiteList = []
const fileApiList = ['/upload']

service.interceptors.request.use(
  (config) => {
    const customConfig = config
    const token = Vue.$cookies.get(`${process.env.VUE_APP_COOKIES}_Token`) || undefined
    store.dispatch('isLoading', true)
    if (fileApiList.includes(config.url)) customConfig.headers = { 'Content-type': 'multipart/form-data' }
    if (token && !tokenWhiteList.includes(config.url)) customConfig.headers.Authorization = `Bearer ${token}`
    return customConfig
  },
  (error) => Promise.reject(error)
)

service.interceptors.response.use(
  (response) => {
    const customResponse = response
    const { code } = customResponse.data || 0
    const { message } = customResponse.data || ''
    const { token } = customResponse.data || undefined
    if (token) {
      Vue.$cookies.set(`${process.env.VUE_APP_COOKIES}_Token`, token)
      service.defaults.headers.common.Authorization = `Bearer ${token}`
    }
    store.dispatch('isLoading', false)
    switch (code) {
      case 200:
        store.dispatch('alert', {
          type: 'success',
          message,
          duration: 2000,
        })
        break
      case 300:
      case 400:
      case 401:
      case 402:
      case 422:
        if (!document.querySelector('.toasted')) {
          store.dispatch('alert', {
            type: 'error',
            message,
            duration: 3000,
          })
        }
        if (code === 401) {
          store.dispatch('isModal', false)
          Vue.$cookies.remove(`${process.env.VUE_APP_COOKIES}_Token`)
          Vue.$cookies.remove(`${process.env.VUE_APP_COOKIES}_userID`)
          if (router.currentRoute.name !== 'Login') router.push({ name: 'Login' })
        }
        break
    }
    return customResponse
  },
  (error) => {
    store.dispatch('isLoading', false)
    Promise.reject(error)
  }
)

export default service
