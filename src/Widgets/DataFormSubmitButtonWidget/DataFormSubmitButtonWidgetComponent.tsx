import { ContentTag, WidgetTag, provideComponent } from 'scrivito'
import { alignmentClassNameWithBlock } from '../../utils/alignmentClassName'
import { DataFormSubmitButtonWidget } from './DataFormSubmitButtonWidgetClass'

provideComponent(DataFormSubmitButtonWidget, ({ widget }) => {
  const baseButtonStyles = ['btn']
  const size = buttonSizeClassName(widget.get('size'))
  if (size) baseButtonStyles.push(size)

  return (
    <WidgetTag className={alignmentClassNameWithBlock(widget.get('alignment'))}>
      <ContentTag
        tag="button"
        content={widget}
        attribute="submitTitle"
        type="submit"
        className={`${baseButtonStyles.join(' ')} btn-primary`}
      ></ContentTag>{' '}
      {widget.get('hasReset') && (
        <ContentTag
          tag="button"
          content={widget}
          attribute="resetTitle"
          type="reset"
          className={`${baseButtonStyles.join(' ')} btn-danger`}
        >
          {widget.get('resetTitle')}
        </ContentTag>
      )}
    </WidgetTag>
  )
})

function buttonSizeClassName(buttonSize: string | null) {
  if (buttonSize === 'small') return 'btn-sm'
  if (buttonSize === 'large') return 'btn-lg'
}
