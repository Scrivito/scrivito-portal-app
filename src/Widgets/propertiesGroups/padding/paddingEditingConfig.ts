import { PaddingEditor } from './PaddingEditor'

export const paddingEditAttributes = {
  paddingTop: {
    title: 'Top',
  },
  paddingLeft: {
    title: 'Left',
  },
  paddingRight: {
    title: 'Right',
  },
  paddingBottom: {
    title: 'Bottom',
  },
} as const

export const paddingGroup = {
  component: PaddingEditor,
  key: 'padding',
  properties: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
  title: 'Margins',
} as const
