import Vue from 'vue'
import Vuex from 'vuex'
import meta from './meta'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    isModal: false,
    userInfo: JSON.parse(localStorage.getItem(`${process.env.VUE_APP_COOKIES}_User`)) || {},
    loginStatus: JSON.parse(localStorage.getItem(`${process.env.VUE_APP_COOKIES}_LoginStatus`)) || false,
    configID: JSON.parse(localStorage.getItem(`${process.env.VUE_APP_COOKIES}_Config`)) || {},
    // 暫存區資料
    temporaryData: JSON.parse(sessionStorage.getItem('temporary')) || [],
  },
  mutations: {
    IS_LOADING(state, status) {
      state.isLoading = status
    },
    IS_MODAL(state, status) {
      state.isModal = status
    },
    USERINFO(state, info) {
      state.userInfo = info
    },
    LOGIN_STATUS(state, status) {
      state.loginStatus = status
    },
    CONFIG_ID(state, id) {
      state.configID = id
    },
    TEMPORARY_DATA(state, data) {
      state.temporaryData = data
    },
  },
  actions: {
    alert(state, payload) {
      Vue.prototype.$toasted[payload.type](payload.message, {
        duration: payload.duration,
        position: 'top-center',
      })
    },
    isLoading({ commit }, status) {
      commit('IS_LOADING', status)
    },
    isModal({ commit }, status) {
      commit('IS_MODAL', status)
    },
    set_userInfo({ commit }, data) {
      commit('USERINFO', data)
    },
    set_temporaryData({ commit }, data) {
      commit('TEMPORARY_DATA', data)
    },
    modify_config_id({ commit }, data) {
      commit('CONFIG_ID', data)
    },
    changeLoginStatus({ commit }, status) {
      commit('LOGIN_STATUS', status)
    },
  },
  modules: {
    meta,
  },
  getters: {},
})
