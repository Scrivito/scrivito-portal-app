import { ContentTag, provideComponent, useDataItem } from 'scrivito'
import { DataAttachmentsWidget } from './DataAttachmentsWidgetClass'
import {
  PisaBinary,
  isPisaBinary,
  pisaBinaryToUrl,
} from '../../utils/pisaBinaryToUrl'
import { useEffect, useState } from 'react'
import prettyBytes from 'pretty-bytes'
import { last } from 'lodash-es'

provideComponent(DataAttachmentsWidget, ({ widget }) => {
  const dataItem = useDataItem()
  const attachments = dataItem?.get(widget.get('attributeName'))
  if (!isBinaryArray(attachments)) return null
  if (attachments.length === 0) return null

  return (
    <div>
      <br />
      <ContentTag
        content={widget}
        attribute="label"
        tag="label"
        className="text-bold opacity-60 text-extra-small text-uppercase"
      />
      {attachments.map((attachment) => (
        <Attachment attachment={attachment} key={attachment._id} />
      ))}
    </div>
  )
})

function Attachment({ attachment }: { attachment: PisaBinary }) {
  const [binaryUrl, setBinaryUrl] = useState<string | undefined>(undefined)
  useEffect(() => {
    pisaBinaryToUrl(attachment).then(setBinaryUrl)
  }, [attachment])

  return (
    <div key={attachment._id}>
      <a href={binaryUrl}>{attachment.filename}</a>
      <span className="list-value text-muted text-small text-multiline">
        {last(attachment.contentType.split('/'))?.toUpperCase()},{' '}
        {prettyBytes(attachment.contentLength, { locale: 'en' })}
      </span>
    </div>
  )
}

function isBinaryArray(input: unknown): input is PisaBinary[] {
  return Array.isArray(input) && input.every(isPisaBinary)
}
