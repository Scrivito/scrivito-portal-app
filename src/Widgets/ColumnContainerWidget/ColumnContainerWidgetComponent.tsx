import { provideComponent, ContentTag } from 'scrivito'
import { ColumnContainerWidget } from './ColumnContainerWidgetClass'

provideComponent(ColumnContainerWidget, ({ widget }) => {
  const columns = widget.get('columns')
  if (!columns.length) return null

  const alignment = widget.get('alignment') || 'start'
  const isFlex = widget.get('layoutMode') === 'flex'

  const classNames = [`align-items-${alignment}`, isFlex ? 'd-flex' : 'row']

  return (
    <div className={classNames.join(' ')}>
      {columns.map((columnWidget) => {
        const key = columnWidget.id()

        if (isFlex) {
          const flexGrow = columnWidget.get('flexGrow')
          const className = flexGrow ? 'flex-grow-1' : undefined
          return (
            <ContentTag
              key={key}
              className={className}
              content={columnWidget}
              attribute="content"
            />
          )
        }

        const colSize = columnWidget.get('colSize') || 1
        const className = widget.get('disableResponsiveAdaption')
          ? `col-${colSize}`
          : `col-md-${colSize}`
        return (
          <div key={key} className={className}>
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
