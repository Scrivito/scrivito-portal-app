import { provideComponent, ContentTag, connect } from 'scrivito'
import { ColumnContainerWidget } from './ColumnContainerWidgetClass'
import { ColumnWidgetInstance } from '../ColumnWidget/ColumnWidgetClass'

const ALIGN_ITEMS_CLASSES: Record<string, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
}

const COL_WIDTH_CLASSES: Record<number, string> = {
  1: 'w-1/12',
  2: 'w-2/12',
  3: 'w-3/12',
  4: 'w-4/12',
  5: 'w-5/12',
  6: 'w-6/12',
  7: 'w-7/12',
  8: 'w-8/12',
  9: 'w-9/12',
  10: 'w-10/12',
  11: 'w-11/12',
  12: 'w-full',
}

const COL_WIDTH_MD_CLASSES: Record<number, string> = {
  1: 'md:w-1/12',
  2: 'md:w-2/12',
  3: 'md:w-3/12',
  4: 'md:w-4/12',
  5: 'md:w-5/12',
  6: 'md:w-6/12',
  7: 'md:w-7/12',
  8: 'md:w-8/12',
  9: 'md:w-9/12',
  10: 'md:w-10/12',
  11: 'md:w-11/12',
  12: 'md:w-full',
}

provideComponent(ColumnContainerWidget, ({ widget }) => {
  const columns = widget.get('columns')
  if (!columns.length) return null

  const alignment = widget.get('alignment') || 'start'
  const isResponsive = !widget.get('disableResponsiveAdaption')
  const isFlex = widget.get('layoutMode') === 'flex'
  const hasGutters = !widget.get('disableGutters')

  const classNames = [ALIGN_ITEMS_CLASSES[alignment]]

  if (isFlex) {
    classNames.push(isResponsive ? 'md:flex md:-mx-2' : 'flex -mx-2')
  } else {
    classNames.push('flex flex-wrap')
    if (hasGutters) classNames.push('-mx-3')
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
            hasGutters={hasGutters}
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
  hasGutters,
}: {
  columnWidget: ColumnWidgetInstance
  isFlex: boolean
  isResponsive: boolean
  isStretch: boolean
  hasGutters: boolean
}) {
  const classNames = []

  if (isFlex) {
    classNames.push(
      ...(isResponsive ? ['my-2', 'md:my-0', 'md:mx-2'] : ['mx-2']),
    )
    if (columnWidget.get('flexGrow')) classNames.push('grow')
    if (isStretch && columnWidget.get('content').length < 2) {
      classNames.push(isResponsive ? 'md:flex' : 'flex')
    }
  } else {
    const colSize = columnWidget.get('colSize') || 1
    if (hasGutters) classNames.push('px-3')
    if (isResponsive) {
      classNames.push('w-full')
      if (COL_WIDTH_MD_CLASSES[colSize]) {
        classNames.push(COL_WIDTH_MD_CLASSES[colSize])
      }
    } else if (COL_WIDTH_CLASSES[colSize]) {
      classNames.push(COL_WIDTH_CLASSES[colSize])
    }
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
