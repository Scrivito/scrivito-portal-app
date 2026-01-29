import { provideWidgetClass } from 'scrivito'
import { paddingAttributes } from '../propertiesGroups/padding/paddingAttributes'

export const SectionWidget = provideWidgetClass('SectionWidget', {
  attributes: {
    backgroundAnimateOnHover: 'boolean',
    backgroundColor: [
      'enum',
      {
        values: [
          'white',
          'primary',
          'secondary',
          'light-grey',
          'middle-grey',
          'dark-grey',
          'transparent',
          'success',
          'info',
          'warning',
          'danger',
        ],
      },
    ],
    backgroundImage: ['reference', { only: ['Image', 'Video'] }],
    content: 'widgetlist',
    showPadding: 'boolean', // deprecated by paddingTop/paddingBottom from paddingAttributes
    containerWidth: [
      'enum',
      { values: ['fixed', '95-percent', '100-percent'] },
    ],
    ...paddingAttributes,
  },
  extractTextAttributes: ['content'],
})

export type SectionWidgetInstance = InstanceType<typeof SectionWidget>
