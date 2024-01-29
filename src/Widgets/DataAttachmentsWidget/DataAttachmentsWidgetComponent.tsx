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

function isBinaryArray(input: unknown): input is DataBinary[] {
  return Array.isArray(input) && input.every(isDataBinary)
}
