import { provideEditingConfig } from 'scrivito'
import { DataIconWidget } from './DataIconWidgetClass'
import Thumbnail from './thumbnail.svg'
import { ScrivitoBootstrapIconEditor } from 'scrivito-icon-editor'
import { DataIconConditionWidgetInstance } from '../DataIconConditionWidget/DataIconConditionWidgetClass'

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
    data: {
      restrictDataTo: ['itemAttribute'],
    },
  },
  properties: ['size', 'alignment', 'conditions'],
  propertiesGroups: [
    {
      title: 'Fallback icon',
      component: (props: { widget: DataIconConditionWidgetInstance }) => (
        <ScrivitoBootstrapIconEditor
          attribute="fallbackIcon"
          description="This icon is used if no condition is met."
          {...props}
        />
      ),
      properties: ['fallbackIcon'],
      key: 'icon-group',
    },
  ],
  initialContent: {
    alignment: 'left',
    fallbackIcon: 'bi-question-octagon',
    label: 'Label',
    size: 'bi-2x',
  },
})
