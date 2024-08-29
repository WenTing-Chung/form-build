import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    isModal: false,
  },
  mutations: {
    IS_LOADING(state, status) {
      state.isLoading = status
    },
    IS_MODAL(state, status) {
      state.isModal = status
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
  },
  getters: {},
  modules: {},
})
