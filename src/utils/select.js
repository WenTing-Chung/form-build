export const inputType = [
  { text: '一般文字', value: 'text' },
  { text: '數字', value: 'number' },
  { text: 'Email', value: 'email' },
  // { text: '電話', value: 'tel' },
]

export const inputType_to_text = function (val) {
  const obj = inputType.find((x) => x.value === val)
  return obj.text
}

export const mediaList = [
  { text: '文件', value: '.dot,.doc,.docm,.dotm,.odt,.docx,.dotx,.text,.txt' },
  { text: '簡報', value: '.ppt,.pptm,.ppsm,.potm,.odp,.pptx,.potx' },
  { text: '試算表', value: '.xls,.xlsm,.xltm,.ods,.xlsx,.xltx,.csv' },
  // { text: '繪圖', value: '' },
  { text: 'PDF', value: '.pdf' },
  { text: '圖片', value: 'image/*' },
  { text: '影片', value: 'video/*' },
  { text: '音訊', value: 'audio/*' },
]
