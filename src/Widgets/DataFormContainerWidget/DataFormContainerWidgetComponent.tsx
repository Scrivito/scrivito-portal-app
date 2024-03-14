import {
  ContentTag,
  DataItem,
  DataScope,
  InPlaceEditingOff,
  WidgetTag,
  load,
  provideComponent,
  urlForDataItem,
  useDataItem,
  // @ts-expect-error TODO: remove once officially released
  useDataScope,
} from 'scrivito'
import { DataFormContainerWidget } from './DataFormContainerWidgetClass'
import { toast } from 'react-toastify'
import { useRef, useState } from 'react'
import './DataFormContainerWidget.scss'
import { getHistory } from '../../config/history'
import { EditorNote } from '../../Components/EditorNote'

provideComponent(DataFormContainerWidget, ({ widget }) => {
  const dataItem = useDataItem()
  const dataScope: DataScope | undefined = useDataScope()
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [keyCounter, setKeyCounter] = useState(0)
  const key = `DataFormContainerWidget-${widget.id()}-${keyCounter}`

  if (!dataItem && !dataScope) {
    return <EditorNote>No data found. Please select a data source.</EditorNote>
  }

  const redirectAfterSubmit = widget.get('redirectAfterSubmit')
  const submitOnChange = widget.get('submitOnChange')
  const submittedMessage = widget.get('submittedMessage')

  return (
    <WidgetTag className="data-form-container-widget">
      <form
        ref={formRef}
        key={key}
        onChange={submitOnChange ? onSubmit : undefined}
        onSubmit={onSubmit}
        onReset={onReset}
        className={isSubmitting ? 'form-loading' : ''}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <InPlaceEditingOff>
          <ContentTag content={widget} attribute="hiddenFields" />
        </InPlaceEditingOff>

        <ContentTag content={widget} attribute="content" />
        {isSubmitting && <div className="loader" />}
      </form>
    </WidgetTag>
  )

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    e.stopPropagation()

    if (!formRef.current.checkValidity()) return

    setIsSubmitting(true)

    try {
      const attributes = attributesFromForm(formRef.current)

      if (dataItem) {
        await dataItem.update(attributes)
        await toastAndRedirect(dataItem)
      } else if (dataScope) {
        const createdItem = await dataScope.create(attributes)
        await toastAndRedirect(createdItem)
        formRef.current.reset()
      }
    } catch (error) {
      if (!(error instanceof Error)) return

      toast.error(
        <div>
          <h6>{error.message}</h6>
          <p>We&apos;re sorry for the inconvenience.</p>
        </div>,
      )
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

    if (redirectAfterSubmit) {
      // TODO: Remove workaround once the issue #10629 is fixed
      const url = await load(() => urlForDataItem(targetDataItem))
      if (url) getHistory()?.push(url)
    }
  }
})

function attributesFromForm(formElement: HTMLFormElement) {
  const attributes: {
    [key: string]: string | boolean | number | null | Blob | Blob[]
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

    attributes[name] = valueFromElement(element)
  }

  return attributes
}

function valueFromElement(
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
    const files = element.files
    if (element.multiple) return files ? [...files] : []

    return files?.length === 1 ? files[0] : null
  }

  return element.value
}
