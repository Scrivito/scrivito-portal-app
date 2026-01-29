import { provideEditingConfig } from 'scrivito'
import { BannerHeadlineWidget } from './BannerHeadlineWidgetClass'
import {
  textStyleEditAttributes,
  textStyleGroup,
  textStyleInitialContent,
} from '../propertiesGroups/textStyle/textStyleEditingConfig'
import Thumbnail from './thumbnail.svg'

// @ts-expect-error - TODO: Remove once #12736 is fixed
provideEditingConfig(BannerHeadlineWidget, {
  title: 'Banner Headline',
  thumbnail: Thumbnail,
  attributes: {
    backgroundColor: {
      title: 'Background color',
      description: 'Default: White',
      values: [
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
    style: {
      title: 'Style',
      description: 'Default: Heading 2',
      values: [
        { value: 'h1', title: 'Heading 1' },
        { value: 'h2', title: 'Heading 2' },
        { value: 'h3', title: 'Heading 3' },
        { value: 'h4', title: 'Heading 4' },
        { value: 'h5', title: 'Heading 5' },
        { value: 'h6', title: 'Heading 6' },
        { value: 'display-1', title: 'Display heading 1' },
        { value: 'display-2', title: 'Display heading 2' },
        { value: 'display-3', title: 'Display heading 3' },
        { value: 'display-4', title: 'Display heading 4' },
        { value: 'display-5', title: 'Display heading 5' },
        { value: 'display-6', title: 'Display heading 6' },
      ],
    },
    level: {
      title: 'Heading tag (optional)',
      description:
        'May be used for SEO, for generating a table of contents,' +
        ' or for improving accessibility. Default: Derived from Style',
      values: [
        { value: 'h1', title: 'h1' },
        { value: 'h2', title: 'h2' },
        { value: 'h3', title: 'h3' },
        { value: 'h4', title: 'h4' },
        { value: 'h5', title: 'h5' },
        { value: 'h6', title: 'h6' },
      ],
    },
    ...textStyleEditAttributes,
  },
  properties: ['style', 'level', 'backgroundColor'],
  propertiesGroups: [textStyleGroup],
  initialContent: {
    backgroundColor: 'white',
    headline: 'Headline',
    style: 'h2',
    ...textStyleInitialContent,
  },
})
