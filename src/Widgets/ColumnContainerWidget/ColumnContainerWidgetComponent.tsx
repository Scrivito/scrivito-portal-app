import * as Scrivito from 'scrivito'
import { ColumnContainerWidget } from './ColumnContainerWidgetClass'

Scrivito.provideComponent(ColumnContainerWidget, ({ widget }) => {
  const columns = widget.get('columns')
  if (!columns.length) return null

  const content = columns.map((columnWidget, index) => {
    const colSize = columnWidget.get('colSize') || 1
    const className = widget.get('disableResponsiveAdaption')
      ? `col-${colSize}`
      : `col-md-${colSize}`
    return (
      <div key={index} className={className}>
        <Scrivito.ContentTag
          content={columnWidget}
          attribute="content"
          className="h-100"
        />
      </div>
    )
  })

  const classNames = ['row']

  if (widget.get('alignment')) {
    classNames.push(`align-items-${widget.get('alignment')}`)
  } else {
    classNames.push('align-items-start')
  }

  return <div className={classNames.join(' ')}>{content}</div>
})
