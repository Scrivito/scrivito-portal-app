import { CSSProperties } from 'react'
import { provideComponent, ContentTag, connect, designProps } from 'scrivito'
import { ColumnContainerWidget } from './ColumnContainerWidgetClass'
import { ColumnWidgetInstance } from '../ColumnWidget/ColumnWidgetClass'
import './ColumnContainerWidget.scss'

type ColumnTemplateStyle = CSSProperties & {
  [customProperty: `--column-${string}`]: string
}

provideComponent(ColumnContainerWidget, ({ widget }) => {
  const columns = widget.get('columns')
  if (!columns.length) return null

  const design = widget.get('design')
  const { style, ...containerDesign } = designProps(design)

  const classNames = ['column-container-widget']
  if (!widget.get('disableResponsiveAdaption')) {
    classNames.push('column-container-widget--responsive')
  }

  // The column sizes become grid tracks. An `fr` is a share of whatever is left *after* the
  // gaps, so spacing the columns can never push one of them onto a line of its own. The tracks
  // travel as a custom property rather than as `grid-template-columns` itself, so that the
  // stylesheet can still override them where the columns stack.
  const containerStyle: ColumnTemplateStyle = {
    '--column-template': columns
      .map(
        (column) => `${(column as ColumnWidgetInstance).get('colSize') || 1}fr`,
      )
      .join(' '),
    ...style,
  }

  return (
    <div
      {...containerDesign}
      className={classNames.join(' ')}
      style={containerStyle}
    >
      {columns.map((columnWidget: ColumnWidgetInstance) => (
        <Column
          key={columnWidget.id()}
          columnWidget={columnWidget}
          // Stretching a column is up to the column, so the container's `align-items` has to
          // be read, not just rendered.
          isStretch={design.get('alignItems') === 'stretch'}
        />
      ))}
    </div>
  )
})

const Column = connect(function Column({
  columnWidget,
  isStretch,
}: {
  columnWidget: ColumnWidgetInstance
  isStretch: boolean
}) {
  const fillsColumn = isStretch && columnWidget.get('content').length < 2

  return (
    <ContentTag
      design
      content={columnWidget}
      attribute="content"
      className={fillsColumn ? 'column-container-widget__column--fill' : ''}
      renderEmptyAttribute
    />
  )
})
