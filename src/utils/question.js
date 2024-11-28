export default [
  {
    config: {
      bold: false, // 粗體
      italic: false, // 斜體
      max: 80,
      type: 'text',
      underline: false, // 下底線
    },
    description: '', // 題目說明
    img: require('@/assets/image/icon_input.svg'),
    is_required: false,
    text: '單行文字',
    title: '',
    type: 'text',
    value: 0,
  },
  {
    config: {
      bold: false, // 粗體
      italic: false, // 斜體
      max: 1000,
      underline: false, // 下底線
    },
    description: '', // 題目說明
    img: require('@/assets/image/icon_textarea.svg'),
    is_required: false,
    text: '多行文字',
    title: '',
    type: 'textarea',
    value: 1,
  },
  {
    config: {
      bold: false, // 粗體
      italic: false, // 斜體
      underline: false, // 下底線
    },
    description: '', // 題目說明
    img: require('@/assets/image/icon_radio.svg'),
    is_required: false,
    option: [{ value: '選項1' }],
    text: '單選題',
    title: '',
    type: 'radio',
    value: 2,
  },
  {
    config: {
      bold: false, // 粗體
      italic: false, // 斜體
      underline: false, // 下底線
    },
    description: '', // 題目說明
    img: require('@/assets/image/icon_checkbox.svg'),
    is_required: false,
    option: [{ value: '選項1' }],
    text: '複選題',
    title: '',
    type: 'checkbox',
    value: 3,
  },
  {
    config: {
      bold: false, // 粗體
      italic: false, // 斜體
      underline: false, // 下底線
    },
    description: '', // 題目說明
    img: require('@/assets/image/icon_select.svg'),
    is_required: false,
    kind: 'select',
    option: [{ value: '選項1' }],
    text: '下拉式',
    title: '',
    type: 'select',
    value: 4,
  },
  {
    config: {
      bold: false, // 粗體
      italic: false, // 斜體
      underline: false, // 下底線
      file: {
        size: 1,
        type: [],
      },
    },
    description: '', // 題目說明
    img: require('@/assets/image/icon_file.svg'),
    is_required: false,
    text: '雲端上傳',
    title: '',
    type: 'file',
    value: 5,
  },
  {
    config: {
      bold: false, // 粗體
      italic: false, // 斜體
      max: 5, // 最大值
      max_text: '', // 最大顯示文字
      min: 1, // 最小值
      min_text: '', // 最小顯示文字
      underline: false, // 下底線
    },
    description: '', // 題目說明
    img: require('@/assets/image/icon_progress.svg'),
    is_required: false,
    text: '線性刻度',
    title: '',
    type: 'range',
    value: 6,
  },
  {
    config: {
      bold: false, // 粗體
      italic: false, // 斜體
      underline: false, // 下底線
    },
    description: '', // 題目說明
    img: require('@/assets/image/icon_radio_ar.svg'),
    is_required: false,
    kind: 'radioBox',
    option: {
      list: [{ value: '第1列' }], // 列
      column: [{ value: '第1欄' }], // 欄
    },
    text: '單選方塊',
    title: '',
    type: 'single',
    value: 7,
  },
  {
    config: {
      bold: false, // 粗體
      italic: false, // 斜體
      underline: false, // 下底線
    },
    description: '', // 題目說明
    img: require('@/assets/image/icon_checkbox_ar.svg'),
    is_required: false,
    kind: 'checkboxGroup',
    option: {
      list: [{ value: '第1列' }], // 列
      column: [{ value: '第1欄' }], // 欄
    },
    text: '複選方塊',
    title: '',
    type: 'multiple',
    value: 8,
  },
  {
    config: {
      bold: false, // 粗體
      italic: false, // 斜體
      underline: false, // 下底線
    },
    description: '', // 題目說明
    img: require('@/assets/image/icon_date.svg'),
    is_required: false,
    text: '日期',
    title: '',
    type: 'date',
    value: 9,
  },
  {
    config: {
      bold: false, // 粗體
      italic: false, // 斜體
      underline: false, // 下底線
    },
    description: '', // 題目說明
    img: require('@/assets/image/icon_time.svg'),
    is_required: false,
    text: '時間',
    title: '',
    type: 'time',
    value: 10,
  },
]
