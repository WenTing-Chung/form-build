export default [
  {
    data: {
      config: {
        bold: false, // 粗體
        italic: false, // 斜體
        max: 80,
        type: 'text',
        underline: false, // 下底線
      },
      description: '', // 題目說明
      is_required: false,
      title: '',
      type: 'text',
    },
    img: require('@/assets/image/icon_input.svg'),
    kind: 'input',
    text: '單行文字',
    value: 0,
  },
  {
    data: {
      config: {
        bold: false, // 粗體
        italic: false, // 斜體
        max: 1000,
        underline: false, // 下底線
      },
      description: '', // 題目說明
      is_required: false,
      title: '',
      type: 'textarea',
    },
    img: require('@/assets/image/icon_textarea.svg'),
    kind: 'textarea',
    text: '多行文字',
    value: 1,
  },
  {
    data: {
      config: {
        bold: false, // 粗體
        italic: false, // 斜體
        underline: false, // 下底線
      },
      description: '', // 題目說明
      is_required: false,
      title: '',
      type: 'radio',
      option: [{ value: '選項1' }],
    },
    img: require('@/assets/image/icon_radio.svg'),
    kind: 'radio',
    text: '單選題',
    value: 2,
  },
  {
    data: {
      config: {
        bold: false, // 粗體
        italic: false, // 斜體
        underline: false, // 下底線
      },
      description: '', // 題目說明
      is_required: false,
      title: '',
      type: 'checkbox',
      option: [{ value: '選項1' }],
    },
    img: require('@/assets/image/icon_checkbox.svg'),
    kind: 'checkbox',
    text: '複選題',
    value: 3,
  },
  {
    data: {
      config: {
        bold: false, // 粗體
        italic: false, // 斜體
        underline: false, // 下底線
      },
      description: '', // 題目說明
      is_required: false,
      title: '',
      type: 'select',
      option: [{ value: '選項1' }],
    },
    img: require('@/assets/image/icon_select.svg'),
    kind: 'select',
    text: '下拉式',
    value: 4,
  },
  {
    data: {
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
      is_required: false,
      title: '',
      type: 'file',
    },
    img: require('@/assets/image/icon_file.svg'),
    kind: 'upload',
    text: '雲端上傳',
    value: 5,
  },
  {
    value: 6,
    text: '線性刻度',
    kind: 'linearScale',
    img: require('@/assets/image/icon_progress.svg'),
    data: {
      required: false,
      label: {
        value: '',
        bold: false, // 粗體
        italic: false, // 斜體
        underline: false, // 下底線
      },
      description: '', // 題目說明
      value: '',
      min: 1, // 最小值
      max: 5, // 最大值
      min_text: '', // 最小顯示文字
      max_text: '', // 最大顯示文字
    },
  },
  {
    value: 7,
    text: '單選方塊',
    kind: 'radioBox',
    img: require('@/assets/image/icon_radio_ar.svg'),
    data: {
      required: false,
      label: {
        value: '',
        bold: false, // 粗體
        italic: false, // 斜體
        underline: false, // 下底線
      },
      description: '', // 題目說明
      value: [],
      list: [{ value: '第1列' }], // 列
      column: [{ value: '第1欄' }], // 欄
    },
  },
  {
    value: 8,
    text: '複選方塊',
    kind: 'checkboxGroup',
    img: require('@/assets/image/icon_checkbox_ar.svg'),
    data: {
      required: false,
      label: {
        value: '',
        bold: false, // 粗體
        italic: false, // 斜體
        underline: false, // 下底線
      },
      description: '', // 題目說明
      value: [],
      list: [{ value: '第1列' }], // 列
      column: [{ value: '第1欄' }], // 欄
    },
  },
  {
    value: 9,
    text: '日期',
    kind: 'date',
    img: require('@/assets/image/icon_date.svg'),
    data: {
      required: false,
      label: {
        value: '',
        bold: false, // 粗體
        italic: false, // 斜體
        underline: false, // 下底線
      },
      description: '', // 題目說明
      value: '',
    },
  },
  {
    value: 10,
    text: '時間',
    kind: 'time',
    img: require('@/assets/image/icon_time.svg'),
    data: {
      required: false,
      label: {
        value: '',
        bold: false, // 粗體
        italic: false, // 斜體
        underline: false, // 下底線
      },
      description: '', // 題目說明
      value: '',
    },
  },
]
