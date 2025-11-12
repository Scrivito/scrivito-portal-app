import {
  canEdit,
  isComparisonActive,
  provideEditingConfig,
  uiContext,
  Widget,
} from 'scrivito'
import { ColumnContainerWidget } from './ColumnContainerWidgetClass'
import { ColumnsEditorTab } from './ColumnsEditorTab'
import { ColumnWidget } from '../ColumnWidget/ColumnWidgetClass'
import { AlignmentEditor } from '../../Components/ScrivitoExtensions/AlignmentEditor'
import Thumbnail from './thumbnail.svg'
import { InvertedBooleanEditor } from '../../Components/ScrivitoExtensions/InvertedBooleanEditor'

provideEditingConfig(ColumnContainerWidget, {
  title: 'Columns',
  thumbnail: Thumbnail,
  attributes: {
    alignment: {
      title: 'Alignment',
      description: 'Default: Start',
    },
    layoutMode: {
      title: 'Display mode',
      values: [
        { value: 'grid', title: 'Grid' },
        { value: 'flex', title: 'Flex' },
      ],
      description: 'Default: Grid',
    },
    disableGutters: {
      title: 'Show gutters?',
      description: 'Gutters are the spaces between columns in a layout.',
    },
    disableResponsiveAdaption: {
      title: 'Responsive adaption?',
    },
  },
  properties: [
    [
      'alignment',
      {
        component: ({ widget }: { widget: Widget }) => (
          <AlignmentEditor
            attributeValue={widget.get('alignment')}
            readOnly={!canEdit(widget.obj()) || isComparisonActive()}
            theme={(uiContext() || { theme: null }).theme}
            updateAttributeValue={(value) =>
              widget.update({ alignment: value })
            }
          />
        ),
      },
    ],
    'layoutMode',
    [
      'disableResponsiveAdaption',
      {
        component: ({ widget }: { widget: Widget }) => (
          <InvertedBooleanEditor
            attributeValue={widget.get('disableResponsiveAdaption') === true}
            readOnly={!canEdit(widget.obj()) || isComparisonActive()}
            theme={(uiContext() || { theme: null }).theme}
            updateAttributeValue={(value) =>
              widget.update({ disableResponsiveAdaption: value })
            }
          />
        ),
      },
    ],
    [
      'disableGutters',
      {
        component: ({ widget }: { widget: Widget }) => (
          <InvertedBooleanEditor
            attributeValue={widget.get('disableGutters') === true}
            readOnly={!canEdit(widget.obj()) || isComparisonActive()}
            theme={(uiContext() || { theme: null }).theme}
            updateAttributeValue={(value) =>
              widget.update({ disableGutters: value })
            }
          />
        ),
      },
    ],
  ],
  propertiesGroups: [
    {
      title: 'Columns layout',
      key: 'columns-layout-group',
      component: ColumnsEditorTab,
      properties: ['columns'],
    },
  ],
  initialContent: {
    columns: [
      new ColumnWidget({ colSize: 4, flexGrow: true }),
      new ColumnWidget({ colSize: 4, flexGrow: true }),
      new ColumnWidget({ colSize: 4, flexGrow: true }),
    ],
    alignment: 'start',
    layoutMode: 'grid',
  },
})
