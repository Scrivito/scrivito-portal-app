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
  },
  properties: ['title', 'link'],
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
