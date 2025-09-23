import { provideEditingConfig } from 'scrivito'
import { HeadlineWidget } from './HeadlineWidgetClass'
import Thumbnail from './thumbnail.svg'
import { getCurrentPreviewSize } from '../../utils/getCurrentPreviewSize'

provideEditingConfig(HeadlineWidget, {
  title: 'Headline',
  thumbnail: Thumbnail,
  attributes: {
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
        { value: 'label-headline', title: 'Label heading' },
        { value: 'label-subtitle', title: 'Label subtitle' },
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
        { value: 'div', title: 'No semantic tag' },
      ],
    },
    alignment: {
      title: 'Alignment (Desktop & Laptop)',
      description: 'Default: Left',
      values: [
        { value: 'left', title: 'Left' },
        { value: 'center', title: 'Center' },
        { value: 'right', title: 'Right' },
      ],
    },
    alignmentTablet: {
      title: 'Alignment (Tablet)',
      description: 'Alignment on tablets',
      values: [
        { value: 'left', title: 'Left' },
        { value: 'center', title: 'Center' },
        { value: 'right', title: 'Right' },
      ],
    },
    alignmentMobile: {
      title: 'Alignment (Mobile)',
      description: 'Alignment on mobile devices',
      values: [
        { value: 'left', title: 'Left' },
        { value: 'center', title: 'Center' },
        { value: 'right', title: 'Right' },
      ],
    },
    margin: {
      title: 'Margin (Desktop & Laptop)',
      description: 'Space below the widget. Default: mb-2',
    },
    marginTablet: {
      title: 'Margin (Tablet)',
      description: 'Space below the widget on tablets',
    },
    marginMobile: {
      title: 'Margin (Mobile)',
      description: 'Space below the widget on mobile devices',
    },
    uppercase: { title: 'Uppercase?', description: 'Default: No' },
  },
  properties: () =>
    [
      'style',
      'level',
      getCurrentPreviewSize() === 'desktop' ||
      getCurrentPreviewSize() === 'laptop'
        ? 'alignment'
        : null,
      getCurrentPreviewSize() === 'tablet' ? 'alignmentTablet' : null,
      getCurrentPreviewSize() === 'mobile' ? 'alignmentMobile' : null,
      getCurrentPreviewSize() === 'desktop' ||
      getCurrentPreviewSize() === 'laptop'
        ? 'margin'
        : null,
      getCurrentPreviewSize() === 'tablet' ? 'marginTablet' : null,
      getCurrentPreviewSize() === 'mobile' ? 'marginMobile' : null,
      'uppercase',
    ].filter((p): p is string => typeof p === 'string'),
  initialContent: {
    alignment: 'left',
    headline: 'Headline',
    margin: 'mb-2',
    style: 'h2',
  },
  validations: [
    [
      'headline',

      (headline) => {
        if (!headline) {
          return { message: 'The headline must be set.', severity: 'error' }
        }
      },
    ],
  ],
})
