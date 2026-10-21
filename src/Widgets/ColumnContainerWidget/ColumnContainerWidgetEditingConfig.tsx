import {
  canEdit,
  Design,
  isComparisonActive,
  provideEditingConfig,
  Widget,
} from 'scrivito'
import {
  ColumnContainerWidget,
  ColumnContainerWidgetInstance,
} from './ColumnContainerWidgetClass'
import { ColumnsEditor } from './ColumnsEditor'
import { ColumnWidget } from '../ColumnWidget/ColumnWidgetClass'
import Thumbnail from './thumbnail.svg'
import { InvertedBooleanEditor } from '../../Components/ScrivitoExtensions/InvertedBooleanEditor'

provideEditingConfig(ColumnContainerWidget, {
  title: 'Columns',
  description: 'Arranges content side by side in up to 6 columns.',
  thumbnail: Thumbnail,
  attributes: {
    columns: {
      title: 'Layout (desktop)',
    },
    disableResponsiveAdaption: {
      title: 'Responsive adaption?',
      description: 'Whether the columns stack on a phone. Default: Yes',
    },
  },
  properties: [
    [
      'columns',
      {
        component: ({ widget }: { widget: Widget }) => (
          <ColumnsEditor widget={widget as ColumnContainerWidgetInstance} />
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
            updateAttributeValue={(value) =>
              widget.update({ disableResponsiveAdaption: value })
            }
          />
        ),
      },
    ],
  ],
  initialContent: {
    columns: [
      new ColumnWidget({ colSize: 4 }),
      new ColumnWidget({ colSize: 4 }),
      new ColumnWidget({ colSize: 4 }),
    ],
    // What the former alignment default `start` used to render.
    design: new Design({ desktop: { alignItems: 'flex-start' } }),
  },
})
