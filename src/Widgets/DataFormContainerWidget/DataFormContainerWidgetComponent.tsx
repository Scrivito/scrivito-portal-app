import {
  ContentTag,
  DataItem,
  InPlaceEditingOff,
  WidgetTag,
  navigateTo,
  provideComponent,
  useDataItem,
  // @ts-expect-error TODO: remove once officially released
  useDataScope,
} from 'scrivito'
import { DataFormContainerWidget } from './DataFormContainerWidgetClass'
import { toast } from 'react-toastify'
import { useRef, useState } from 'react'
import { snakeCase } from 'lodash-es'
import './DataFormContainerWidget.scss'

provideComponent(DataFormContainerWidget, ({ widget }) => {
  const dataItem = useDataItem()
  const dataScope = useDataScope()
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [keyCounter, setKeyCounter] = useState(0)
  const key = `DataFormContainerWidget-${widget.id()}-${keyCounter}`

  const redirectAfterSubmit =
    widget.get('redirectAfterSubmit') || widget.obj().parent()
  const submittedMessage = widget.get('submittedMessage')

  return (
    <WidgetTag className="data-form-container-widget">
      <form
        ref={formRef}
        key={key}
        onSubmit={onSubmit}
        onReset={onReset}
        className={isSubmitting ? 'form-loading' : ''}
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

    setIsSubmitting(true)

    const attributes = Object.fromEntries(
      new FormData(formRef.current).entries(),
    )

    try {
      if (dataItem) {
        await dataItem.update(attributes)
        toastAndRedirect(dataItem)
      } else {
        const createdItem = await dataScope.create(attributes)
        toastAndRedirect(createdItem)
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

  function toastAndRedirect(targetDataItem: DataItem) {
    if (submittedMessage) toast.success(submittedMessage)

    if (redirectAfterSubmit)
      // TODO: Remove this work around once #10212 is resolved
      navigateTo(redirectAfterSubmit, {
        params: {
          [`${snakeCase(targetDataItem.dataClass().name())}_id`]:
            targetDataItem.id(),
        },
      })
  }
})
