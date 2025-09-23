import { provideEditingConfig } from 'scrivito'
import { TextWidget } from './TextWidgetClass'
import Thumbnail from './thumbnail.svg'
import { getCurrentPreviewSize } from '../../utils/getCurrentPreviewSize'

provideEditingConfig(TextWidget, {
  title: 'Text',
  thumbnail: Thumbnail,
  attributes: {
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
    text: {
      title: 'Content',
    },
  },
  properties: () =>
    [
      getCurrentPreviewSize() === 'desktop' ||
      getCurrentPreviewSize() === 'laptop'
        ? 'alignment'
        : null,
      getCurrentPreviewSize() === 'tablet' ? 'alignmentTablet' : null,
      getCurrentPreviewSize() === 'mobile' ? 'alignmentMobile' : null,
      'text',
    ].filter((p): p is string => typeof p === 'string'),
  initialContent: {
    alignment: 'left',
    text: 'Text',
  },
})
