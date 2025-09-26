import { provideEditingConfig } from 'scrivito'
import { CardWidget } from './CardWidgetClass'
import Thumbnail from './thumbnail.svg'
import { CardBackgroundColorPicker } from './CardBackgroundColorPicker'

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
        { value: 'light-grey', title: 'Light grey' },
        { value: 'middle-grey', title: 'Grey' },
        { value: 'dark-grey', title: 'Dark grey' },
        { value: 'success', title: 'Success' },
        { value: 'info', title: 'Info' },
        { value: 'warning', title: 'Warning' },
        { value: 'danger', title: 'Danger' },
        { value: 'custom', title: 'Custom color' },
      ],
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
    customBackgroundColor: {
      title: 'Custom background color',
      description: 'Only visible when "Custom color" is selected',
    },
  },
  propertiesGroups: () => [
    {
      title: 'General',
      properties: [
        'linkTo',
        'image',
        'cardExtended',
        'padding',
        'margin',
        'showFooter',
      ],
      key: 'card-general-group',
    },
    {
      title: 'Background',
      properties: [
        'backgroundColor',
        'backgroundImage',
        'backgroundAnimateOnHover',
        // [
        //   'backgroundAnimateOnHover',
        //   { enabled: !!widget.get('backgroundImage') },
        // ],
      ],
      key: 'card-background-group',
    },
    {
      title: 'Custom Color',
      component: CardBackgroundColorPicker,
      properties: ['customBackgroundColor'],
      key: 'card-custom-color-group',
    },
  ],
  initialContent: {
    backgroundColor: 'white',
    margin: 'mb-4',
    padding: 'p-4',
  },
})
