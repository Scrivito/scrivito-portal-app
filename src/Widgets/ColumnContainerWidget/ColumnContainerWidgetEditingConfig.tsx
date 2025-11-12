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

provideEditingConfig(ColumnContainerWidget, {
  title: 'Columns',
  thumbnail: Thumbnail,
  attributes: {
    alignment: {
      title: 'Alignment',
      description: 'Default: Start',
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
  ],
  propertiesGroups: [
    {
      title: 'Columns layout',
      key: 'columns-layout-group',
      component: ColumnsEditorTab,
      properties: [
        'columns',
        'disableGutters',
        'disableResponsiveAdaption',
        'layoutMode',
      ],
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
