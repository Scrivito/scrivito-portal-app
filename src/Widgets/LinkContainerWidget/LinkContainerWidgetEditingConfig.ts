import { Link, provideEditingConfig } from 'scrivito'
import { LinkWidget } from '../LinkWidget/LinkWidgetClass'
import { LinkContainerWidget } from './LinkContainerWidgetClass'

provideEditingConfig(LinkContainerWidget, {
  title: 'Link List',
  initialContent: {
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
