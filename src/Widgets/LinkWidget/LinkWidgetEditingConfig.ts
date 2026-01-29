import { provideEditingConfig } from 'scrivito'
import { LinkWidget } from './LinkWidgetClass'
import {
  textStyleEditAttributes,
  textStyleGroup,
  textStyleInitialContent,
} from '../propertiesGroups/textStyle/textStyleEditingConfig'
import Thumbnail from './thumbnail.svg'

// @ts-expect-error - TODO: Remove once #12736 is fixed
provideEditingConfig(LinkWidget, {
  title: 'Link List Item',
  thumbnail: Thumbnail,
  attributes: {
    link: {
      title: 'Link',
      description:
        "If no title is given, the obj's title or the external URl will be shown.",
    },
    ...textStyleEditAttributes,
  },
  properties: ['link'],
  propertiesGroups: [textStyleGroup],
  initialContent: {
    ...textStyleInitialContent,
  },
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
