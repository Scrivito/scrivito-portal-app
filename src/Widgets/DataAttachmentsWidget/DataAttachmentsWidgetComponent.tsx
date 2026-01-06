import {
  connect,
  ContentTag,
  currentLanguage,
  provideComponent,
  useData,
} from 'scrivito'
import { DataAttachmentsWidget } from './DataAttachmentsWidgetClass'
import {
  dataBinaryToUrl,
  FullDataBinary,
  isFullDataBinary,
} from '../../utils/dataBinaryToUrl'
import { useEffect, useState } from 'react'
import { BoxAttachment } from '../../Components/BoxAttachment'

provideComponent(DataAttachmentsWidget, ({ widget }) => {
  const value = useData().dataItemAttribute()?.get()
  const attachments = isFullDataBinary(value) ? [value] : value
  if (!isFullBinaryArray(attachments)) return null
  if (attachments.length === 0) return null

  return (
    <div>
      <ContentTag
        content={widget}
        attribute="label"
        tag="label"
        className="mt-2 text-bold text-extra-small text-uppercase"
      />
      <div className="d-flex flex-wrap mt-2 gap-2">
        {attachments.map((attachment) => (
          <Attachment attachment={attachment} key={attachment._id} />
        ))}
      </div>
    </div>
  )
})

function isFullBinaryArray(input: unknown): input is FullDataBinary[] {
  return Array.isArray(input) && input.every(isFullDataBinary)
}

const Attachment = connect(function Attachment({
  attachment,
}: {
  attachment: FullDataBinary
}) {
  const [binaryUrl, setBinaryUrl] = useState<string | undefined>(undefined)
  const [trigger, setTrigger] = useState<number>(0)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    dataBinaryToUrl(attachment).then(({ url, maxAge }) => {
      setBinaryUrl(url)

      // setTimeout has a maximum delay of 2^31-1 ms (~24.8 days)
      // If delay exceeds this, it wraps to 1ms, causing immediate re-trigger
      const MAX_TIMEOUT_DELAY = 2147483647
      timeoutId = setTimeout(
        () => setTrigger(Date.now()),
        Math.min(maxAge * 1000, MAX_TIMEOUT_DELAY),
      )
    })

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [attachment, trigger])

  return (
    <a
      href={binaryUrl}
      target="_blank"
      rel="noreferrer"
      title={getDownloadMessage(attachment.filename)}
    >
      <BoxAttachment
        binaryUrl={binaryUrl}
        filename={attachment.filename}
        contentType={attachment.contentType}
        contentLength={attachment.contentLength}
      />
    </a>
  )
})

function getDownloadMessage(subject: string) {
  switch (currentLanguage()) {
    case 'de':
      return `${subject} herunterladen`
    case 'fr':
      return `Télécharger ${subject}`
    case 'pl':
      return `Pobierz ${subject}`
    default:
      return `Download ${subject}`
  }
}
