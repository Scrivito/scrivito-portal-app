import { provideEditingConfig } from 'scrivito'
import redirectObjIcon from './thumbnail.svg'

provideEditingConfig('Redirect', {
  title: 'Redirect',
  thumbnail: redirectObjIcon,
  hideInSelectionDialogs: true,
  attributes: {
    title: {
      title: 'Title',
      description: 'Limit to 55 characters.',
    },
    link: {
      title: 'Link',
    },
    requireLogin: {
      title: 'Ensure user is logged in',
      description:
        'If checked, the user must be logged in to see the target page.',
    },
  },
  properties: ['title', 'link', 'requireLogin'],
  validations: [
    [
      'link',
      (link) => {
        if (!link) {
          return {
            message: 'The target must be set.',
            severity: 'error',
          }
        }
      },
    ],
  ],
})
