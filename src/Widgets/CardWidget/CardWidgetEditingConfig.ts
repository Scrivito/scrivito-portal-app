import { provideEditingConfig } from 'scrivito'
import { CardWidget } from './CardWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(CardWidget, {
  title: 'Card',
  thumbnail: Thumbnail,
  attributes: {
    backgroundAnimateOnHover: {
      title: 'Animate background on hover?',
      description: 'Default: No',
    },
    backgroundColor: {
      title: 'Background color',
      description: 'Default: White',
      values: [
        { value: 'transparent', title: 'Transparent' },
        { value: 'white', title: 'White' },
        { value: 'primary', title: 'Primary color' },
        { value: 'secondary', title: 'Secondary color' },
        { value: 'custom', title: 'Custom' },
        { value: 'light-grey', title: 'Light grey' },
        { value: 'middle-grey', title: 'Grey' },
        { value: 'dark-grey', title: 'Dark grey' },
        { value: 'success', title: 'Success' },
        { value: 'info', title: 'Info' },
        { value: 'warning', title: 'Warning' },
        { value: 'danger', title: 'Danger' },
      ],
    },
    backgroundColorCustom: {
      title: 'Custom background color',
      editor: 'colorPicker',
    },
    backgroundImage: {
      title: 'Background image or video',
    },
    image: { title: 'Top image' },
    cardExtended: {
      title: 'Card extended',
      description: 'Only works in column widgets',
    },
    padding: {
      title: 'Padding',
      description: 'Inner space. Default: p-4',
    },
    margin: {
      title: 'Margin',
      description: 'Space below the widget. Default: mb-4',
    },
  },
  properties: (widget) =>
    [
      'linkTo',
      'image',
      'backgroundColor',
      widget.get('backgroundColor') === 'custom'
        ? 'backgroundColorCustom'
        : null,
      'backgroundImage',
      [
        'backgroundAnimateOnHover',
        { enabled: !!widget.get('backgroundImage') },
      ],
      'cardExtended',
      'padding',
      'margin',
      'showFooter',
    ].filter((p): p is string => typeof p === 'string'),
  initialContent: {
    backgroundColor: 'white',
    margin: 'mb-4',
    padding: 'p-4',
  },
})
