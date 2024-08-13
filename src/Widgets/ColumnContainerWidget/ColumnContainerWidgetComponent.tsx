import { provideComponent, ContentTag, connect } from 'scrivito'
import { ColumnContainerWidget } from './ColumnContainerWidgetClass'
import { ColumnWidgetInstance } from '../ColumnWidget/ColumnWidgetClass'

provideComponent(ColumnContainerWidget, ({ widget }) => {
  const columns = widget.get('columns')
  if (!columns.length) return null

  const alignment = widget.get('alignment') || 'start'
  const isResponsive = !widget.get('disableResponsiveAdaption')
  const isFlex = widget.get('layoutMode') === 'flex'

  const classNames = [`align-items-${alignment}`]
  const flexClassName = isResponsive ? 'd-md-flex' : 'd-flex'
  classNames.push(isFlex ? flexClassName : 'row')

  return (
    <div className={classNames.join(' ')}>
      {columns.map((columnWidget: ColumnWidgetInstance) => {
        const Column = isFlex ? FlexColumn : GridColumn
        return (
          <Column
            key={columnWidget.id()}
            columnWidget={columnWidget}
            isResponsive={isResponsive}
            isStretch={alignment === 'stretch'}
          />
        )
      })}
    </div>
  )
})

type ColumnProps = {
  columnWidget: ColumnWidgetInstance
  isResponsive: boolean
  isStretch: boolean
}

const FlexColumn = connect(function FlexColumn({
  columnWidget,
  isResponsive,
  isStretch,
}: ColumnProps) {
  const classNames = isResponsive ? ['my-md-0', 'my-2', 'mx-md-2'] : ['mx-2']
  if (columnWidget.get('flexGrow')) classNames.push('flex-grow-1')
  if (isStretch && columnWidget.get('content').length < 2) {
    classNames.push(isResponsive ? 'd-md-flex' : 'd-flex')
  }

  return (
    <ContentTag
      content={columnWidget}
      attribute="content"
      className={classNames.join(' ')}
    />
  )
})

const GridColumn = connect(function GridColumn({
  columnWidget,
  isResponsive,
}: ColumnProps) {
  const colSize = columnWidget.get('colSize') || 1
  const className = isResponsive ? `col-md-${colSize}` : `col-${colSize}`

  return (
    <div className={className}>
      <ContentTag
        content={columnWidget}
        attribute="content"
        className="h-100"
      />
    </div>
  )
})
