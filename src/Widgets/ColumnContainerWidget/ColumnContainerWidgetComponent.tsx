import { provideComponent, ContentTag } from 'scrivito'
import { ColumnContainerWidget } from './ColumnContainerWidgetClass'

provideComponent(ColumnContainerWidget, ({ widget }) => {
  const columns = widget.get('columns')
  if (!columns.length) return null

  const alignment = widget.get('alignment') || 'start'

  const classNames = ['row', `align-items-${alignment}`]

  return (
    <div className={classNames.join(' ')}>
      {columns.map((columnWidget) => {
        const colSize = columnWidget.get('colSize') || 1
        const className = widget.get('disableResponsiveAdaption')
          ? `col-${colSize}`
          : `col-md-${colSize}`
        return (
          <div key={columnWidget.id()} className={className}>
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
