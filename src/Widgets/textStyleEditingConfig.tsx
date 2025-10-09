import { Widget } from 'scrivito'
import { AttributeDimensionEditor } from '../Components/ScrivitoExtensions/AttributeDimensionEditor'

export const textStyleEditingConfigAttributes = {
  textColor: {
    title: 'Text color',
    editor: 'colorPicker',
  },
  fontSize: {
    title: 'Font size',
  },
  letterSpacing: {
    title: 'Letter spacing',
  },
  lineHeight: {
    title: 'Line height',
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

export const textStylePropertiesGroup = {
  title: 'Text style',
  properties: [
    'textColor',
    [
      'fontSize',
      {
        component: ({ widget }: { widget?: Widget }) => (
          <AttributeDimensionEditor
            widget={widget}
            attribute="fontSize"
            units={['px']}
          />
        ),
      },
    ],
    [
      'letterSpacing',
      {
        component: ({ widget }: { widget?: Widget }) => (
          <AttributeDimensionEditor
            widget={widget}
            attribute="letterSpacing"
            units={['px']}
          />
        ),
      },
    ],
    [
      'lineHeight',
      {
        component: ({ widget }: { widget?: Widget }) => (
          <AttributeDimensionEditor
            widget={widget}
            attribute="lineHeight"
            units={['px']}
          />
        ),
      },
    ],
    'textTransform',
  ],
  key: 'textStylePropertiesGroup',
} as const
