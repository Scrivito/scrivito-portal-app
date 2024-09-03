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
import { useEffect } from 'react'

provideComponent(DataFormUploadWidget, ({ widget }) => {
  const id = ['DataFormUploadWidget', widget.id()].join('-')
  const attributeName = widget.get('attributeName')

  const { acceptedFiles, getRootProps, getInputProps, inputRef } = useDropzone()

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

      <div {...getRootProps({ className: 'dropzone' })}>
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
  switch (currentLanguage()) {
    case 'de':
      return `Wählen oder legen Sie ${multiple ? 'Dateien' : 'eine Datei'} hier ab.`
    default:
      return `Choose or drop ${multiple ? 'files' : 'a file'} here.`
  }
}
