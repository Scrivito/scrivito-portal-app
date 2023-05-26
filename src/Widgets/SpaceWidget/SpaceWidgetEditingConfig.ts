import * as Scrivito from 'scrivito'
import { SpaceWidget } from './SpaceWidgetClass'

Scrivito.provideEditingConfig(SpaceWidget, {
  title: 'Space',
  attributes: {
    size: {
      title: 'Choose size',
      description: 'Height of the space in rem. Default: 5',
    },
  },
  properties: ['size'],
  initialContent: {
    size: 5,
  },
})
