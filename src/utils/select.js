export const inputType = [
  { text: '一般文字', value: 'text' },
  { text: '數字', value: 'number' },
  { text: 'Email', value: 'email' },
  { text: '電話', value: 'tel' },
]

export const inputType_to_text = function (val) {
  const obj = inputType.find((x) => x.value === val)
  return obj.text
}
