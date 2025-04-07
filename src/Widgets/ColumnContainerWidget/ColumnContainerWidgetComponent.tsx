import { provideComponent, ContentTag, connect } from 'scrivito'
import { ColumnContainerWidget } from './ColumnContainerWidgetClass'
import { ColumnWidgetInstance } from '../ColumnWidget/ColumnWidgetClass'
import './ColumnContainerWidget.scss'

provideComponent(ColumnContainerWidget, ({ widget }) => {
  const columns = widget.get('columns')
  if (!columns.length) return null

  const alignment = widget.get('alignment') || 'start'
  const isResponsive = !widget.get('disableResponsiveAdaption')
  const isFlex = widget.get('layoutMode') === 'flex'

  const classNames = [`align-items-${alignment}`]

  if (isFlex) {
    classNames.push(
      'column-container-widget--flex-wrapper',
      isResponsive ? 'd-md-flex' : 'd-flex',
    )
  } else {
    classNames.push('row')
    if (widget.get('disableGutters')) classNames.push('g-0')
  }

  return (
    <div className={classNames.join(' ')}>
      {columns.map((columnWidget: ColumnWidgetInstance) => {
        return (
          <Column
            key={columnWidget.id()}
            columnWidget={columnWidget}
            isFlex={isFlex}
            isResponsive={isResponsive}
            isStretch={alignment === 'stretch'}
          />
        )
      })}
    </div>
  )
})

const Column = connect(function Column({
  columnWidget,
  isFlex,
  isResponsive,
  isStretch,
}: {
  columnWidget: ColumnWidgetInstance
  isFlex: boolean
  isResponsive: boolean
  isStretch: boolean
}) {
  const classNames = []

  if (isFlex) {
    classNames.push(
      ...(isResponsive ? ['my-md-0', 'my-2', 'mx-md-2'] : ['mx-2']),
    )
    if (columnWidget.get('flexGrow')) classNames.push('flex-grow-1')
    if (isStretch && columnWidget.get('content').length < 2) {
      classNames.push(isResponsive ? 'd-md-flex' : 'd-flex')
    }
  } else {
    const colSize = columnWidget.get('colSize') || 1
    classNames.push(isResponsive ? `col-md-${colSize}` : `col-${colSize}`)
  }

  return (
    <ContentTag
      content={columnWidget}
      attribute="content"
      className={classNames.join(' ')}
      renderEmptyAttribute
    />
  )
})
