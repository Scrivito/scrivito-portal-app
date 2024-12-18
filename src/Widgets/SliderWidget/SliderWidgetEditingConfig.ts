import { provideEditingConfig } from 'scrivito'
import { SliderWidget } from './SliderWidgetClass'
import { SlideWidget } from '../SlideWidget/SlideWidgetClass'

provideEditingConfig(SliderWidget, {
  title: 'Slider',
  attributes: {
    autoPlay: {
      title: 'Auto play?',
      description: 'Default: No',
    },
    controls: {
      title: 'Show controls?',
      description: 'Shows arrows and indicators. Default: Yes',
    },
    slides: {
      title: 'Slides',
    },
  },
  properties: ['slides', 'controls', 'autoPlay'],
  initialContent: {
    controls: true,
    slides: [new SlideWidget({}), new SlideWidget({})],
  },
  validations: [
    [
      'controls',
      (controls, { widget }) => {
        if (!controls && !widget.get('autoPlay')) {
          return {
            message: 'Either show controls or enable auto play.',
            severity: 'error',
          }
        }
      },
    ],
  ],
})
