import { provideEditingConfig } from 'scrivito'
import { VerticalNavigationWidget } from './VerticalNavigationWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(VerticalNavigationWidget, {
  title: 'Vertical Navigation',
  thumbnail: Thumbnail,
  attributes: {
    navigationDepth: {
      title: 'Navigation depth',
      description: 'Default: Top-level only',
      values: [
        { value: '0', title: 'Top-level only' },
        { value: '1', title: 'Two levels' },
        { value: '2', title: 'Three levels' },
      ],
    },
    showParentLink: {
      title: 'Show link to parent page?',
      description: 'Default: No',
    },
  },
  properties: ['showParentLink', 'navigationDepth'],
  initialContent: { navigationDepth: '0' },
})
