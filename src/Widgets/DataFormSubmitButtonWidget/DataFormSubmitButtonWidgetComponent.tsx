import {
  ContentTag,
  InPlaceEditingOff,
  WidgetTag,
  provideComponent,
} from 'scrivito'
import { alignmentClassNameWithBlock } from '../../utils/alignmentClassName'
import { DataFormSubmitButtonWidget } from './DataFormSubmitButtonWidgetClass'
import { buttonSizeClassName } from '../../utils/buttonSizeClassName'
import { MouseEvent } from 'react'

provideComponent(DataFormSubmitButtonWidget, ({ widget }) => {
  const baseButtonStyles = ['btn']
  const size = buttonSizeClassName(widget.get('size'))
  if (size) baseButtonStyles.push(size)

  return (
    <WidgetTag className={alignmentClassNameWithBlock(widget.get('alignment'))}>
      <InPlaceEditingOff>
        <ContentTag
          tag="button"
          content={widget}
          attribute="submitTitle"
          type="submit"
          className={`${baseButtonStyles.join(' ')} btn-primary`}
          onClick={(e: MouseEvent<'button'>) => e.stopPropagation()}
        ></ContentTag>{' '}
        {widget.get('hasReset') && (
          <ContentTag
            tag="button"
            content={widget}
            attribute="resetTitle"
            type="reset"
            className={`${baseButtonStyles.join(' ')} btn-danger`}
            onClick={(e: MouseEvent<'button'>) => e.stopPropagation()}
          >
            {widget.get('resetTitle')}
          </ContentTag>
        )}
      </InPlaceEditingOff>
    </WidgetTag>
  )
})
