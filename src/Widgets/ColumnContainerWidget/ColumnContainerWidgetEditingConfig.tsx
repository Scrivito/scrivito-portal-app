import {
  canEdit,
  isComparisonActive,
  provideEditingConfig,
  Widget,
} from 'scrivito'
import { ColumnContainerWidget } from './ColumnContainerWidgetClass'
import { ColumnsEditorTab } from './ColumnsEditorTab'
import { ColumnWidget } from '../ColumnWidget/ColumnWidgetClass'
import { AdvancedEnumEditor } from '../../Components/ScrivitoExtensions/AdvancedEnumEditor'
import startSvg from './alignment-start.svg'
import centerSvg from './alignment-center.svg'
import endSvg from './alignment-end.svg'
import stretchSvg from './alignment-stretch.svg'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(ColumnContainerWidget, {
  title: 'Columns',
  thumbnail: Thumbnail,
  attributes: {
    alignment: {
      title: 'Alignment',
      description: 'Default: Top',
    },
    layoutMode: {
      title: 'Display mode',
      values: [
        { value: 'grid', title: 'Grid' },
        { value: 'flex', title: 'Flex' },
      ],
      description: 'Default: Grid',
    },
  },
  properties: [
    [
      'alignment',
      {
        component: ({ widget }: { widget: Widget }) => (
          <AdvancedEnumEditor
            attributeValue={widget.get('alignment')}
            options={[
              {
                value: 'start',
                title: 'Top',
                icon: startSvg,
              },
              {
                value: 'center',
                title: 'Center',
                icon: centerSvg,
              },
              {
                value: 'end',
                title: 'Bottom',
                icon: endSvg,
              },
              {
                value: 'stretch',
                title: 'Stretch (full height)',
                description: 'Only works with one box widget inside a column.',
                icon: stretchSvg,
              },
            ]}
            readOnly={!canEdit(widget.obj()) || isComparisonActive()}
            updateAttributeValue={(value: string) =>
              widget.update({ alignment: value })
            }
          />
        ),
      },
    ],
    'layoutMode',
  ],
  propertiesGroups: [
    {
      title: 'Columns layout',
      key: 'columns-layout-group',
      component: ColumnsEditorTab,
      properties: ['columns', 'disableGutters', 'disableResponsiveAdaption'],
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
