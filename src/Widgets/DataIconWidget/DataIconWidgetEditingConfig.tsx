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
