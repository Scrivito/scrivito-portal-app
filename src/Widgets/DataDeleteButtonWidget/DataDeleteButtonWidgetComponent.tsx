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
import { useState } from 'react'
import { toast } from 'react-toastify'
import { DataDeleteButtonWidget } from './DataDeleteButtonWidgetClass'
import { EditorNote } from '../../Components/EditorNote'
import { buttonSizeClassName } from '../../utils/buttonSizeClassName'
import { alignmentClassNameWithBlock } from '../../utils/alignmentClassName'
import { errorToast } from '../../Data/CurrentUser/errorToast'
import { ModalSpinner } from '../../Components/ModalSpinner'
import messages from './i18n.visitor.json'
import rosetta from 'rosetta'

const i18n = rosetta(messages)
const lang = currentLanguage() ?? 'en'
i18n.locale(lang in messages ? lang : 'en')

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

  const deletedMessage = useResolvedStringValue(widget.get('deletedMessage'))
  const errorMessage = i18n.t('errorMessage')
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
      if (deletedMessage) toast.info(deletedMessage)
      if (redirectAfterDelete) navigateTo(redirectAfterDelete)
    } catch (error) {
      errorToast(errorMessage, error)
    } finally {
      setIsSubmitting(false)
    }
  }
})
