import { provideEditingConfig, Widget } from 'scrivito'
import { DataIconConditionWidget } from './DataIconConditionWidgetClass'
import Thumbnail from './thumbnail.svg'
import { ScrivitoBootstrapIconEditor } from 'scrivito-icon-editor'

provideEditingConfig(DataIconConditionWidget, {
  title: 'Data Icon Condition',
  thumbnail: Thumbnail,
  attributes: {
    attributeValue: { title: 'Attribute value' },
  },
  titleForContent: (content) =>
    `${content.get('attributeValue')} => ${content.get('icon')}`,
  properties: [
    'attributeValue',
    [
      'icon',
      {
        component: ({ widget }: { widget: Widget }) => (
          <ScrivitoBootstrapIconEditor
            attribute="icon"
            defaultValue="box"
            widget={widget}
          />
        ),
      },
    ],
  ],
  initialContent: {
    icon: 'bi-box',
  },
})
