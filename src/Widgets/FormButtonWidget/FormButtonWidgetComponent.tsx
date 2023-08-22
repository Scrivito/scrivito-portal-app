import { provideComponent } from 'scrivito'
import { FormButtonWidget } from './FormButtonWidgetClass'
import { alignmentClassName } from '../FormContainerWidget/utils/alignmentClassName'
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
        {widget.get('buttonText')}
      </button>
    </WrapIfClassName>
  )
})
