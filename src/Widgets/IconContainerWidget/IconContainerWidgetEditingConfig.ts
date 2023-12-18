import { provideEditingConfig } from 'scrivito'
import { IconWidget } from '../IconWidget/IconWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig('IconContainerWidget', {
  title: 'Icon List',
  thumbnail: Thumbnail,
  attributes: {
    iconList: {
      title: 'Icon list',
    },
  },
  properties: ['iconList'],
  initialContent: {
    iconList: [
      new IconWidget({ icon: 'bi-check2-square' }),
      new IconWidget({ icon: 'bi-check2-square' }),
      new IconWidget({ icon: 'bi-check2-square' }),
    ],
  },
})
