import { ContentTag, WidgetTag, provideComponent } from 'scrivito'
import { alignmentClassName } from '../../utils/alignmentClassName'
import { DataFormSubmitButtonWidget } from './DataFormSubmitButtonWidgetClass'

provideComponent(DataFormSubmitButtonWidget, ({ widget }) => {
  const className = alignmentClassName(widget.get('alignment'))

  const baseButtonStyle = `btn ${
    widget.get('size') === 'small' ? 'btn-sm' : 'btn-md'
  }`

  return (
    <WidgetTag className={className}>
      <ContentTag
        tag="button"
        content={widget}
        attribute="submitTitle"
        type="submit"
        className={`${baseButtonStyle} btn-primary`}
      ></ContentTag>{' '}
      {widget.get('hasReset') && (
        <ContentTag
          tag="button"
          content={widget}
          attribute="resetTitle"
          type="reset"
          className={`${baseButtonStyle} btn-danger`}
        >
          {widget.get('resetTitle')}
        </ContentTag>
      )}
    </WidgetTag>
  )
})
