import {
  canEdit,
  isComparisonActive,
  provideEditingConfig,
  uiContext,
  Widget,
} from 'scrivito'
import { DataImageWidget } from './DataImageWidgetClass'
import Thumbnail from './thumbnail.svg'
import { DimensionPicker } from '../../Components/ScrivitoExtensions/DimensionPicker'
import { ObjectFitEditor } from '../../Components/ScrivitoExtensions/ObjectFitEditor'

provideEditingConfig(DataImageWidget, {
  title: 'Data Image',
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
    height: {
      title: 'Height',
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
    data: {
      restrictDataTo: ['itemAttribute'],
    },
  },
  properties: ['alignment', 'link', 'roundCorners'],
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
