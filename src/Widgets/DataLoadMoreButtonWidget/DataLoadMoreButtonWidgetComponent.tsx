import {
  WidgetTag,
  isComparisonActive,
  isInPlaceEditingActive,
  provideComponent,
} from 'scrivito'
import { DataLoadMoreButtonWidget } from './DataLoadMoreButtonWidgetClass'
import { useContext } from 'react'
import { DataBatchContext } from '../../Components/DataBatchContext'
import { buttonSizeClassName } from '../../utils/buttonSizeClassName'
import { alignmentClassNameWithBlock } from '../../utils/alignmentClassName'

provideComponent(DataLoadMoreButtonWidget, ({ widget }) => {
  const { hasMore, loadMore } = useContext(DataBatchContext)

  const classNames = ['btn']

  const buttonSize = buttonSizeClassName(widget.get('buttonSize'))
  if (buttonSize) classNames.push(buttonSize)

  const buttonColor = widget.get('buttonColor') || 'btn-outline-primary'
  if (buttonColor) classNames.push(buttonColor)

  const alignmentClassName = alignmentClassNameWithBlock(
    widget.get('alignment'),
  )

  if (!hasMore()) {
    if (!isInPlaceEditingActive() && !isComparisonActive()) return null

    classNames.push('opacity-60')
    return (
      <WidgetTag className={alignmentClassName}>
        <button className={classNames.join(' ')}>{widget.get('title')}</button>
      </WidgetTag>
    )
  }

  return (
    <WidgetTag className={alignmentClassName}>
      <button className={classNames.join(' ')} onClick={() => loadMore()}>
        {widget.get('title')}
      </button>
    </WidgetTag>
  )
})
