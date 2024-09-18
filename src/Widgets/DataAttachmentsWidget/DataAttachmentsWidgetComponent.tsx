import { ContentTag, provideComponent, useData } from 'scrivito'
import { DataAttachmentsWidget } from './DataAttachmentsWidgetClass'
import { FullDataBinary, isFullDataBinary } from '../../utils/dataBinaryToUrl'
import { Attachment } from '../../Components/Attachment'

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

function isFullBinaryArray(input: unknown): input is FullDataBinary[] {
  return Array.isArray(input) && input.every(isFullDataBinary)
}
