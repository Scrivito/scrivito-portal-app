import { provideWidgetClass } from 'scrivito'

export const SectionWidget = provideWidgetClass('SectionWidget', {
  attributes: {
    backgroundAnimateOnHover: 'boolean',
    backgroundImage: ['reference', { only: ['Image', 'Video'] }],
    content: 'widgetlist',
    // Background color and padding used to be attributes of their own. The background image is
    // not a design property — a reference cannot be one — but it belongs next to the design.
    design: [
      'design',
      {
        kind: 'container',
        extraAttributes: ['backgroundImage', 'backgroundAnimateOnHover'],
      },
    ],
    containerWidth: [
      'enum',
      { values: ['fixed', '95-percent', '100-percent'] },
    ],
  },
  extractTextAttributes: ['content'],
})

export type SectionWidgetInstance = InstanceType<typeof SectionWidget>
