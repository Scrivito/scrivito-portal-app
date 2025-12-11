import prettyBytes from 'pretty-bytes'
import { useState, useEffect } from 'react'
import { connect, currentLanguage } from 'scrivito'
import { FullDataBinary, dataBinaryToUrl } from '../utils/dataBinaryToUrl'

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

  const content = (
    <>
      <div className="box-preview">
        <BoxPreviewContent binaryUrl={binaryUrl} attachment={attachment} />
      </div>
      <div className="box-meta flex-row">
        <div className="d-flex flex-column flex-grow-1 min-vw-0">
          <span className="box-name text-truncate">{attachment.filename}</span>
          <span className="box-size">
            {prettyBytes(attachment.contentLength, {
              locale: currentLanguage() ?? 'en',
            })}
          </span>
        </div>
        {onDelete && (
          <div className="d-flex">
            <button
              className="btn btn-sm"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onDelete()
              }}
              title={getDeleteButtonMessage()}
            >
              <i className="bi bi-trash3"></i>
            </button>
          </div>
        )}
      </div>
    </>
  )

  return readonly ? (
    <div className="box-attachment">{content}</div>
  ) : (
    <a
      href={binaryUrl}
      target="_blank"
      rel="noreferrer"
      className="box-attachment"
      title={getDownloadMessage(attachment.filename)}
    >
      {content}
    </a>
  )
})

function BoxPreviewContent({
  binaryUrl,
  attachment,
}: {
  binaryUrl?: string
  attachment: FullDataBinary
}) {
  if (binaryUrl && attachment.contentType.startsWith('image/')) {
    return <img src={binaryUrl} alt="" />
  }

  let iconName = 'bi-file-earmark'
  const filename = attachment.filename
  if (filename.endsWith('.pdf')) iconName = 'bi-filetype-pdf'
  if (filename.endsWith('.docx')) iconName = 'bi-filetype-docx'
  if (filename.endsWith('.doc')) iconName = 'bi-filetype-doc'
  if (filename.endsWith('.csv')) iconName = 'bi-filetype-csv'
  if (filename.endsWith('.json')) iconName = 'bi-filetype-json'
  if (filename.endsWith('.xml')) iconName = 'bi-filetype-xml'
  if (filename.endsWith('.txt')) iconName = 'bi-filetype-txt'
  if (filename.endsWith('.md')) iconName = 'bi-filetype-md'

  return <i className={`bi ${iconName}`}></i>
}

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

function getDeleteButtonMessage() {
  switch (currentLanguage()) {
    case 'de':
      return 'Datei aus der Auswahl löschen'
    case 'fr':
      return 'Supprimer le fichier de la sélection'
    case 'pl':
      return 'Usuń plik z wyboru'
    default:
      return 'Delete file from selection'
  }
}
