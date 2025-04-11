import {
  ContentTag,
  currentLanguage,
  InPlaceEditingOff,
  provideComponent,
  useData,
} from 'scrivito'
import { DataFormUploadWidget } from './DataFormUploadWidgetClass'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import { Attachment } from '../../Components/Attachment'
import { useCallback, useEffect, useState } from 'react'
import prettyBytes from 'pretty-bytes'

const MAX_FILE_SIZE = 50 * 1000 * 1000

provideComponent(DataFormUploadWidget, ({ widget }) => {
  const id = [
    'DataFormUploadWidget',
    widget.id(),
    useData().dataItem()?.id(),
  ].join('-')
  const attributeName = useData().attributeName()
  const [files, setFiles] = useState<File[]>([])
  const [isTooLarge, setIsTooLarge] = useState(false)

  const onDropAccepted = useCallback(() => setIsTooLarge(false), [])
  const onDropRejected = useCallback(() => setIsTooLarge(true), [])

  const { getRootProps, getInputProps, inputRef, isDragActive } = useDropzone({
    maxSize: MAX_FILE_SIZE,
    onDropAccepted,
    onDropRejected,
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) => {
        const newFiles = acceptedFiles.filter((newFile) => {
          return !prevFiles.some(
            (existingFile) =>
              existingFile.lastModified === newFile.lastModified &&
              existingFile.name === newFile.name &&
              existingFile.size === newFile.size &&
              existingFile.type === newFile.type,
          )
        })

        return [...prevFiles, ...newFiles]
      })
    },
  })

  useEffect(() => {
    if (!inputRef.current) return

    const dataTransfer = new DataTransfer()
    files.forEach((file) => dataTransfer.items.add(file))

    inputRef.current.files = dataTransfer.files
  }, [files, inputRef])

  const attachments = [...files].map((file) => ({
    _id: [file.lastModified, file.name, file.size, file.type].join('-'),
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
          className: `dropzone form-control${isDragActive ? ' drag-active' : ''}`,
        })}
      >
        <input
          {...getInputProps({
            id,
            multiple: widget.get('multiple'),
            name: attributeName ?? '',
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
        <div className="d-flex flex-wrap mt-2 gap-1">
          {attachments.map((attachment, index) => (
            <Attachment
              attachment={attachment}
              key={attachment._id}
              onDelete={() => {
                setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
              }}
              readonly
            />
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
      case 'fr':
        return 'Choisissez des fichiers ou glissez-les ici.'
      case 'pl':
        return 'Wybierz pliki lub przeciągnij je tutaj.'
      default:
        return 'Choose files or drag them here.'
    }
  }

  switch (currentLanguage()) {
    case 'de':
      return 'Datei auswählen oder hierher ziehen.'
    case 'fr':
      return 'Choisissez un fichier ou glissez-le ici.'
    case 'pl':
      return 'Wybierz plik lub przeciągnij go tutaj.'
    default:
      return 'Choose a file or drag it here.'
  }
}

function getTooLargeMessage() {
  switch (currentLanguage()) {
    case 'de':
      return `Eine oder mehrere Dateien sind zu groß. Bitte laden Sie Dateien bis maximal ${prettyBytes(
        MAX_FILE_SIZE,
        { locale: 'de' },
      )} hoch.`
    case 'fr':
      return `Un ou plusieurs fichiers sont trop volumineux. Veuillez télécharger des fichiers d'une taille maximale de ${prettyBytes(
        MAX_FILE_SIZE,
        { locale: 'fr' },
      )}.`
    case 'pl':
      return `Za duży rozmiar pliku lub plików. Maksymalny rozmiar to ${prettyBytes(
        MAX_FILE_SIZE,
        { locale: 'pl' },
      )}.`
    default:
      return `One or more files are too large. Please upload files up to ${prettyBytes(
        MAX_FILE_SIZE,
        { locale: 'en' },
      )} in size.`
  }
}
