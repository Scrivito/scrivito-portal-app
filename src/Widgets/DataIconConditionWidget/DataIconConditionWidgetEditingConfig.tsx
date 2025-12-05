import { provideEditingConfig, Widget } from 'scrivito'
import { DataIconConditionWidget } from './DataIconConditionWidgetClass'
import Thumbnail from './thumbnail.svg'
import { ScrivitoBootstrapIconPicker } from '@justrelate/icon-picker'

provideEditingConfig(DataIconConditionWidget, {
  title: 'Data Icon Condition',
  thumbnail: Thumbnail,
  attributes: {
    attributeValue: { title: 'Attribute value' },
  },
  titleForContent: (content) =>
    `${content.get('attributeValue')} => ${content.get('icon')}`,
  propertiesGroups: [
    {
      title: 'Value',
      properties: ['attributeValue'],
      key: 'value-group',
    },
    {
      title: 'Icon',
      component: (props: { widget: Widget }) => (
        <ScrivitoBootstrapIconPicker defaultValue="box" {...props} />
      ),
      properties: ['icon'],
      key: 'icon-group',
    },
  ],
  initialContent: {
    icon: 'bi-box',
  },
})
