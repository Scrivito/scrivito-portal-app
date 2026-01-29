export const textStyleEditAttributes = {
  fontSize: {
    title: 'Font size',
    editor: 'dimensionPicker',
    options: { units: ['px'] },
  },
  letterSpacing: {
    title: 'Letter spacing',
    editor: 'dimensionPicker',
    options: { units: ['px'] },
  },
  lineHeight: {
    title: 'Line height',
    editor: 'dimensionPicker',
    options: { units: ['px'] },
  },
  textTransform: {
    title: 'Case changes',
    values: [
      { value: 'none', title: 'None' },
      { value: 'uppercase', title: 'AA' },
      { value: 'lowercase', title: 'aa' },
      { value: 'capitalize', title: 'Aa' },
    ],
  },
} as const

export const textStyleGroup = {
  key: 'textStyles',
  title: 'Text styles',
  properties: ['fontSize', 'letterSpacing', 'lineHeight', 'textTransform'],
} as const

// TODO: Apply textStyleInitialContent to initial content
export const textStyleInitialContent = {
  textTransform: 'none',
} as const
