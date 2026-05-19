import { provideComponent, ContentTag, connect } from 'scrivito'
import { ColumnContainerWidget } from './ColumnContainerWidgetClass'
import { ColumnWidgetInstance } from '../ColumnWidget/ColumnWidgetClass'
import { normalizeColSizes } from './normalizeColSizes'

provideComponent(ColumnContainerWidget, ({ widget }) => {
  const columns = widget.get('columns')
  if (!columns.length) return null

  const alignment = widget.get('alignment') || 'start'
  const isResponsive = !widget.get('disableResponsiveAdaption')
  const isFlex = widget.get('layoutMode') === 'flex'

  const normalizedColSizes = isFlex
    ? columns.map(() => 1)
    : normalizeColSizes(columns as ColumnWidgetInstance[])

  const classNames = [alignmentClass(alignment)]

  if (isFlex) {
    if (isResponsive) {
      classNames.push('md:flex', 'md:-mx-2')
    } else {
      classNames.push('flex', '-mx-2')
    }
  } else {
    classNames.push('grid', 'grid-cols-12')
    if (!widget.get('disableGutters')) classNames.push('gap-x-6')
  }

  return (
    <div className={classNames.join(' ')}>
      {columns.map((columnWidget: ColumnWidgetInstance, index: number) => {
        return (
          <Column
            key={columnWidget.id()}
            columnWidget={columnWidget}
            normalizedColSize={normalizedColSizes[index]!} // normalizedColSizes is guaranteed to have the same length as columns
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
  normalizedColSize,
  isFlex,
  isResponsive,
  isStretch,
}: {
  columnWidget: ColumnWidgetInstance
  normalizedColSize: number
  isFlex: boolean
  isResponsive: boolean
  isStretch: boolean
}) {
  const classNames = []

  if (isFlex) {
    if (isResponsive) {
      classNames.push('my-2', 'md:my-0', 'md:mx-2')
    } else {
      classNames.push('mx-2')
    }
    if (columnWidget.get('flexGrow')) classNames.push('grow')
    if (isStretch && columnWidget.get('content').length < 2) {
      classNames.push(isResponsive ? 'md:flex' : 'flex')
    }
  } else {
    classNames.push(
      isResponsive
        ? responsiveColSpanClass(normalizedColSize)
        : colSpanClass(normalizedColSize),
    )
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

function alignmentClass(alignment: string): string {
  if (alignment === 'center') return 'items-center'
  if (alignment === 'end') return 'items-end'
  if (alignment === 'stretch') return 'items-stretch'
  return 'items-start'
}

function colSpanClass(size: number): string {
  if (size === 1) return 'col-span-1'
  if (size === 2) return 'col-span-2'
  if (size === 3) return 'col-span-3'
  if (size === 4) return 'col-span-4'
  if (size === 5) return 'col-span-5'
  if (size === 6) return 'col-span-6'
  if (size === 7) return 'col-span-7'
  if (size === 8) return 'col-span-8'
  if (size === 9) return 'col-span-9'
  if (size === 10) return 'col-span-10'
  if (size === 11) return 'col-span-11'
  return 'col-span-12'
}

function responsiveColSpanClass(size: number): string {
  if (size === 1) return 'col-span-12 md:col-span-1'
  if (size === 2) return 'col-span-12 md:col-span-2'
  if (size === 3) return 'col-span-12 md:col-span-3'
  if (size === 4) return 'col-span-12 md:col-span-4'
  if (size === 5) return 'col-span-12 md:col-span-5'
  if (size === 6) return 'col-span-12 md:col-span-6'
  if (size === 7) return 'col-span-12 md:col-span-7'
  if (size === 8) return 'col-span-12 md:col-span-8'
  if (size === 9) return 'col-span-12 md:col-span-9'
  if (size === 10) return 'col-span-12 md:col-span-10'
  if (size === 11) return 'col-span-12 md:col-span-11'
  return 'col-span-12 md:col-span-12'
}
