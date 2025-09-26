import { provideEditingConfig } from 'scrivito'
import { SectionWidget } from './SectionWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(SectionWidget, {
  title: 'Section',
  thumbnail: Thumbnail,
  attributes: {
    backgroundAnimateOnHover: {
      title: 'Animate background on hover?',
      description: 'Default: No',
    },
    backgroundColor: {
      title: 'Background color',
      description: 'Default: Transparent',
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
    containerWidth: {
      title: 'Container width',
      description: 'Default: fixed',
      values: [
        { value: 'fixed', title: 'fixed' },
        { value: '95-percent', title: '95%' },
        { value: '100-percent', title: '100%' },
      ],
    },
    showPadding: {
      title: 'Padding',
      description: 'Padding adds space around this section. Default: Yes',
    },
  },
  properties: (widget) =>
    [
      'backgroundColor',
      widget.get('backgroundColor') === 'custom'
        ? 'backgroundColorCustom'
        : null,
      'backgroundImage',
      [
        'backgroundAnimateOnHover',
        { enabled: !!widget.get('backgroundImage') },
      ],
      'containerWidth',
      'showPadding',
    ].filter((p): p is string => typeof p === 'string'),
  initialContent: {
    backgroundColor: 'transparent',
    containerWidth: 'fixed',
    showPadding: true,
  },
})
