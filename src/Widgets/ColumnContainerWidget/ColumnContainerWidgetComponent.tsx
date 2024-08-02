import { provideComponent, ContentTag } from 'scrivito'
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
        const key = columnWidget.id()

        if (isFlex) {
          const colClassNames = isResponsive ? ['my-md-0', 'm-2'] : ['mx-2']
          if (
            alignment === 'stretch' &&
            columnWidget.get('content').length < 2
          ) {
            colClassNames.push(flexClassName)
          }
          if (columnWidget.get('flexGrow')) colClassNames.push('flex-grow-1')
          return (
            <ContentTag
              key={key}
              className={colClassNames.join(' ')}
              content={columnWidget}
              attribute="content"
            />
          )
        }

        const colSize = columnWidget.get('colSize') || 1
        const colClassName = isResponsive
          ? `col-md-${colSize}`
          : `col-${colSize}`
        return (
          <div key={key} className={colClassName}>
            <ContentTag
              content={columnWidget}
              attribute="content"
              className="h-100"
            />
          </div>
        )
      })}
    </div>
  )
})
