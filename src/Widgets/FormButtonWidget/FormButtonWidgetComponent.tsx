import { provideComponent, ContentTag } from 'scrivito'
import { FormButtonWidget } from './FormButtonWidgetClass'
import { alignmentClassName } from '../../utils/alignmentClassName'
import { WrapIfClassName } from '../../Components/WrapIfClassName'

provideComponent(FormButtonWidget, ({ widget }) => {
  const alignment = widget.get('alignment')
  const className = alignmentClassName(alignment)

  return (
    <WrapIfClassName className={className}>
      <button
        className={`btn btn-primary${
          widget.get('alignment') === 'block' ? ' btn-block' : ''
        }`}
        type="submit"
      >
        <ContentTag tag="span" content={widget} attribute="buttonText" />
      </button>
    </WrapIfClassName>
  )
})
