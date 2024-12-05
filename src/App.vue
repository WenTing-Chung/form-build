<template>
  <div id="app">
    <Loading :active.sync="loading" />
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loading from 'vue-loading-overlay'

export default {
  components: { Loading },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    // title: `${process.env.VUE_APP_TITLE}`,
    // all titles will be injected into this template
    titleTemplate: `%s - ${process.env.VUE_APP_TITLE}`,
  },
  computed: {
    ...mapState({
      loading: (state) => state.isLoading,
      modal: (state) => state.isModal,
    }),
  },
  watch: {
    modal: function (val) {
      const bodyElement = document.querySelector('body')
      if (val) bodyElement.style.overflow = 'hidden'
      else bodyElement.style.overflow = null
    },
  },
}
</script>
