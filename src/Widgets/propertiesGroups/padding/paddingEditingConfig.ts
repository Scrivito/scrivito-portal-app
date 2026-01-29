// TODO: Think of a way to "lock" top/bottom and left/right to the same unit.
export const paddingEditAttributes = {
  paddingTop: {
    title: 'Top',
    editor: 'dimensionPicker',
    options: { units: ['px', '%'] },
  },
  paddingLeft: {
    title: 'Left',
    editor: 'dimensionPicker',
    options: { units: ['px', '%'] },
  },
  paddingRight: {
    title: 'Right',
    editor: 'dimensionPicker',
    options: { units: ['px', '%'] },
  },
  paddingBottom: {
    title: 'Bottom',
    editor: 'dimensionPicker',
    options: { units: ['px', '%'] },
  },
} as const

export const paddingGroup = {
  key: 'padding',
  properties: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
  title: 'Margins',
} as const
