import { provideWidgetClass } from 'scrivito'

export const SlideWidget = provideWidgetClass('SlideWidget', {
  onlyInside: 'SliderWidget',
  attributes: {
    background: ['reference', { only: ['Image', 'Video'] }],
    content: 'widgetlist',
    // The background color used to be an enum of theme colors; the design carries it now.
    // The background image stays an attribute of its own: a reference cannot be a design
    // property.
    design: 'design',
  },
  extractTextAttributes: ['content'],
})

export type SlideWidgetInstance = InstanceType<typeof SlideWidget>
export function isSlideWidgetInstance(
  obj: unknown,
): obj is SlideWidgetInstance {
  return obj instanceof SlideWidget
}
