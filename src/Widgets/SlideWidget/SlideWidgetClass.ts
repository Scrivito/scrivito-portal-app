import { provideWidgetClass } from 'scrivito'

export const SlideWidget = provideWidgetClass('SlideWidget', {
  onlyInside: 'SliderWidget',
  attributes: {
    background: ['reference', { only: ['Image', 'Video'] }],
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
    content: 'widgetlist',
  },
  extractTextAttributes: ['content'],
})

export type SlideWidgetInstance = InstanceType<typeof SlideWidget>
export function isSlideWidgetInstance(
  obj: unknown,
): obj is SlideWidgetInstance {
  return obj instanceof SlideWidget
}
