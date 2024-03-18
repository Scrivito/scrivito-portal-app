import {
  ContentTag,
  InPlaceEditingOff,
  WidgetTag,
  provideComponent,
} from 'scrivito'
import { alignmentClassNameWithBlock } from '../../utils/alignmentClassName'
import { DataFormSubmitButtonWidget } from './DataFormSubmitButtonWidgetClass'
import { buttonSizeClassName } from '../../utils/buttonSizeClassName'

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
          onClick={(e: unknown) => {
            if (supportsStopPropagation(e)) e.stopPropagation()
          }}
        ></ContentTag>{' '}
        {widget.get('hasReset') && (
          <ContentTag
            tag="button"
            content={widget}
            attribute="resetTitle"
            type="reset"
            className={`${baseButtonStyles.join(' ')} btn-danger`}
            onClick={(e: unknown) => {
              if (supportsStopPropagation(e)) e.stopPropagation()
            }}
          >
            {widget.get('resetTitle')}
          </ContentTag>
        )}
      </InPlaceEditingOff>
    </WidgetTag>
  )
})

function supportsStopPropagation(e: unknown): e is { stopPropagation(): void } {
  return (
    typeof (e as { stopPropagation(): void })?.stopPropagation === 'function'
  )
}
