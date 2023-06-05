import * as Scrivito from 'scrivito'
import { SectionWidget } from './SectionWidgetClass'

Scrivito.provideEditingConfig(SectionWidget, {
  title: 'Section',
  attributes: {
    backgroundAnimateOnHover: {
      title: 'Animate background on hover',
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
      ],
    },
    backgroundImage: {
      title: 'Background image',
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
  properties: (widget: InstanceType<typeof SectionWidget>) => [
    'backgroundColor',
    'backgroundImage',
    ['backgroundAnimateOnHover', { enabled: !!widget.get('backgroundImage') }],
    'containerWidth',
    'showPadding',
  ],
  initialContent: {
    backgroundColor: 'transparent',
    containerWidth: 'fixed',
    showPadding: true,
  },
})
