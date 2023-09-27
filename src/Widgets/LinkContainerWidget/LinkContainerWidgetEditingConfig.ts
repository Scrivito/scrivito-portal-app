import { Link, provideEditingConfig } from 'scrivito'
import { LinkWidget } from '../LinkWidget/LinkWidgetClass'
import { LinkContainerWidget } from './LinkContainerWidgetClass'

provideEditingConfig(LinkContainerWidget, {
  title: 'Link List',
  attributes: {
    headline: {
      title: 'Headline',
      description: 'Leave empty to not show a headline.',
    },
  },
  properties: ['headline'],
  initialContent: {
    headline: 'Links headline',
    links: ['Link 1', 'Link 2', 'Link 3'].map(
      (title) =>
        new LinkWidget({
          link: new Link({
            title,
            url: 'https://scrivito.com',
            target: '_blank',
          }),
        }),
    ),
  },
  validations: [
    [
      'links',

      (links) => {
        if (typeof links === 'string' && links.length < 1) {
          return {
            message: 'The link list should contain at least one link.',
            severity: 'warning',
          }
        }
      },
    ],
  ],
})
