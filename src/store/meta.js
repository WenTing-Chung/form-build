export default {
  namespaced: true,
  state: {
    metaInfo: {
      title: '',
      keywords: '' || null,
      description: '' || null,
    },
  },
  mutations: {
    META_INFO(state, metaInfo) {
      state.metaInfo = metaInfo
    },
  },
  actions: {
    set_metaInfo({ commit }, metaInfo) {
      commit('META_INFO', metaInfo)
    },
  },
}
