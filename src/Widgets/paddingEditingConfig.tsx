import { Widget } from 'scrivito'
import { AttributeDimensionEditor } from '../Components/ScrivitoExtensions/AttributeDimensionEditor'

export const paddingEditingConfigAttributes = {
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

export const paddingPropertiesGroup = {
  title: 'Margins',
  properties: [
    [
      'paddingTop',
      {
        component: ({ widget }: { widget?: Widget }) => (
          <AttributeDimensionEditor
            widget={widget}
            attribute="paddingTop"
            units={['px', '%']}
          />
        ),
      },
    ],
    [
      'paddingBottom',
      {
        component: ({ widget }: { widget?: Widget }) => (
          <AttributeDimensionEditor
            widget={widget}
            attribute="paddingBottom"
            units={['px']}
          />
        ),
      },
    ],
    [
      'paddingLeft',
      {
        component: ({ widget }: { widget?: Widget }) => (
          <AttributeDimensionEditor
            widget={widget}
            attribute="paddingLeft"
            units={['px', '%']}
          />
        ),
      },
    ],
    [
      'paddingRight',
      {
        component: ({ widget }: { widget?: Widget }) => (
          <AttributeDimensionEditor
            widget={widget}
            attribute="paddingRight"
            units={['px']}
          />
        ),
      },
    ],
  ],
  key: 'PaddingProperties',
} as const
