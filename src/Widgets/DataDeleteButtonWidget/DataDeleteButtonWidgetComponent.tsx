import {
  ContentTag,
  InPlaceEditingOff,
  WidgetTag,
  currentLanguage,
  navigateTo,
  provideComponent,
  useData,
} from 'scrivito'
import { DataDeleteButtonWidget } from './DataDeleteButtonWidgetClass'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { EditorNote } from '../../Components/EditorNote'
import { buttonSizeClassName } from '../../utils/buttonSizeClassName'
import { alignmentClassNameWithBlock } from '../../utils/alignmentClassName'
import { errorToast } from '../../Data/CurrentUser/errorToast'
import { ModalSpinner } from '../../Components/ModalSpinner'

provideComponent(DataDeleteButtonWidget, ({ widget }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const dataItem = useData().dataItem()

  const buttonClassNames = ['btn']
  const cancelButtonClassNames = ['btn']
  const buttonSize = buttonSizeClassName(widget.get('buttonSize'))
  if (buttonSize) {
    buttonClassNames.push(buttonSize)
    cancelButtonClassNames.push(buttonSize)
  }

  const deletedMessage = widget.get('deletedMessage')
  const errorMessage = getErrorMessage()
  const redirectAfterDelete = widget.get('redirectAfterDelete')
  const buttonColor = widget.get('buttonColor') || 'btn-danger'
  if (buttonColor) buttonClassNames.push(buttonColor)

  const alignmentClassName = alignmentClassNameWithBlock(
    widget.get('alignment'),
  )

  if (!dataItem) return null

  if (showConfirmation && widget.get('requireConfirmation')) {
    return (
      <WidgetTag className={alignmentClassName}>
        <InPlaceEditingOff>
          <ContentTag
            content={widget}
            attribute="cancelTitle"
            tag="button"
            className={cancelButtonClassNames.join(' ')}
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
    <WidgetTag className={alignmentClassName}>
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
      if (deletedMessage) toast.success(deletedMessage)
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
