import {
  ContentTag,
  currentLanguage,
  InPlaceEditingOff,
  navigateTo,
  provideComponent,
  useData,
  useResolvedStringValue,
  WidgetTag,
} from 'scrivito'
import { DataDeleteButtonWidget } from './DataDeleteButtonWidgetClass'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { EditorNote } from '../../Components/EditorNote'
import { errorToast } from '../../Data/CurrentUser/errorToast'
import { ModalSpinner } from '../../Components/ModalSpinner'
import { buttonColorClassName } from '../../utils/theme/buttonColorClassName'

provideComponent(DataDeleteButtonWidget, ({ widget }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const dataItem = useData().dataItem()

  const baseClassNames = ['btn-portal']
  const widgetTagClassNames: string[] = []

  const buttonSize = widget.get('buttonSize') || 'medium'
  if (buttonSize === 'small') baseClassNames.push('px-2', 'py-1', 'text-sm')
  if (buttonSize === 'large') baseClassNames.push('px-4', 'py-2', 'text-lg')

  const deletedMessage = useResolvedStringValue(widget.get('deletedMessage'))
  const errorMessage = getErrorMessage()
  const redirectAfterDelete = widget.get('redirectAfterDelete')

  const alignment = widget.get('alignment')
  if (alignment === 'block') baseClassNames.push('w-full')
  if (alignment === 'center') widgetTagClassNames.push('text-center')
  if (alignment === 'right') widgetTagClassNames.push('text-right')

  const buttonColor = widget.get('buttonColor') || 'btn-danger'
  const buttonClassNames = [
    ...baseClassNames,
    buttonColorClassName(buttonColor),
  ]

  if (!dataItem) return null

  if (showConfirmation && widget.get('requireConfirmation')) {
    return (
      <WidgetTag className={widgetTagClassNames.join(' ')}>
        <InPlaceEditingOff>
          <ContentTag
            content={widget}
            attribute="cancelTitle"
            tag="button"
            className={baseClassNames.join(' ')}
            onClick={onDeleteRejected}
          />

          <ContentTag
            content={widget}
            attribute="confirmTitle"
            tag="button"
            className={buttonClassNames.join(' ')}
            onClick={onDeleteConfirmed}
          />
        </InPlaceEditingOff>
        {isSubmitting && <ModalSpinner />}
      </WidgetTag>
    )
  }

  return (
    <WidgetTag className={widgetTagClassNames.join(' ')}>
      <EditorNote>Deletes {dataItem.dataClass().name()}.</EditorNote>
      <InPlaceEditingOff>
        <ContentTag
          content={widget}
          attribute="title"
          tag="button"
          className={buttonClassNames.join(' ')}
          onClick={
            widget.get('requireConfirmation') ? onDelete : onDeleteConfirmed
          }
        />
      </InPlaceEditingOff>
      {isSubmitting && <ModalSpinner />}
    </WidgetTag>
  )

  function onDelete(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    setShowConfirmation(true)
  }

  function onDeleteRejected(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    setShowConfirmation(false)
  }

  async function onDeleteConfirmed(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    setIsSubmitting(true)

    try {
      await dataItem?.delete()
      if (deletedMessage) toast.info(deletedMessage)
      if (redirectAfterDelete) navigateTo(redirectAfterDelete)
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
      return 'Aktion fehlgeschlagen. Wir bedauern die Unannehmlichkeiten.'
    case 'fr':
      return 'L’opération a échoué. Nous sommes désolés pour le désagrément.'
    case 'pl':
      return 'Operacja nie powiodła się. Przepraszamy za utrudnienia.'
    default:
      return 'Operation failed. We’re sorry for the inconvenience.'
  }
}
