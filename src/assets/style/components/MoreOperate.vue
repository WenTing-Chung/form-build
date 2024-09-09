<template>
  <ul class="absolute">
    <li v-for="(item, i) in list" :key="i">{{ item }}</li>
  </ul>
</template>

<script>
export default {
  name: 'MoreOperate',
  data: () => ({
    list: ['重新命名', '新分頁開啟', '編輯', '紀錄', '移動到資料夾', '刪除'],
  }),
}
</script>
