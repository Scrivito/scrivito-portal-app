import { provideEditingConfig } from 'scrivito'
import { ColumnContainerWidget } from './ColumnContainerWidgetClass'
import { ColumnsEditorTab } from './ColumnsEditorTab'
import { ColumnWidget } from '../ColumnWidget/ColumnWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(ColumnContainerWidget, {
  title: 'Columns',
  thumbnail: Thumbnail,
  attributes: {
    disableResponsiveAdaption: {
      title: 'Disable responsive adaption?',
    },
  },
  propertiesGroups: [
    {
      title: 'Columns layout',
      key: 'columns-layout-group',

      // Cast is a working around for issue #9925
      // TODO: remove work around
      component: ColumnsEditorTab as unknown as null,
    },

    {
      title: 'Responsive Adaptions',
      key: 'responsive-adaptions',
      properties: ['disableResponsiveAdaption'],
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
