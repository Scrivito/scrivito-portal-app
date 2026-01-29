import { Link, provideEditingConfig } from 'scrivito'
import { LinkWidget } from '../LinkWidget/LinkWidgetClass'
import { LinkContainerWidget } from './LinkContainerWidgetClass'
import {
  textStyleEditAttributes,
  textStyleGroup,
  textStyleInitialContent,
} from '../propertiesGroups/textStyle/textStyleEditingConfig'
import {
  paddingEditAttributes,
  paddingGroup,
} from '../propertiesGroups/padding/paddingEditingConfig'
import Thumbnail from './thumbnail.svg'

// @ts-expect-error - TODO: Remove once #12736 is fixed
provideEditingConfig(LinkContainerWidget, {
  title: 'Link List',
  thumbnail: Thumbnail,
  attributes: {
    ...paddingEditAttributes,
    ...textStyleEditAttributes,
  },
  propertiesGroups: [textStyleGroup, paddingGroup],
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
    ...textStyleInitialContent,
  },
  validations: [
    [
      'links',

      (links) => {
        if (Array.isArray(links) && links.length < 1) {
          return {
            message: 'The link list should contain at least one link.',
            severity: 'warning',
          }
        }
      },
    ],
  ],
})
