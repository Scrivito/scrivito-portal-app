import prettyBytes from 'pretty-bytes'
import { useState, useEffect } from 'react'
import { connect, currentLanguage } from 'scrivito'
import { FullDataBinary, dataBinaryToUrl } from '../utils/dataBinaryToUrl'

export const Attachment = connect(function Attachment({
  attachment,
  readonly,
}: {
  attachment: FullDataBinary
  readonly?: boolean
}) {
  const [binaryUrl, setBinaryUrl] = useState<string | undefined>(undefined)
  const [trigger, setTrigger] = useState<number>(0)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    dataBinaryToUrl(attachment).then(({ url, maxAge }) => {
      setBinaryUrl(url)
      timeoutId = setTimeout(() => setTrigger(Date.now()), maxAge * 1000)
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
      <div className="box-meta">
        <span className="box-name">{attachment.filename}</span>
        <span className="box-size">
          {prettyBytes(attachment.contentLength, {
            locale: currentLanguage() ?? 'en',
          })}
        </span>
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
