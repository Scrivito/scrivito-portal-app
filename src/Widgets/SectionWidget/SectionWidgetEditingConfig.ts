import { provideEditingConfig } from 'scrivito'
import { SectionWidget } from './SectionWidgetClass'
import {
  paddingEditAttributes,
  paddingGroup,
} from '../propertiesGroups/padding/paddingEditingConfig'
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
      description:
        'Padding adds space around this section. Deprecated in favour of "Top" and "Bottom" in Margins group. Default: Yes',
    },
    ...paddingEditAttributes,
  },
  properties: (widget) => [
    'backgroundColor',
    'backgroundImage',
    ['backgroundAnimateOnHover', { enabled: !!widget.get('backgroundImage') }],
    'containerWidth',
    ...(!widget.get('paddingTop') && !widget.get('paddingBottom')
      ? ['showPadding']
      : []),
  ],
  propertiesGroups: [paddingGroup],
  initialContent: {
    backgroundColor: 'transparent',
    containerWidth: 'fixed',
    paddingTop: '48px', // TODO: Apply paddingTop to initial content
    paddingBottom: '48px', // TODO: Apply paddingBottom to initial content
  },
})
