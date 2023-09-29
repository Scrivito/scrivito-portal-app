import { provideEditingConfig } from 'scrivito'
import { IconWidget } from '../IconWidget/IconWidgetClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

provideEditingConfig('IconContainerWidget', {
  title: 'Icon List',
  thumbnail: classNameToThumbnail('IconContainerWidget'),
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
