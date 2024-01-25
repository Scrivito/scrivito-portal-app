import { ContentTag, provideComponent, useDataItem } from 'scrivito'
import { DataAttachmentsWidget } from './DataAttachmentsWidgetClass'
import {
  PisaBinary,
  isPisaBinary,
  pisaBinaryToUrl,
} from '../../utils/pisaBinaryToUrl'
import { useEffect, useState } from 'react'
import prettyBytes from 'pretty-bytes'

provideComponent(DataAttachmentsWidget, ({ widget }) => {
  const dataItem = useDataItem()
  const attachments = dataItem?.get(widget.get('attributeName'))
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
      <div className="d-flex flex-wrap mt-2 gap-1">
        {attachments.map((attachment) => (
          <Attachment attachment={attachment} key={attachment._id} />
        ))}
      </div>
    </div>
  )
})

function Attachment({ attachment }: { attachment: PisaBinary }) {
  const [binaryUrl, setBinaryUrl] = useState<string | undefined>(undefined)
  useEffect(() => {
    pisaBinaryToUrl(attachment).then(({ url }) => setBinaryUrl(url))
    // TODO implement "maxAge"
  }, [attachment])

  return (
    <a
      href={binaryUrl}
      className="box-attachment"
      title={`Download ${attachment.filename}`}
    >
      <div className="box-preview">
        {binaryUrl && attachment.contentType.startsWith('image/') ? (
          <img src={binaryUrl} />
        ) : (
          <i className="bi bi-file-earmark"></i>
        )}
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

function isBinaryArray(input: unknown): input is PisaBinary[] {
  return Array.isArray(input) && input.every(isPisaBinary)
}
