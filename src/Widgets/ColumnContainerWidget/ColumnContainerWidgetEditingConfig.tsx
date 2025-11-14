import {
  canEdit,
  isComparisonActive,
  provideEditingConfig,
  uiContext,
  Widget,
} from 'scrivito'
import { ColumnContainerWidget } from './ColumnContainerWidgetClass'
import { ColumnsEditor } from './ColumnsEditor'
import { ColumnWidget } from '../ColumnWidget/ColumnWidgetClass'
import { AdvancedEnumEditor } from '../../Components/ScrivitoExtensions/AdvancedEnumEditor'
import startSvg from '../../Components/ScrivitoExtensions/AlignmentEditor/alignment-start.svg'
import centerSvg from '../../Components/ScrivitoExtensions/AlignmentEditor/alignment-center.svg'
import endSvg from '../../Components/ScrivitoExtensions/AlignmentEditor/alignment-end.svg'
import stretchSvg from '../../Components/ScrivitoExtensions/AlignmentEditor/alignment-stretch.svg'
import Thumbnail from './thumbnail.svg'
import { InvertedBooleanEditor } from '../../Components/ScrivitoExtensions/InvertedBooleanEditor'

provideEditingConfig(ColumnContainerWidget, {
  title: 'Columns',
  thumbnail: Thumbnail,
  attributes: {
    alignment: {
      title: 'Alignment',
      description: 'Default: Top',
    },
    columns: {
      title: 'Layout (desktop)',
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
            theme={(uiContext() || { theme: null }).theme}
            updateAttributeValue={(value: string) =>
              widget.update({ alignment: value })
            }
          />
        ),
      },
    ],
    'layoutMode',
    [
      'columns',
      {
        component: ({ widget }: { widget: Widget }) => (
          <ColumnsEditor
            readOnly={!canEdit(widget.obj()) || isComparisonActive()}
            theme={(uiContext() || { theme: null }).theme}
            widget={widget}
          />
        ),
      },
    ],
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
