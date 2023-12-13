import { provideEditingConfig } from 'scrivito'
import { DataIconConditionWidget } from './DataIconConditionWidgetClass'
import Thumbnail from './thumbnail.svg'


provideEditingConfig(DataIconConditionWidget, {
  title: 'Data Icon Condition',
  thumbnail: Thumbnail,
  attributes: {
    attributeValue: { title: 'Attribute value' },
    icon: {
      title: 'Icon',
      description:
        'Default: "bi-box". The full list of names can be found at https://icons.getbootstrap.com/',
    },
  },
  titleForContent: (content) =>
    `${content.get('attributeValue')} => ${content.get('icon')}`,
  properties: ['attributeValue', 'icon'],
  initialContent: {
    icon: 'bi-box',
  },
})
