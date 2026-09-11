import {
  WidgetTag,
  isComparisonActive,
  isInPlaceEditingActive,
  provideComponent,
} from 'scrivito'
import { DataLoadMoreButtonWidget } from './DataLoadMoreButtonWidgetClass'
import { useContext } from 'react'
import { DataBatchContext } from '../../Components/DataBatchContext'
import { buttonColorClassName } from '../../utils/theme/buttonColorClassName'

provideComponent(DataLoadMoreButtonWidget, ({ widget }) => {
  const { hasMore, loadMore } = useContext(DataBatchContext)

  const classNames = ['btn-portal', 'mt-6']
  const widgetTagClassNames: string[] = []

  const buttonColor = widget.get('buttonColor') || 'btn-outline-primary'
  classNames.push(buttonColorClassName(buttonColor))

  const buttonSize = widget.get('buttonSize') || 'medium'
  if (buttonSize === 'small') classNames.push('px-2', 'py-1', 'text-sm')
  if (buttonSize === 'large') classNames.push('px-4', 'py-2', 'text-lg')

  const alignment = widget.get('alignment')
  if (alignment === 'block') classNames.push('w-full')
  if (alignment === 'center') widgetTagClassNames.push('text-center')
  if (alignment === 'right') widgetTagClassNames.push('text-right')

  if (!hasMore()) {
    if (!isInPlaceEditingActive() && !isComparisonActive()) return null

    classNames.push('opacity-60')
    return (
      <WidgetTag className={widgetTagClassNames.join(' ')}>
        <button className={classNames.join(' ')}>{widget.get('title')}</button>
      </WidgetTag>
    )
  }

  return (
    <WidgetTag className={widgetTagClassNames.join(' ')}>
      <button className={classNames.join(' ')} onClick={loadMore}>
        {widget.get('title')}
      </button>
    </WidgetTag>
  )
})
