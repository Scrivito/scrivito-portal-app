import { provideEditingConfig } from 'scrivito'
import { DataIconWidget } from './DataIconWidgetClass'
import Thumbnail from './thumbnail.svg'


provideEditingConfig(DataIconWidget, {
  title: 'Data Icon',
  thumbnail: Thumbnail,
  attributes: {
    alignment: {
      title: 'Alignment',
      description: 'Default: Left',
      values: [
        { value: 'left', title: 'Left' },
        { value: 'center', title: 'Center' },
        { value: 'right', title: 'Right' },
      ],
    },
    size: {
      title: 'Size',
      description: 'Default: bi-2x',
    },
    fallbackIcon: {
      title: 'Fallback icon',
      description:
        'This icon is used, if no condition matches. Default: "bi-question-octagon". The full list of names can be found at https://icons.getbootstrap.com/',
    },
  },
  properties: [
    'attributeName',
    'size',
    'alignment',
    'fallbackIcon',
    'conditions',
  ],
  initialContent: {
    alignment: 'left',
    size: 'bi-2x',
    fallbackIcon: 'bi-question-octagon',
  },
})
