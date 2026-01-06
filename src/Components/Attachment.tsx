import { useState, useEffect, useRef } from 'react'
import { connect, currentLanguage } from 'scrivito'
import { FullDataBinary, dataBinaryToUrl } from '../utils/dataBinaryToUrl'
import { BoxAttachment } from './BoxAttachment'

export const Attachment = connect(function Attachment({
  attachment,
  onDelete,
  readonly,
}: {
  attachment: FullDataBinary
  onDelete?: () => void
  readonly?: boolean
}) {
  const [binaryUrl, setBinaryUrl] = useState<string | undefined>(undefined)
  const [trigger, setTrigger] = useState<number>(0)
  const cleanupRef = useRef<(() => void) | undefined>(undefined)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    dataBinaryToUrl(attachment).then(({ url, maxAge, cleanup }) => {
      cleanupRef.current?.()
      cleanupRef.current = cleanup
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
      cleanupRef.current?.()
    }
  }, [attachment, trigger])

  const core = (
    <BoxAttachment
      binaryUrl={binaryUrl}
      filename={attachment.filename}
      contentType={attachment.contentType}
      contentLength={attachment.contentLength}
      onDelete={onDelete}
    />
  )

  return readonly ? (
    core
  ) : (
    <a
      href={binaryUrl}
      target="_blank"
      rel="noreferrer"
      title={getDownloadMessage(attachment.filename)}
    >
      {core}
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
