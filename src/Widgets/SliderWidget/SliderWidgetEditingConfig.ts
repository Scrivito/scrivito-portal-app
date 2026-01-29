import { provideEditingConfig } from 'scrivito'
import { SliderWidget } from './SliderWidgetClass'
import { SlideWidget } from '../SlideWidget/SlideWidgetClass'
import {
  paddingEditAttributes,
  paddingGroup,
} from '../propertiesGroups/padding/paddingEditingConfig'
import thumbnail from './thumbnail.svg'

provideEditingConfig(SliderWidget, {
  title: 'Slider',
  thumbnail,
  attributes: {
    autoplay: {
      title: 'Autoplay?',
      description: 'Default: No',
    },
    autoplayInterval: {
      title: 'Time between slides (in seconds)',
      description: 'Default: 5 seconds',
    },
    controls: {
      title: 'Show controls?',
      description: 'Shows arrows and indicators. Default: Yes',
    },
    margin: {
      title: 'Margin',
      description:
        'Space below the widget. Deprecated in favour of "Bottom" in Margins group. Default: mb-4',
    },
    minHeight: {
      title: 'Minimum height (in px)',
      description:
        'Maintains consistent slide appearance when content varies in height. Default: 400',
    },
    slides: {
      title: 'Slides',
    },
    ...paddingEditAttributes,
  },
  properties: ['slides', 'minHeight'],
  propertiesGroups: (widget) => [
    {
      title: 'Autoplay',
      key: 'autoplay-group',
      properties: [
        'autoplay',
        ['autoplayInterval', { enabled: widget.get('autoplay') }],
        ['controls', { enabled: widget.get('autoplay') }],
      ],
    },
    ...(!widget.get('paddingBottom')
      ? [
          {
            title: 'Margin',
            key: 'margin-group',
            properties: ['margin'],
          },
        ]
      : []),
    paddingGroup,
  ],
  initialContent: {
    autoplayInterval: 5,
    controls: true,
    minHeight: 400,
    slides: [new SlideWidget({}), new SlideWidget({})],
    paddingBottom: '8px', // TODO: Apply paddingBottom to initial content
  },
})
