import {
  ContentTag,
  InPlaceEditingOff,
  WidgetTag,
  provideComponent,
} from 'scrivito'
import { DataFormSubmitButtonWidget } from './DataFormSubmitButtonWidgetClass'
import { MouseEvent } from 'react'
provideComponent(DataFormSubmitButtonWidget, ({ widget }) => {
  const baseButtonStyles = ['btn-portal']
  const widgetTagClassNames: string[] = []

  const size = widget.get('size') || 'medium'
  if (size === 'small') baseButtonStyles.push('px-2', 'py-1', 'text-sm')
  if (size === 'large') baseButtonStyles.push('px-4', 'py-2', 'text-lg')

  const alignment = widget.get('alignment')
  if (alignment === 'block') baseButtonStyles.push('w-full')
  if (alignment === 'center') widgetTagClassNames.push('text-center')
  if (alignment === 'right') widgetTagClassNames.push('text-right')

  return (
    <WidgetTag className={widgetTagClassNames.join(' ')}>
      <InPlaceEditingOff>
        <ContentTag
          tag="button"
          content={widget}
          attribute="submitTitle"
          type="submit"
          className={`${baseButtonStyles.join(' ')} btn-portal-primary`}
          onClick={(e: MouseEvent<'button'>) => e.stopPropagation()}
        ></ContentTag>{' '}
        {widget.get('hasReset') && (
          <ContentTag
            tag="button"
            content={widget}
            attribute="resetTitle"
            type="reset"
            className={`${baseButtonStyles.join(' ')} btn-portal-danger`}
            onClick={(e: MouseEvent<'button'>) => e.stopPropagation()}
          >
            {widget.get('resetTitle')}
          </ContentTag>
        )}
      </InPlaceEditingOff>
    </WidgetTag>
  )
})
