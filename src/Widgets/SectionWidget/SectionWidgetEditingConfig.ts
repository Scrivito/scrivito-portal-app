import { provideEditingConfig } from 'scrivito'
import { SectionWidget } from './SectionWidgetClass'
import Thumbnail from './thumbnail.svg'
import { SectionBackgroundColorPicker } from './SectionBackgroundColorPicker'

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
    containerWidth: {
      title: 'Container width',
      description: 'Default: fixed',
      values: [
        { value: 'fixed', title: 'fixed' },
        { value: '95-percent', title: '95%' },
        { value: '100-percent', title: '100%' },
      ],
    },
    customBackgroundColor: {
      title: 'Custom background color',
      description: 'Only visible when "Custom color" is selected',
    },
    showPadding: {
      title: 'Padding',
      description: 'Padding adds space around this section. Default: Yes',
    },
  },
  propertiesGroups: (widget) => [
    {
      title: 'Background',
      properties: [
        'backgroundColor',
        'backgroundImage',
        [
          'backgroundAnimateOnHover',
          { enabled: !!widget.get('backgroundImage') },
        ],
      ],
      key: 'section-background-group',
    },
    {
      title: 'Custom Color',
      component: SectionBackgroundColorPicker,
      properties: ['customBackgroundColor'],
      key: 'section-custom-color-group',
    },
    {
      title: 'Layout',
      properties: ['containerWidth', 'showPadding'],
      key: 'section-layout-group',
    },
  ],
  initialContent: {
    backgroundColor: 'transparent',
    containerWidth: 'fixed',
    showPadding: true,
  },
})
