import {
  ContentTag,
  InPlaceEditingOff,
  WidgetTag,
  currentLanguage,
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
import { ModalSpinner } from '../../Components/ModalSpinner'
import { errorToast } from '../../Data/CurrentUser/errorToast'

provideComponent(CheckoutButtonWidget, ({ widget }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!containsItems()) {
    return <EditorNote>The button is hidden if cart is empty.</EditorNote>
  }

  const successMessage = widget.get('successMessage')
  const errorMessage = getErrorMessage()

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
      {isSubmitting && <ModalSpinner />}
    </WidgetTag>
  )

  async function onClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    setIsSubmitting(true)

    try {
      const result = await checkoutCart()
      navigateTo(result)
      if (successMessage) toast.success(successMessage)
    } catch (error) {
      errorToast(errorMessage, error)
    } finally {
      setIsSubmitting(false)
    }
  }
})

function getErrorMessage(): string {
  switch (currentLanguage()) {
    case 'de':
      return 'Wir bedauern die Unannehmlichkeiten.'
    default:
      return 'We’re sorry for the inconvenience.'
  }
}
