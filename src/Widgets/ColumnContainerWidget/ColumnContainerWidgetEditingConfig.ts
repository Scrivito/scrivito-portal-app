import * as Scrivito from 'scrivito'
import { ColumnContainerWidget } from './ColumnContainerWidgetClass'
import { ColumnsEditorTab } from './ColumnsEditorTab'
import { ColumnWidget } from '../ColumnWidget/ColumnWidgetClass'

Scrivito.provideEditingConfig(ColumnContainerWidget, {
  title: 'Columns',
  propertiesGroups: [
    {
      title: 'Columns layout',
      key: 'columns-layout-group',

      // Cast is a working around for issue #9925
      // TODO: remove work around
      component: ColumnsEditorTab as unknown as null,
    },
  ],
  initialContent: {
    columns: [
      new ColumnWidget({ colSize: 4 }),
      new ColumnWidget({ colSize: 4 }),
      new ColumnWidget({ colSize: 4 }),
    ],
    alignment: 'start',
  },
})
