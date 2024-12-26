<template>
  <div>統計紀錄</div>
</template>

<script>
export default {
  name: 'StatisticsLog',
  data: () => ({
    logData: {},
  }),
  created() {
    if (this.$route.query) {
      const form_id = Number(this.$route.query['formId'])
      this.get_statisticsLog(form_id)
    }
  },
  methods: {
    get_statisticsLog(id) {
      this.axios.statistics({ id }).then((res) => {
        const { code, data } = res.data
        if (code === 200) console.log(data)
      })
    },
  },
}
</script>
