import {
  ContentTag,
  InPlaceEditingOff,
  WidgetTag,
  navigateTo,
  provideComponent,
  useDataItem,
} from 'scrivito'
import { DataDeleteButtonWidget } from './DataDeleteButtonWidgetClass'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { EditorNote } from '../../Components/EditorNote'
import { buttonSizeClassName } from '../../utils/buttonSizeClassName'
import { alignmentClassNameWithBlock } from '../../utils/alignmentClassName'

provideComponent(DataDeleteButtonWidget, ({ widget }) => {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const dataItem = useDataItem()

  const buttonClassNames = ['btn']
  const cancelButtonClassNames = ['btn']
  const buttonSize = buttonSizeClassName(widget.get('buttonSize'))
  if (buttonSize) {
    buttonClassNames.push(buttonSize)
    cancelButtonClassNames.push(buttonSize)
  }

  const deletedMessage = widget.get('deletedMessage')
  const redirectAfterDelete = widget.get('redirectAfterDelete')
  const buttonColor = widget.get('buttonColor') || 'btn-danger'
  if (buttonColor) buttonClassNames.push(buttonColor)

  const alignmentClassName = alignmentClassNameWithBlock(
    widget.get('alignment'),
  )

  if (!dataItem) return null

  if (showConfirmation) {
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
      </WidgetTag>
    )
  }

  return (
    <WidgetTag className={alignmentClassNameWithBlock(widget.get('alignment'))}>
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

    await dataItem?.delete()

    if (deletedMessage) toast.success(deletedMessage)

    if (redirectAfterDelete) navigateTo(redirectAfterDelete)
  }
})
