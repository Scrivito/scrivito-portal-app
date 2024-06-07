import { ContentTag, connect, provideComponent, useData } from 'scrivito'
import { DataAttachmentsWidget } from './DataAttachmentsWidgetClass'
import {
  dataBinaryToUrl,
  FullDataBinary,
  isFullDataBinary,
} from '../../utils/dataBinaryToUrl'
import { useEffect, useState } from 'react'
import prettyBytes from 'pretty-bytes'
import { getCurrentLanguage } from '../../utils/currentLanguage'

provideComponent(DataAttachmentsWidget, ({ widget }) => {
  const dataItemAttribute = useData().dataItemAttribute()
  const value = dataItemAttribute?.get()
  const attachments = isFullDataBinary(value) ? [value] : value
  if (!isFullBinaryArray(attachments)) return null
  if (attachments.length === 0) return null

  return (
    <div>
      <ContentTag
        content={widget}
        attribute="label"
        tag="label"
        className="mt-2 text-bold opacity-60 text-extra-small text-uppercase"
      />
      <div className="d-flex flex-wrap mt-2 gap-2">
        {attachments.map((attachment) => (
          <Attachment attachment={attachment} key={attachment._id} />
        ))}
      </div>
    </div>
  )
})

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
      timeoutId = setTimeout(() => setTrigger(Date.now()), maxAge * 1000)
    })

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [attachment, trigger])

  return (
    <a
      href={binaryUrl}
      className="box-attachment"
      title={`Download ${attachment.filename}`}
    >
      <div className="box-preview">
        <BoxPreviewContent binaryUrl={binaryUrl} attachment={attachment} />
      </div>
      <div className="box-meta">
        <span className="box-name">{attachment.filename}</span>
        <span className="box-size">
          {prettyBytes(attachment.contentLength, {
            locale: getCurrentLanguage(),
          })}
        </span>
      </div>
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
    return <img src={binaryUrl} />
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

function isFullBinaryArray(input: unknown): input is FullDataBinary[] {
  return Array.isArray(input) && input.every(isFullDataBinary)
}
