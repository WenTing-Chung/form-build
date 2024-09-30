export default [
  {
    value: 0,
    text: '單行文字',
    kind: 'input',
    img: require('@/assets/image/icon_input.svg'),
    data: {
      required: false,
      type: 'text',
      label: {
        value: '',
        bold: false, // 粗體
        italic: false, // 斜體
        underline: false, // 下底線
      },
      question_desc: '', // 題目說明
      image: '',
      value: '',
      max: '80',
    },
  },
  {
    value: 1,
    text: '多行文字',
    kind: 'textarea',
    img: require('@/assets/image/icon_textarea.svg'),
    data: {
      required: false,
      label: {
        value: '',
        bold: false, // 粗體
        italic: false, // 斜體
        underline: false, // 下底線
      },
      question_desc: '', // 題目說明
      image: '',
      value: '',
      max: '1000',
    },
  },
  {
    value: 2,
    text: '單選題',
    kind: 'radio',
    img: require('@/assets/image/icon_radio.svg'),
    data: {
      required: false,
      label: {
        value: '',
        bold: false, // 粗體
        italic: false, // 斜體
        underline: false, // 下底線
      },
      question_desc: '', // 題目說明
      image: '',
      value: '',
      option: [{ value: '選項1' }],
    },
  },
  // {
  //   value: 3,
  //   text: '複選題',
  //   img: require('@/assets/image/icon_checkbox.svg'),
  //   data: {
  //     required: false,
  //     label: {
  //       value: '',
  //       bold: false,
  //       italic: false,
  //       underline: false,
  //     },
  //   },
  // },
  // {
  //   value: 4,
  //   text: '下拉式',
  //   img: require('@/assets/image/icon_select.svg'),
  //   data: {
  //     required: false,
  //     label: {
  //       value: '',
  //       bold: false,
  //       italic: false,
  //       underline: false,
  //     },
  //   },
  // },
  // {
  //   value: 5,
  //   text: '雲端上傳',
  //   img: require('@/assets/image/icon_file.svg'),
  //   data: {
  //     required: false,
  //     label: {
  //       value: '',
  //       bold: false,
  //       italic: false,
  //       underline: false,
  //     },
  //   },
  // },
  // {
  //   value: 6,
  //   text: '線性刻度',
  //   img: require('@/assets/image/icon_progress.svg'),
  //   data: {
  //     required: false,
  //     label: {
  //       value: '',
  //       bold: false,
  //       italic: false,
  //       underline: false,
  //     },
  //   },
  // },
  // {
  //   value: 7,
  //   text: '單選方塊',
  //   img: require('@/assets/image/icon_radio_ar.svg'),
  //   data: {
  //     required: false,
  //     label: {
  //       value: '',
  //       bold: false,
  //       italic: false,
  //       underline: false,
  //     },
  //   },
  // },
  // {
  //   value: 8,
  //   text: '複選方塊',
  //   img: require('@/assets/image/icon_checkbox_ar.svg'),
  //   data: {
  //     required: false,
  //     label: {
  //       value: '',
  //       bold: false,
  //       italic: false,
  //       underline: false,
  //     },
  //   },
  // },
  // {
  //   value: 9,
  //   text: '日期',
  //   img: require('@/assets/image/icon_date.svg'),
  //   data: {
  //     required: false,
  //     label: {
  //       value: '',
  //       bold: false,
  //       italic: false,
  //       underline: false,
  //     },
  //   },
  // },
  // {
  //   value: 10,
  //   text: '時間',
  //   img: require('@/assets/image/icon_time.svg'),
  //   data: {
  //     required: false,
  //     label: {
  //       value: '',
  //       bold: false,
  //       italic: false,
  //       underline: false,
  //     },
  //   },
  // },
]
