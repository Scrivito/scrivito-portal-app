import { ContentTag, provideComponent, useDataItem } from 'scrivito'
import { DataAttachmentsWidget } from './DataAttachmentsWidgetClass'
import {
  DataBinary,
  isDataBinary,
  dataBinaryToUrl,
} from '../../utils/dataBinaryToUrl'
import { useEffect, useState } from 'react'
import prettyBytes from 'pretty-bytes'

provideComponent(DataAttachmentsWidget, ({ widget }) => {
  const dataItem = useDataItem()
  const value = dataItem?.get(widget.get('attributeName'))
  const attachments = isDataBinary(value) ? [value] : value
  if (!isBinaryArray(attachments)) return null
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

function Attachment({ attachment }: { attachment: DataBinary }) {
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
          {prettyBytes(attachment.contentLength, { locale: 'en' })}
        </span>
      </div>
    </a>
  )
}

function BoxPreviewContent({
  binaryUrl,
  attachment,
}: {
  binaryUrl?: string
  attachment: DataBinary
}) {
  if (binaryUrl && attachment.contentType.startsWith('image/')) {
    return <img src={binaryUrl} />
  }

  return <i className="bi bi-file-earmark"></i>
}

function isBinaryArray(input: unknown): input is DataBinary[] {
  return Array.isArray(input) && input.every(isDataBinary)
}
