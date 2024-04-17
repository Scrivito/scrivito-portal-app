import {
  WidgetTag,
  isComparisonActive,
  isInPlaceEditingActive,
  provideComponent,
  useData,
} from 'scrivito'
import { DataLoadMoreButtonWidget } from './DataLoadMoreButtonWidgetClass'
import { useContext } from 'react'
import { DataScopeParamsContext } from '../../Components/DataScopeParamsContext'
import { buttonSizeClassName } from '../../utils/buttonSizeClassName'
import { alignmentClassNameWithBlock } from '../../utils/alignmentClassName'

provideComponent(DataLoadMoreButtonWidget, ({ widget }) => {
  const dataScope = useData()
  const { limit, setLimit } = useContext(DataScopeParamsContext)

  const moreAvailable =
    limit < dataScope.transform({ limit: limit + 1 }).take().length

  const classNames = ['btn']

  const buttonSize = buttonSizeClassName(widget.get('buttonSize'))
  if (buttonSize) classNames.push(buttonSize)

  const buttonColor = widget.get('buttonColor') || 'btn-outline-primary'
  if (buttonColor) classNames.push(buttonColor)

  const alignmentClassName = alignmentClassNameWithBlock(
    widget.get('alignment'),
  )

  if (!moreAvailable) {
    if (!isInPlaceEditingActive() && !isComparisonActive()) return null

    classNames.push('disabled')
    classNames.push('opacity-60')
    return (
      <WidgetTag className={alignmentClassName}>
        <button className={classNames.join(' ')}>{widget.get('title')}</button>
      </WidgetTag>
    )
  }

  return (
    <WidgetTag className={alignmentClassName}>
      <button
        className={classNames.join(' ')}
        onClick={() => setLimit(limit + 10)}
      >
        {widget.get('title')}
      </button>
    </WidgetTag>
  )
})
