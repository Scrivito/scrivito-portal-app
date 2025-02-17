import { provideEditingConfig } from 'scrivito'
import { SliderWidget } from './SliderWidgetClass'
import { SlideWidget } from '../SlideWidget/SlideWidgetClass'
import thumbnail from './thumbnail.svg'

provideEditingConfig(SliderWidget, {
  title: 'Slider',
  thumbnail,
  attributes: {
    autoplay: {
      title: 'Autoplay?',
      description: 'Default: No',
    },
    controls: {
      title: 'Show controls?',
      description: 'Shows arrows and indicators. Default: Yes',
    },
    margin: {
      title: 'Margin',
      description: 'Space below the widget. Default: "mb-4"',
    },
    minHeight: {
      title: 'Minimum height (in px)',
      description: 'Default: 400',
    },
    slides: {
      title: 'Slides',
    },
  },
  properties: (widget) => [
    'slides',
    'autoplay',
    ['controls', { enabled: widget.get('autoplay') }],
    'minHeight',
    'margin',
  ],
  initialContent: {
    controls: true,
    margin: 'mb-4',
    minHeight: 400,
    slides: [new SlideWidget({}), new SlideWidget({})],
  },
})
