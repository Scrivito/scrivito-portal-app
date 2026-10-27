import { provideWidgetClass } from 'scrivito'

export const SectionWidget = provideWidgetClass('SectionWidget', {
  attributes: {
    backgroundAnimateOnHover: 'boolean',
    backgroundImage: ['reference', { only: ['Image', 'Video'] }],
    content: 'widgetlist',
    // Background color and padding used to be attributes of their own. The background image
    // stays an attribute of its own, because a reference cannot be a design property.
    design: 'design',
    containerWidth: [
      'enum',
      { values: ['fixed', '95-percent', '100-percent'] },
    ],
  },
  extractTextAttributes: ['content'],
})

export type SectionWidgetInstance = InstanceType<typeof SectionWidget>
