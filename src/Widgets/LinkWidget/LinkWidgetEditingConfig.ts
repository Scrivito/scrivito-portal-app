import { provideEditingConfig } from 'scrivito'
import { LinkWidget } from './LinkWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(LinkWidget, {
  title: 'Link List Item',
  thumbnail: Thumbnail,
  attributes: {
    link: {
      title: 'Link',
      description:
        "If no title is given, the obj's title or the external URl will be shown.",
    },
  },
  properties: ['link'],
  validations: [
    [
      'link',

      (link) => {
        if (!link) {
          return { message: 'The link should be set.', severity: 'warning' }
        }
      },
    ],
  ],
})
