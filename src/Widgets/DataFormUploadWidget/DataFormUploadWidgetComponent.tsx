import {
  ContentTag,
  currentLanguage,
  InPlaceEditingOff,
  provideComponent,
} from 'scrivito'
import { DataFormUploadWidget } from './DataFormUploadWidgetClass'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import { Attachment } from '../../Components/Attachment'
import { useCallback, useEffect, useState } from 'react'
import prettyBytes from 'pretty-bytes'

const MAX_FILE_SIZE = 50 * 1000 * 1000

provideComponent(DataFormUploadWidget, ({ widget }) => {
  const id = ['DataFormUploadWidget', widget.id()].join('-')
  const attributeName = widget.get('attributeName')
  const [isTooLarge, setIsTooLarge] = useState(false)

  const onDropAccepted = useCallback(() => setIsTooLarge(false), [])
  const onDropRejected = useCallback(() => setIsTooLarge(true), [])

  const { acceptedFiles, getRootProps, getInputProps, inputRef } = useDropzone({
    maxSize: MAX_FILE_SIZE,
    onDropAccepted,
    onDropRejected,
  })

  useEffect(() => {
    if (!inputRef.current) return

    const dataTransfer = new DataTransfer()
    acceptedFiles.forEach((file) => dataTransfer.items.add(file))

    inputRef.current.files = dataTransfer.files
  }, [acceptedFiles, inputRef])

  const attachments = acceptedFiles.map((file) => ({
    _id: file.name,
    contentLength: file.size,
    contentType: file.type,
    file,
    filename: file.name,
  }))

  return (
    <div className="mb-3" key={[id, attributeName].join('-')}>
      <ContentTag
        content={widget}
        attribute="label"
        tag="label"
        className="form-label"
        htmlFor={id}
      />

      {widget.get('required') ? (
        <OverlayTrigger
          placement="top"
          overlay={
            <Popover>
              <Popover.Body>mandatory</Popover.Body>
            </Popover>
          }
        >
          <span className="text-mandatory">*</span>
        </OverlayTrigger>
      ) : null}

      {widget.get('helpText') ? (
        <>
          {' '}
          <OverlayTrigger
            placement="top"
            overlay={
              <Popover>
                <Popover.Body>
                  <InPlaceEditingOff>
                    <ContentTag content={widget} attribute="helpText" />
                  </InPlaceEditingOff>
                </Popover.Body>
              </Popover>
            }
          >
            <i className="bi bi-question-circle"></i>
          </OverlayTrigger>
        </>
      ) : null}

      <div
        {...getRootProps({
          className: 'dropzone form-control',
          style: { cursor: 'pointer' },
        })}
      >
        <input
          {...getInputProps({
            id,
            multiple: widget.get('multiple'),
            name: attributeName,
            required: widget.get('required'),
          })}
        />
        {getDropMessage(widget.get('multiple'))}
      </div>
      {isTooLarge && (
        <div>
          <i className="bi bi-exclamation-diamond" aria-hidden="true" />{' '}
          {getTooLargeMessage()}
        </div>
      )}
      <div>
        <div className="d-flex flex-wrap mt-2 gap-2">
          {attachments.map((attachment) => (
            <Attachment attachment={attachment} key={attachment._id} />
          ))}
        </div>
      </div>
    </div>
  )
})

function getDropMessage(multiple: boolean) {
  if (multiple) {
    switch (currentLanguage()) {
      case 'de':
        return 'Dateien auswählen oder hierher ziehen.'
      default:
        return 'Choose files or drag them here.'
    }
  }

  switch (currentLanguage()) {
    case 'de':
      return 'Datei auswählen oder hierher ziehen.'
    default:
      return 'Choose a file or drag it here.'
  }
}

function getTooLargeMessage() {
  switch (currentLanguage()) {
    case 'de':
      return `Eine oder mehrere Dateien sind zu groß. Bitte Dateien bis maximal ${prettyBytes(
        MAX_FILE_SIZE,
        { locale: 'de' },
      )} hochladen.`
    default:
      return `One or more files are too large. Please upload files up to ${prettyBytes(
        MAX_FILE_SIZE,
        { locale: 'en' },
      )} in size.`
  }
}
