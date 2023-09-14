import { provideEditingConfig } from 'scrivito'
import { IconWidget } from '../IconWidget/IconWidgetClass'

provideEditingConfig('IconContainerWidget', {
  title: 'Icon List',
  attributes: {
    iconList: {
      title: 'Icon list',
    },
  },
  properties: ['iconList'],
  initialContent: {
    iconList: [
      new IconWidget({ icon: 'bi bi-check2-square bi-3x' }),
      new IconWidget({ icon: 'bi bi-check2-square bi-3x' }),
      new IconWidget({ icon: 'bi bi-check2-square bi-3x' }),
    ],
  },
})
