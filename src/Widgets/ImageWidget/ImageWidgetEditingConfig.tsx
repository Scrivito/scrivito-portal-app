import {
  canEdit,
  isComparisonActive,
  provideEditingConfig,
  uiContext,
  Widget,
} from 'scrivito'
import { ImageWidget } from './ImageWidgetClass'
import Thumbnail from './thumbnail.svg'
import { DimensionPicker } from '../../Components/ScrivitoExtensions/DimensionPicker'
import { ObjectFitEditor } from '../../Components/ScrivitoExtensions/ObjectFitEditor'

provideEditingConfig(ImageWidget, {
  title: 'Image',
  thumbnail: Thumbnail,
  attributes: {
    alignment: {
      title: 'Alignment',
      description: 'Default: Left',
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
    height: {
      title: 'Height',
    },
    imageFromDataItem: {
      title: 'Show image from data item?',
    },
    link: {
      title: 'Link (optional)',
      description: 'The page to open after clicking the image.',
    },
    objectFit: {
      title: 'Object fit',
      description: 'Default: Contain',
    },
    roundCorners: {
      title: 'Round corners?',
    },
    width: {
      title: 'Width',
    },
  },
  properties: (widget) => [
    'alignment',
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
  ],
  propertiesGroups: (widget) => [
    {
      title: 'Dimensions',
      properties: [
        [
          'width',
          {
            component: ({ widget }: { widget: Widget }) => (
              <DimensionPicker
                attributeValue={widget.get('width')}
                readOnly={!canEdit(widget.obj()) || isComparisonActive()}
                theme={(uiContext() || { theme: null }).theme}
                units={['px', '%']}
                updateAttributeValue={(value) =>
                  widget.update({ width: value })
                }
              />
            ),
          },
        ],
        [
          'height',
          {
            component: ({ widget }: { widget: Widget }) => (
              <DimensionPicker
                attributeValue={widget.get('height')}
                readOnly={!canEdit(widget.obj()) || isComparisonActive()}
                theme={(uiContext() || { theme: null }).theme}
                units={['px']}
                updateAttributeValue={(value) =>
                  widget.update({ height: value })
                }
              />
            ),
          },
        ],
        ...(widget.get('width')
          ? ([
              [
                'objectFit',
                {
                  component: ({ widget }: { widget: Widget }) => (
                    <ObjectFitEditor
                      attributeValue={widget.get('objectFit')}
                      readOnly={!canEdit(widget.obj()) || isComparisonActive()}
                      theme={(uiContext() || { theme: null }).theme}
                      updateAttributeValue={(value) =>
                        widget.update({ objectFit: value })
                      }
                    />
                  ),
                },
              ],
            ] as const)
          : []),
      ],
      key: 'dimensions-group',
    },
  ],
  initialContent: {
    alignment: 'left',
  },
})
