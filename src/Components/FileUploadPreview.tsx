import { useState, useEffect } from 'react'
import { connect } from 'scrivito'
import { BoxAttachment } from './BoxAttachment'

export const FileUploadPreview = connect(function FileUploadPreview({
  file,
  onDelete,
}: {
  file: File
  onDelete: () => void
}) {
  const [binaryUrl, setBinaryUrl] = useState<string | undefined>(undefined)

  useEffect(() => {
    const url = URL.createObjectURL(file)
    setBinaryUrl(url)

    return () => URL.revokeObjectURL(url)
  }, [file])

  return (
    <BoxAttachment
      binaryUrl={binaryUrl}
      filename={file.name}
      contentType={file.type}
      contentLength={file.size}
      onDelete={onDelete}
    />
  )
})
