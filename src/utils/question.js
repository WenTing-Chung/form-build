export default [
  {
    description: '', // 題目說明
    is_required: false,
    option: null,
    other: {
      config: {
        bold: false, // 粗體
        italic: false, // 斜體
        max: 80,
        type: 'text',
        underline: false, // 下底線
      },
      icon: 'icon_input.svg',
      text: '單行文字',
      value: 0,
    },
    title: '',
    type: 'text',
  },
  {
    description: '', // 題目說明
    is_required: false,
    option: null,
    other: {
      config: {
        bold: false, // 粗體
        italic: false, // 斜體
        max: 1000,
        underline: false, // 下底線
      },
      icon: 'icon_textarea.svg',
      text: '多行文字',
      value: 1,
    },
    title: '',
    type: 'textarea',
  },
  {
    description: '', // 題目說明
    is_required: false,
    option: [{ value: '選項1', text: '選項1' }],
    other: {
      config: {
        bold: false, // 粗體
        italic: false, // 斜體
        underline: false, // 下底線
      },
      icon: 'icon_radio.svg',
      text: '單選題',
      value: 2,
    },
    title: '',
    type: 'radio',
  },
  {
    description: '', // 題目說明
    is_required: false,
    option: [{ value: '選項1', text: '選項1' }],
    other: {
      config: {
        bold: false, // 粗體
        italic: false, // 斜體
        underline: false, // 下底線
      },
      icon: 'icon_checkbox.svg',
      text: '複選題',
      value: 3,
    },
    title: '',
    type: 'checkbox',
  },
  {
    description: '', // 題目說明
    is_required: false,
    option: [{ value: '選項1', text: '選項1' }],
    other: {
      config: {
        bold: false, // 粗體
        italic: false, // 斜體
        underline: false, // 下底線
      },
      icon: 'icon_select.svg',
      text: '下拉式',
      value: 4,
    },
    title: '',
    type: 'select',
  },
  {
    description: '', // 題目說明
    is_required: false,
    option: null,
    other: {
      config: {
        bold: false, // 粗體
        italic: false, // 斜體
        underline: false, // 下底線
      },
      file: {
        size: 1,
        type: [],
      },
      icon: 'icon_file.svg',
      text: '雲端上傳',
      value: 5,
    },
    title: '',
    type: 'file',
  },
  {
    description: '', // 題目說明
    is_required: false,
    option: null,
    other: {
      config: {
        bold: false, // 粗體
        italic: false, // 斜體
        max: 5, // 最大值
        max_text: '', // 最大顯示文字
        min: 1, // 最小值
        min_text: '', // 最小顯示文字
        underline: false, // 下底線
      },
      icon: 'icon_progress.svg',
      text: '線性刻度',
      value: 6,
    },
    title: '',
    type: 'range',
  },
  {
    description: '', // 題目說明
    is_required: false,
    option: {
      list: [{ value: '第1列' }], // 列
      column: [{ value: '第1欄' }], // 欄
    },
    other: {
      config: {
        bold: false, // 粗體
        italic: false, // 斜體
        underline: false, // 下底線
      },
      icon: 'icon_radio_ar.svg',
      text: '單選方塊',
      value: 7,
    },
    title: '',
    type: 'single',
  },
  {
    description: '', // 題目說明
    is_required: false,
    option: {
      list: [{ value: '第1列' }], // 列
      column: [{ value: '第1欄' }], // 欄
    },
    other: {
      config: {
        bold: false, // 粗體
        italic: false, // 斜體
        underline: false, // 下底線
      },
      icon: 'icon_checkbox_ar.svg',
      text: '複選方塊',
      value: 8,
    },
    title: '',
    type: 'multiple',
  },
  {
    description: '', // 題目說明
    is_required: false,
    option: null,
    other: {
      config: {
        bold: false, // 粗體
        italic: false, // 斜體
        underline: false, // 下底線
      },
      icon: 'icon_date.svg',
      text: '日期',
      value: 9,
    },
    title: '',
    type: 'date',
  },
  {
    description: '', // 題目說明
    is_required: false,
    option: null,
    other: {
      config: {
        bold: false, // 粗體
        italic: false, // 斜體
        underline: false, // 下底線
      },
      icon: 'icon_time.svg',
      text: '時間',
      value: 10,
    },
    title: '',
    type: 'time',
  },
]
