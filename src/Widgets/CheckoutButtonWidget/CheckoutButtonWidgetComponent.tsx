import {
  ContentTag,
  InPlaceEditingOff,
  WidgetTag,
  load,
  provideComponent,
  urlForDataItem,
} from 'scrivito'
import { toast } from 'react-toastify'
import { CheckoutButtonWidget } from './CheckoutButtonWidgetClass'
import { checkoutCart, containsItems } from '../../Data/CartItem/Cart'
import { alignmentClassNameWithBlock } from '../../utils/alignmentClassName'
import { getHistory } from '../../config/history'
import { EditorNote } from '../../Components/EditorNote'
import { buttonSizeClassName } from '../../utils/buttonSizeClassName'

provideComponent(CheckoutButtonWidget, ({ widget }) => {
  if (!containsItems()) {
    return <EditorNote>The button is hidden if cart is empty.</EditorNote>
  }
  const successMessage = widget.get('successMessage')
  const buttonClassNames = ['btn']
  buttonClassNames.push(widget.get('buttonColor') || 'btn-primary')

  const buttonSize = buttonSizeClassName(widget.get('buttonSize'))
  if (buttonSize) buttonClassNames.push(buttonSize)

  return (
    <WidgetTag className={alignmentClassNameWithBlock(widget.get('alignment'))}>
      <InPlaceEditingOff>
        <ContentTag
          content={widget}
          attribute="buttonText"
          tag="button"
          className={buttonClassNames.join(' ')}
          onClick={onClick}
        />
      </InPlaceEditingOff>
    </WidgetTag>
  )

  async function onClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    const result = await checkoutCart()

    // TODO: Remove workaround once the issue #10629 is fixed
    const resultUrl = await load(() => urlForDataItem(result))

    if (successMessage) toast.success(successMessage)
    if (resultUrl) getHistory()?.push(resultUrl)
  }
})
