import {
  ContentTag,
  InPlaceEditingOff,
  WidgetTag,
  navigateTo,
  provideComponent,
} from 'scrivito'
import { toast } from 'react-toastify'
import { CheckoutButtonWidget } from './CheckoutButtonWidgetClass'
import { checkoutCart, containsItems } from '../../Data/CartItem/Cart'
import { alignmentClassNameWithBlock } from '../../utils/alignmentClassName'
import { EditorNote } from '../../Components/EditorNote'
import { buttonSizeClassName } from '../../utils/buttonSizeClassName'
import { useState } from 'react'

provideComponent(CheckoutButtonWidget, ({ widget }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

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
          disabled={isSubmitting}
          onClick={onClick}
        />
      </InPlaceEditingOff>
      {isSubmitting && <div className="loader" />}
    </WidgetTag>
  )

  async function onClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    setIsSubmitting(true)
    const result = await checkoutCart()
    setIsSubmitting(false)

    if (successMessage) toast.success(successMessage)
    navigateTo(result)
  }
})
