import { provideWidgetClass } from 'scrivito'

export const SlideWidget = provideWidgetClass('SlideWidget', {
  onlyInside: 'SliderWidget',
  attributes: {
    background: ['reference', { only: ['Image', 'Video'] }],
    content: 'widgetlist',
    // The background color used to be an enum of theme colors; the design carries it now.
    // The background image is not a design property — a reference cannot be one — but it
    // belongs next to the design, as it does on a section.
    design: [
      'design',
      { preset: 'container', extraAttributes: ['background'] },
    ],
  },
  extractTextAttributes: ['content'],
})

export type SlideWidgetInstance = InstanceType<typeof SlideWidget>
export function isSlideWidgetInstance(
  obj: unknown,
): obj is SlideWidgetInstance {
  return obj instanceof SlideWidget
}
