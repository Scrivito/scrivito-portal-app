import { useState, useEffect, useRef } from 'react'
import { connect } from 'scrivito'
import { fileToObjectUrl } from '../utils/fileToObjectUrl'
import { BoxAttachment } from './BoxAttachment'

export const FileUploadPreview = connect(function FileUploadPreview({
  file,
  onDelete,
}: {
  file: File
  onDelete: () => void
}) {
  const [binaryUrl, setBinaryUrl] = useState<string | undefined>(undefined)
  const cleanupRef = useRef<(() => void) | undefined>(undefined)

  useEffect(() => {
    const { url, cleanup } = fileToObjectUrl(file)
    cleanupRef.current?.()
    cleanupRef.current = cleanup
    setBinaryUrl(url)

    return () => {
      cleanupRef.current?.()
    }
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
