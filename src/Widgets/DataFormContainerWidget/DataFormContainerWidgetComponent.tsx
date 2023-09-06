import { ContentTag, provideComponent, useDataItem } from 'scrivito'
import { DataFormContainerWidget } from './DataFormContainerWidgetClass'
import { toast } from 'react-toastify'
import { useRef, useState } from 'react'

provideComponent(DataFormContainerWidget, ({ widget }) => {
  const dataItem = useDataItem()
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [keyCounter, setKeyCounter] = useState(0)
  const key = `DataFormContainerWidget-${widget.id()}-${keyCounter}`

  return (
    <form
      ref={formRef}
      key={key}
      onSubmit={onSubmit}
      onReset={onReset}
      className={isSubmitting ? 'form-loading' : ''}
    >
      <ContentTag content={widget} attribute="content" />
      {isSubmitting && <div className="loader" />}
    </form>
  )

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (!dataItem) return

    setIsSubmitting(true)

    const attributes = Object.fromEntries(
      new FormData(formRef.current).entries(),
    )

    try {
      await dataItem.update(attributes)
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
})
