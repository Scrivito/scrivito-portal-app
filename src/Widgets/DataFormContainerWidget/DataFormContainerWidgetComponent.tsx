import {
  ContentTag,
  currentLanguage,
  DataItem,
  InPlaceEditingOff,
  navigateTo,
  provideComponent,
  useData,
  useResolvedStringValue,
  WidgetTag,
} from 'scrivito'
import { DataFormContainerWidget } from './DataFormContainerWidgetClass'
import { toast } from 'react-toastify'
import { useRef, useState } from 'react'
import './DataFormContainerWidget.scss'
import { ModalSpinner } from '../../Components/ModalSpinner'
import { blobToBinary, DataBinaryUpload } from '../../utils/blobToBinary'
import { errorToast } from '../../Data/CurrentUser/errorToast'

provideComponent(DataFormContainerWidget, ({ widget }) => {
  const dataScope = useData()
  const dataItem = dataScope.dataItem()
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [keyCounter, setKeyCounter] = useState(0)
  const key = `DataFormContainerWidget-${widget.id()}-${keyCounter}`

  const redirectAfterSubmit = widget.get('redirectAfterSubmit')
  const submitOnChange = widget.get('submitOnChange')
  const submittedMessage = useResolvedStringValue(
    widget.get('submittedMessage'),
  )

  const errorMessage = getErrorMessage()

  return (
    <WidgetTag className="data-form-container-widget">
      <form
        ref={formRef}
        key={key}
        onChange={submitOnChange ? onSubmit : undefined}
        onSubmit={onSubmit}
        onReset={onReset}
        className={isSubmitting ? 'form-loading' : ''}
      >
        <InPlaceEditingOff>
          <ContentTag content={widget} attribute="hiddenFields" />
        </InPlaceEditingOff>

        <ContentTag content={widget} attribute="content" />
        {isSubmitting && <ModalSpinner />}
      </form>
    </WidgetTag>
  )

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    e.stopPropagation()

    if (!formRef.current.checkValidity()) return

    setIsSubmitting(true)

    try {
      const attributes = await attributesFromForm(formRef.current)

      if (dataItem) {
        await dataItem.update(attributes)
        await toastAndRedirect(dataItem)
      } else if (dataScope) {
        const createdItem = await dataScope.create(attributes)
        await toastAndRedirect(createdItem)
        formRef.current.reset()
      }
    } catch (error) {
      errorToast(errorMessage, error)
    } finally {
      setIsSubmitting(false)
    }
  }

  function onReset(e: React.FormEvent) {
    e.preventDefault()
    e.stopPropagation()

    setKeyCounter((k) => k + 1)
  }

  async function toastAndRedirect(targetDataItem: DataItem) {
    if (submittedMessage) toast.success(submittedMessage)
    if (redirectAfterSubmit) navigateTo(targetDataItem)
  }
})

async function attributesFromForm(formElement: HTMLFormElement) {
  const attributes: {
    [key: string]:
      | string
      | boolean
      | number
      | null
      | DataBinaryUpload
      | DataBinaryUpload[]
  } = {}

  for (const element of formElement.elements) {
    if (
      !(element instanceof HTMLInputElement) &&
      !(element instanceof HTMLSelectElement) &&
      !(element instanceof HTMLTextAreaElement)
    ) {
      continue
    }

    const name = element.getAttribute('name')
    if (!name) throw new Error('No name given!')

    attributes[name] = await valueFromElement(element)
  }

  return attributes
}

async function valueFromElement(
  element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
) {
  if (element instanceof HTMLSelectElement) return element.value
  if (element instanceof HTMLTextAreaElement) return element.value

  if (element.type === 'checkbox') return element.checked

  if (element.type === 'number') {
    const numberValue = element.valueAsNumber
    return Number.isFinite(numberValue) ? numberValue : null
  }

  if (element.type === 'file') {
    const files = [...(element.files ?? [])]
    if (files.length === 0) return null

    const blobToBinaryPromises = files.map(blobToBinary)
    return element.multiple
      ? Promise.all(blobToBinaryPromises)
      : (blobToBinaryPromises[0] ?? null)
  }

  return element.value
}

function getErrorMessage(): string {
  switch (currentLanguage()) {
    case 'de':
      return 'Wir bedauern die Unannehmlichkeiten.'
    case 'fr':
      return 'Nous sommes désolés pour le désagrément.'
    case 'pl':
      return 'Przepraszamy za utrudnienia.'
    default:
      return 'We’re sorry for the inconvenience.'
  }
}
