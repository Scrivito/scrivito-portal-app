import { useEffect, useState } from 'react'
import {
  provideComponent,
  urlFor,
  ContentTag,
  InPlaceEditingOff,
} from 'scrivito'
import { scrollIntoView } from './utils/scrollIntoView'
import { getHistory } from '../../config/history'

import './FormContainerWidget.scss'
import { FormContainerWidget } from './FormContainerWidgetClass'

provideComponent(FormContainerWidget, ({ widget }) => {
  const formEndpoint = `https://api.justrelate.com/neoletter/instances/${
    import.meta.env.SCRIVITO_TENANT
  }/form_submissions`

  const [browserLocation, setBrowserLocation] = useState<string | null>(null)
  useEffect(() => {
    const history = getHistory()
    if (!history) return
    setBrowserLocation(locationToUrl(history.location))

    return history.listen(({ location }) =>
      setBrowserLocation(locationToUrl(location)),
    )
  }, [])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successfullySent, setSuccessfullySent] = useState(false)
  const [submissionFailed, setSubmissionFailed] = useState(false)

  if (isSubmitting) {
    return (
      <div className="form-container-widget text-center">
        <div className="rotate-icon">
          <i className="bi bi-arrow-repeat bi-2x" aria-hidden="true"></i>
        </div>{' '}
        <span className="text-super">{widget.get('submittingMessage')}</span>
      </div>
    )
  }

  if (successfullySent) {
    return (
      <div className="form-container-widget text-center">
        <i className="bi bi-check-lg bi-2x" aria-hidden="true"></i>{' '}
        <span className="text-super">{widget.get('submittedMessage')}</span>
      </div>
    )
  }

  if (submissionFailed) {
    return (
      <div className="form-container-widget text-center">
        <i
          className="bi bi-exclamation-triangle-fill bi-2x"
          aria-hidden="true"
        ></i>{' '}
        <span className="text-super">{widget.get('failedMessage')}</span>
      </div>
    )
  }

  return (
    <div className="form-container-widget">
      <form method="post" action={formEndpoint} onSubmit={onSubmit}>
        <input type="hidden" name="form_id" value={widget.get('formId')} />
        <input
          type="hidden"
          name="url"
          value={browserLocation || urlFor(widget.obj())}
        />
        <InPlaceEditingOff>
          <ContentTag content={widget} attribute="hiddenFields" />
        </InPlaceEditingOff>

        <HoneypotField />

        <ContentTag content={widget} attribute="content" />
      </form>
    </div>
  )

  async function onSubmit(element: React.FormEvent<HTMLFormElement>) {
    element.preventDefault()

    scrollIntoView(element.target)

    indicateProgress()
    try {
      await submit(element.target, formEndpoint)
      indicateSuccess()
    } catch (e) {
      setTimeout(() => {
        throw e
      }, 0)

      indicateFailure()
    }
  }

  function indicateProgress() {
    setIsSubmitting(true)
    setSuccessfullySent(false)
    setSubmissionFailed(false)
  }

  function indicateSuccess() {
    setIsSubmitting(false)
    setSuccessfullySent(true)
    setSubmissionFailed(false)
  }

  function indicateFailure() {
    setIsSubmitting(false)
    setSuccessfullySent(false)
    setSubmissionFailed(true)
  }
})

async function submit(formElement: unknown, formEndpoint: string) {
  if (!(formElement instanceof HTMLFormElement)) return

  const formData = new FormData(formElement)
  // @ts-expect-error TODO: Investigate why it is not working.
  const body = new URLSearchParams(formData)
  // console.log('submitting', Object.fromEntries(body.entries()))
  const response = await fetch(formEndpoint, { method: 'post', body })
  if (!response.ok) {
    throw new Error(
      `Response was not successful. Status code: ${response.status}.`,
    )
  }
}

const HoneypotField = () => (
  <div aria-hidden="true" className="winnie-the-pooh">
    <input autoComplete="off" role="presentation" name="fax" tabIndex={-1} />
  </div>
)

function locationToUrl(location: { pathname: string; search: string }): string {
  return `${window.location.origin}${location.pathname}${location.search}`
}
