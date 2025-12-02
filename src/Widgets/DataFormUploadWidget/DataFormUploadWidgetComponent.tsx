import {
  ContentTag,
  currentLanguage,
  InPlaceEditingOff,
  provideComponent,
  useData,
} from 'scrivito'
import { DataFormUploadWidget } from './DataFormUploadWidgetClass'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { useDropzone, type FileRejection } from 'react-dropzone'
import { Attachment } from '../../Components/Attachment'
import { useCallback, useEffect, useState } from 'react'
import prettyBytes from 'pretty-bytes'
import { pseudoRandom32CharHex } from '../../utils/pseudoRandom32CharHex'

const MAX_FILE_SIZE = 50 * 1000 * 1000

provideComponent(DataFormUploadWidget, ({ widget }) => {
  const id = [
    'DataFormUploadWidget',
    widget.id(),
    useData().dataItem()?.id(),
  ].join('-')
  const attributeName = useData().attributeName()
  const [attachments, setAttachments] = useState<
    Array<{ file: File; key: string }>
  >([])
  const [rejectionErrors, setRejectionErrors] = useState<{
    tooLarge: boolean
    tooMany: boolean
  }>({ tooLarge: false, tooMany: false })

  const onDropAccepted = useCallback(
    () => setRejectionErrors({ tooLarge: false, tooMany: false }),
    [],
  )
  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    const allErrors = fileRejections.flatMap((rejection) =>
      rejection.errors.map((error) => error.code),
    )
    const unknownErrors = allErrors.filter(
      (code) => !['file-too-large', 'too-many-files'].includes(code),
    )

    if (unknownErrors.length > 0) {
      throw new Error(
        `Unknown file rejection error codes: ${unknownErrors.join(', ')}`,
      )
    }

    setRejectionErrors({
      tooLarge: allErrors.includes('file-too-large'),
      tooMany: allErrors.includes('too-many-files'),
    })
  }, [])

  const { getRootProps, getInputProps, inputRef, isDragActive } = useDropzone({
    maxFiles: 10,
    maxSize: MAX_FILE_SIZE,
    onDropAccepted,
    onDropRejected,
    onDrop: (acceptedFiles) => {
      setAttachments((prevAttachments) => [
        ...prevAttachments,
        ...acceptedFiles.map((file) => ({
          file,
          key: pseudoRandom32CharHex(),
        })),
      ])
    },
  })

  useEffect(() => {
    if (!inputRef.current) return

    const dataTransfer = new DataTransfer()
    attachments.forEach((attachment) => dataTransfer.items.add(attachment.file))

    inputRef.current.files = dataTransfer.files
  }, [attachments, inputRef])

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
      {rejectionErrors.tooLarge && (
        <div>
          <i className="bi bi-exclamation-diamond" aria-hidden="true" />{' '}
          {getTooLargeMessage()}
        </div>
      )}
      {rejectionErrors.tooMany && (
        <div>
          <i className="bi bi-exclamation-diamond" aria-hidden="true" />{' '}
          {getTooManyFilesMessage()}
        </div>
      )}
      <div>
        <div className="d-flex flex-wrap mt-2 gap-1">
          {attachments.map(({ file, key }) => (
            <Attachment
              attachment={{
                _id: key,
                contentLength: file.size,
                contentType: file.type,
                file,
                filename: file.name,
              }}
              key={key}
              onDelete={() => {
                setAttachments((prevAttachments) =>
                  prevAttachments.filter(
                    (attachment) => attachment.key !== key,
                  ),
                )
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

function getTooManyFilesMessage() {
  switch (currentLanguage()) {
    case 'de':
      return 'Zu viele Dateien ausgewählt. Bitte wählen Sie maximal 10 Dateien aus.'
    case 'fr':
      return 'Trop de fichiers sélectionnés. Veuillez sélectionner 10 fichiers maximum.'
    case 'pl':
      return 'Wybrano zbyt wiele plików. Proszę wybrać maksymalnie 10 plików.'
    default:
      return 'Too many files selected. Please select a maximum of 10 files.'
  }
}
