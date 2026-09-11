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
import { EditorNote } from '../../Components/EditorNote'
import { useState } from 'react'
import { buttonColorClassName } from '../../utils/theme/buttonColorClassName'
import { ModalSpinner } from '../../Components/ModalSpinner'
import { errorToast } from '../../Data/CurrentUser/errorToast'

provideComponent(CheckoutButtonWidget, ({ widget }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!containsItems()) {
    return <EditorNote>The button is hidden if cart is empty.</EditorNote>
  }

  const successMessage = widget.get('successMessage')
  const errorMessage = getErrorMessage()

  const buttonClassNames = ['btn-portal']
  const widgetTagClassNames: string[] = []

  const buttonColor = widget.get('buttonColor') || 'btn-primary'
  buttonClassNames.push(buttonColorClassName(buttonColor))

  const buttonSize = widget.get('buttonSize') || 'medium'
  if (buttonSize === 'small') buttonClassNames.push('px-2', 'py-1', 'text-sm')
  if (buttonSize === 'large') buttonClassNames.push('px-4', 'py-2', 'text-lg')

  const alignment = widget.get('alignment')
  if (alignment === 'block') buttonClassNames.push('w-full')
  if (alignment === 'center') widgetTagClassNames.push('text-center')
  if (alignment === 'right') widgetTagClassNames.push('text-right')

  return (
    <WidgetTag className={widgetTagClassNames.join(' ')}>
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

    const invalidForm =
      document.querySelector<HTMLFormElement>('form:not(:valid)')

    if (invalidForm) {
      invalidForm.reportValidity()
      return
    }

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
    case 'fr':
      return 'Nous sommes désolés pour le dérangement.'
    case 'pl':
      return 'Przepraszamy za utrudnienia.'
    default:
      return 'We’re sorry for the inconvenience.'
  }
}
