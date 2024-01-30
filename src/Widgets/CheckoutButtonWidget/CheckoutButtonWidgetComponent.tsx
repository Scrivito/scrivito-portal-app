import {
  ContentTag,
  InPlaceEditingOff,
  Link,
  WidgetTag,
  isInPlaceEditingActive,
  load,
  navigateTo,
  provideComponent,
  urlForDataItem,
} from 'scrivito'
import { toast } from 'react-toastify'
import { CheckoutButtonWidget } from './CheckoutButtonWidgetClass'
import { checkoutCart, containsItems } from '../../Data/CartItem/Cart'
import { alignmentClassNameWithBlock } from '../../utils/alignmentClassName'

provideComponent(CheckoutButtonWidget, ({ widget }) => {
  if (!containsItems()) {
    if (isInPlaceEditingActive()) {
      return (
        <div className="alert alert-warning d-flex m-auto">
          <i className="bi bi-exclamation-circle bi-2x" aria-hidden="true"></i>
          <div className="my-auto mx-2">
            <b>Editor note:</b> The button is hidden if cart is empty.
          </div>
        </div>
      )
    }

    return null
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
    const resultUrl = await load(() => urlForDataItem(result))

    if (successMessage) toast.success(successMessage)
    if (resultUrl) navigateTo(new Link({ url: resultUrl }))
  }
})

function buttonSizeClassName(buttonSize: string | null) {
  if (buttonSize === 'small') return 'btn-sm'
  if (buttonSize === 'large') return 'btn-lg'
}
