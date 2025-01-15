<template>
  <div class="w-full bg-[#eee]">
    <div class="pt-8 h-full">
      <section class="mx-auto mb-5 w-4/5 rounded-t-lg bg-white">
        <p class="pt-3 px-5 text-[#52528c] font-bold text-xl">{{ formInfo.name }}</p>
        <div class="flex items-center justify-between py-3 px-5">
          <div>
            <date-picker class="mr-3" v-model="search.submitted_from" value-type="format" type="date">
              <template #input>
                <input
                  class="py-2 pl-2.5 w-full rounded-[10px] bg-[#f1f1f1] hover:bg-[#e1e1e1] placeholder:text-[#888] text-lg"
                  :value="search.submitted_from"
                  placeholder="起始日期"
                />
              </template>
            </date-picker>
            <date-picker class="mr-3" v-model="search.submitted_to" value-type="format" type="date">
              <template #input>
                <input
                  class="py-2 pl-2.5 w-full rounded-[10px] bg-[#f1f1f1] hover:bg-[#e1e1e1] placeholder:text-[#888] text-lg"
                  :value="search.submitted_to"
                  placeholder="結束日期"
                />
              </template>
            </date-picker>
            <button
              class="py-2 px-4 rounded-[10px] bg-[#54588c] hover:bg-[#3a3b72] text-white font-bold text-lg"
              type="button"
              @click.prevent=";(searched = JSON.parse(JSON.stringify(search))), (page = 1), searchDate()"
            >
              查詢
            </button>
          </div>
          <div class="relative">
            <div
              class="relative inline py-2 pl-2.5 pr-10 rounded-[10px] bg-[#fafaf9] hover:bg-[#e1e1e1] border border-solid border-[#ccc] text-[#888] text-lg cursor-pointer"
              @click.prevent="exportModal.show = !exportModal.show"
            >
              匯出
              <font-awesome-icon icon="fa-solid fa-angle-down" class="absolute top-1/2 right-2 -translate-y-1/2" />
            </div>
            <ul
              v-show="exportModal.show"
              class="absolute top-[calc(100%_+_8px)] left-1/2 overflow-hidden w-full rounded-[10px] bg-white shadow-[0_10px_9px_0_rgba(0,0,0,0.16)] text-base -translate-x-1/2 z-[1]"
            >
              <li
                v-for="fileType in fileList"
                :key="fileType.value"
                class="py-3 px-3.5 hover:bg-[#e1e1e1] cursor-pointer"
                @click.prevent="exportBtn(fileType.value)"
              >
                {{ fileType.text }}
              </li>
            </ul>
          </div>
        </div>
        <div id="table-height" class="block overflow-auto scroll-style">
          <table class="table-auto w-full whitespace-nowrap">
            <thead>
              <tr class="sticky top-0 bg-[#52528c] text-white">
                <th v-for="name in formInfo.title" :key="name" class="py-4 px-6 text-left">{{ name }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in formInfo.list" :key="i" class="odd:bg-[#e4e4f1] even:bg-white">
                <td v-for="(info, j) in item" :key="j" class="py-4 px-6">{{ info }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <Pagination :page="page" :page-count="total_page" :item-count="total_count" @changePage="changePage" />
    </div>
  </div>
</template>

<script>
import xlsx from 'xlsx-js-style'
import Pagination from '@/components/Pagination/Pagination.vue'

export default {
  name: 'StatisticsLog',
  components: { Pagination },
  data: () => ({
    formInfo: {},
    search: {
      id: null,
      submitted_from: '',
      submitted_to: '',
    },
    searched: {},
    exportModal: {
      show: false,
      type: 'xlsx',
    },
    fileList: [
      { text: 'Excel', value: 'xlsx' },
      // { text: 'CSV', value: 'csv' },
    ],
    json_fields: {},
    json_data: [],
    json_meta: [
      [
        {
          key: 'charset',
          value: 'utf-8',
        },
      ],
    ],
    page: 1,
    total_page: 1,
    total_count: 0,
  }),
  created() {
    if (this.$route.query) {
      const form_id = Number(this.$route.query['formId'])
      this.search['id'] = form_id
      this.searched = JSON.parse(JSON.stringify(this.search))
      this.searchDate()
    }
  },
  mounted() {
    const screenH = document.documentElement.clientHeight
    const countTableH = Math.floor(screenH / 150) * 12
    const table = document.querySelector('#table-height')
    table.style.maxHeight = `${countTableH}vh`
  },
  methods: {
    /**@查詢填問卷時間 */
    searchDate() {
      this.axios.statistics({ ...this.searched, page: this.page }).then((res) => {
        const { code, data } = res.data
        if (code === 200) {
          this.formInfo = { name: data.name, title: data.headers, list: data.list }
          this.total_page = data.total_page
          this.total_count = data.total_count
          document.title = `${this.formInfo['name']}_統計紀錄`
        }
      })
    },
    /**@切換分頁_OK */
    changePage(val) {
      this.page = val
      const table = document.querySelector('table')
      table.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    },
    /**@資料匯出格式 */
    exportExcel(id) {
      this.axios.export({ id }).then((res) => {
        const { code, data } = res.data
        if (code === 200) {
          const { exports, headers } = data
          let Ar = []
          exports.forEch((info) => {
            let obj = {}
            for (let i = 0; i < headers.length; i++) {
              for (let j = 0; j < info.length; j++) {
                obj[headers[i]] = info[i]
              }
            }
            Ar.push(obj)
          })
        }
      })
    },
    /**@匯出檔案 */
    exportBtn(fileType) {
      this.exportModal = { show: false, type: fileType }
      const id = Number(this.$route.query['formId'])
      this.axios
        .export({ id })
        .then((res) => {
          const { code, data } = res.data
          if (code === 200) {
            this.json_data = data.exports
            let fields = {}
            Object.keys(data.exports[0]).forEach((x) => {
              fields[x] = x
            })
            this.json_fields = fields
          }
        })
        .then(() => {
          this.exportToExcel()
        })
    },
    /**@計算單元格寬度 */
    getCellWidth(value) {
      if (value === null || value === '' || value === undefined) return 10
      else if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
        // 中文長度
        const chineseLength = value.match(/[\u4e00-\u9fa5]/g).length
        // 不是中文
        const otherLength = value.length - chineseLength
        return chineseLength * 2.2 + otherLength * 1.1
      } else return value.toString().length * 1.1
    },
    /**@匯出Excel */
    exportToExcel() {
      const header = Object.keys(this.json_fields) // 定義表頭
      const sheetData = this.json_data.map((item) => {
        const _item = {}
        header.forEach((key) => {
          _item[key] = item[key]
        })
        return _item
      })
      const worksheet = xlsx.utils.json_to_sheet(sheetData) // 創建一個工作表
      const workbook = xlsx.utils.book_new() // 創建一個新的工作簿
      // aoa_to_sheet   是將【一個二維陣列】轉化為sheet
      // json_to_sheet  是將【由對象組成的陣列】轉化為sheet
      // table_to_sheet 是將【table的dom】轉化為sheet

      // ↓ 計算最大欄寬
      let colWidths = []
      this.json_data.forEach((row) => {
        let index = 0
        for (const key in row) {
          if (colWidths[index] === null || colWidths[index] === '' || colWidths[index] === undefined) colWidths[index] = []
          switch (typeof row[key]) {
            case 'string':
            case 'number':
            case 'boolean':
              colWidths[index].push(this.getCellWidth(row[key]))
              break
            case 'object':
            case 'function':
              colWidths[index].push(0)
              break
          }
          index++
        }
      })
      worksheet['!cols'] = []
      // 每一列舉最大值為列寬
      // console.log('colWidths: ', colWidths)
      colWidths.forEach((widths, index) => {
        // 計算列頭的寬度
        widths.push(this.getCellWidth(header[index]))
        // 設置最大值為列寬
        worksheet['!cols'].push({ wch: Math.max(...widths) })
      })

      // ↓ 設置行高
      const rowsHeight = []
      for (let i = 0; i < this.json_data.length; i++) {
        rowsHeight.push({ hpx: 20 })
      }
      worksheet['!rows'] = rowsHeight
      // ↓ 設置樣式
      let range = xlsx.utils.decode_range(worksheet['!ref'])
      let headerStyle = {
        font: { sz: 12, name: '微軟正黑體', bold: true },
        alignment: { vertical: 'center', horizontal: 'center' },
        fill: { fgColor: { rgb: 'EEEEEE' } },
        border: {
          right: { style: 'thin', color: '000000' },
          bottom: { style: 'thin', color: '000000' },
          left: { style: 'thin', color: '000000' },
        },
      }
      let defaultStyle = {
        font: { sz: 11, name: '宋體' },
        alignment: { vertical: 'center', horizontal: 'center' },
      }
      for (let row = range.s.r; row <= range.e.r; ++row) {
        for (let col = range.s.c; col <= range.e.c; ++col) {
          let cellAddress = xlsx.utils.encode_cell({ r: row, c: col })
          let cell = worksheet[cellAddress]
          if (header.includes(cell.v)) cell.s = headerStyle
          else cell.s = defaultStyle
        }
      }
      xlsx.utils.book_append_sheet(workbook, worksheet, '工作表') // 把工作表添加到工作簿
      xlsx.writeFile(workbook, `${this.formInfo.name}.xlsx`)
    },
  },
}
</script>
