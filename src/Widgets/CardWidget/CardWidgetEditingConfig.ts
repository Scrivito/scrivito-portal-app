import { provideEditingConfig } from 'scrivito'
import { CardWidget } from './CardWidgetClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(CardWidget, {
  title: 'Card',
  thumbnail: Thumbnail,
  attributes: {
    backgroundColor: {
      title: 'Background color',
      description: 'Default: Light grey',
      values: [
        { value: 'transparent', title: 'Transparent' },
        { value: 'white', title: 'White' },
        { value: 'primary', title: 'Primary color' },
        { value: 'secondary', title: 'Secondary color' },
        { value: 'light-grey', title: 'Light grey' },
        { value: 'middle-grey', title: 'Grey' },
        { value: 'dark-grey', title: 'Dark grey' },
        { value: 'success', title: 'Success' },
        { value: 'info', title: 'Info' },
        { value: 'warning', title: 'Warning' },
        { value: 'danger', title: 'Danger' },
      ],
    },
    image: { title: 'Top image' },
    cardExtended: {
      title: 'Card extended',
      description: 'Only works in column widgets',
    },
    padding: {
      title: 'Padding',
      description: 'Inner space. Default: "p-4"',
    },
    margin: {
      title: 'Margin',
      description: 'Outer space to next item (bottom). Default: "mb-4"',
    },
  },
  properties: (widget) => [
    'linkTo',
    'image',
    'backgroundColor',
    'backgroundImage',
    ['backgroundAnimateOnHover', { enabled: !!widget.get('backgroundImage') }],
    'cardExtended',
    'padding',
    'margin',
    'showFooter',
  ],
  initialContent: {
    backgroundColor: 'light-grey',
    margin: 'mb-4',
    padding: 'p-4',
  },
})
