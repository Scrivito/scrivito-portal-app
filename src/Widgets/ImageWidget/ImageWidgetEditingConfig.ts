import { provideEditingConfig } from 'scrivito'
import { ImageWidget } from './ImageWidgetClass'
import Thumbnail from './thumbnail.svg'
import { ImageDimensionsEditor } from '../../Components/ScrivitoExtensions/ImageDimensionsEditor'
import { getCurrentPreviewSize } from '../../utils/getCurrentPreviewSize'

provideEditingConfig(ImageWidget, {
  title: 'Image',
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
    alternativeText: {
      title: 'Alternative text (optional)',
      description:
        'Text that helps visually impaired users understand the purpose or function of the image.' +
        ' If empty, the alternative text of the image is used.',
    },
    attributeName: {
      title: 'Data item attribute name',
    },
    imageFromDataItem: {
      title: 'Show image from data item?',
    },
    link: {
      title: 'Link (optional)',
      description: 'The page to open after clicking the image.',
    },
    roundCorners: {
      title: 'Round corners?',
    },
  },
  properties: (widget) => {
    const alignmentProperty =
      getCurrentPreviewSize() === 'desktop' ||
      getCurrentPreviewSize() === 'laptop'
        ? 'alignment'
        : getCurrentPreviewSize() === 'tablet'
          ? 'alignmentTablet'
          : 'alignmentMobile'

    return [
      alignmentProperty,
      'alternativeText',
      'link',
      [
        'roundCorners',
        {
          enabled:
            (widget.obj().ancestors()[0] || widget.obj()).get(
              'siteBorderRadius',
            ) !== '0px',
        },
      ],
    ]
  },
  propertiesGroups: [
    {
      title: 'Dimensions',
      properties: [
        'height',
        'heightTablet',
        'heightMobile',
        'objectFit',
        'objectFitTablet',
        'objectFitMobile',
        'width',
        'widthTablet',
        'widthMobile',
      ],
      component: ImageDimensionsEditor,
      key: 'dimensions-group',
    },
  ],
  initialContent: {
    alignment: 'left',
  },
})
