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
      description: 'Default: 150%',
      values: [
        { value: 'bi-1x', title: '100%' },
        { value: 'bi-2x', title: '150%' },
        { value: 'bi-3x', title: '200%' },
        { value: 'bi-4x', title: '250%' },
        { value: 'bi-5x', title: '300%' },
      ],
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
          defaultValue="question-octagon"
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
