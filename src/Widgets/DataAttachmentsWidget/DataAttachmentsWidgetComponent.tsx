import {
  ContentTag,
  provideComponent,
  unstable_JrRestApi,
  useDataItem,
} from 'scrivito'
import { DataAttachmentsWidget } from './DataAttachmentsWidgetClass'

provideComponent(DataAttachmentsWidget, ({ widget }) => {
  const dataItem = useDataItem()
  const attachments = dataItem?.get(widget.get('attributeName'))
  if (!isAttachments(attachments)) return null
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
        <div key={attachment._id}>
          <a
            href="#"
            onClick={async (e) => {
              e.preventDefault()
              e.stopPropagation()
              // @ts-expect-error TODO: Provide better typing!
              const { accessToken } = await unstable_JrRestApi.fetch(
                `../pisa-api/binary-access-token/${attachment._id}`,
              )
              window.open(`${window.origin}/pisa-api${accessToken}`, '_blank')
            }}
          >
            {attachment.filename} ({attachment.contentType},{' '}
            {attachment.contentLength} bytes)
          </a>
        </div>
      ))}
    </div>
  )
})

interface Attachment {
  _id: string
  filename: string
  contentType: string
  contentLength: number
}

function isAttachments(input: unknown): input is Attachment[] {
  return Array.isArray(input) && input.every(isAttachment)
}

function isAttachment(input: unknown): input is Attachment {
  if (typeof input !== 'object' || input === null) return false
  const attachment = input as Attachment
  return (
    typeof attachment._id === 'string' &&
    typeof attachment.filename === 'string' &&
    typeof attachment.contentType === 'string' &&
    typeof attachment.contentLength === 'number'
  )
}
