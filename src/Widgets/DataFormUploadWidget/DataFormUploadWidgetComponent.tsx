import { setupVisitorI18n } from '../../i18n'
import {
  connect,
  ContentTag,
  currentLanguage,
  InPlaceEditingOff,
  provideComponent,
  useData,
} from 'scrivito'
import { DataFormUploadWidget } from './DataFormUploadWidgetClass'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import { useCallback, useEffect, useState } from 'react'
import prettyBytes from 'pretty-bytes'
import { pseudoRandom32CharHex } from '../../utils/pseudoRandom32CharHex'
import { BoxAttachment } from '../../Components/BoxAttachment'
import { simpleErrorToast } from '../../Data/CurrentUser/errorToast'
import messages from './i18n.visitor.json'

const t = setupVisitorI18n(messages)

const MAX_FILE_SIZE = 50 * 1000 * 1000
const MAX_FILE_COUNT = 10

provideComponent(DataFormUploadWidget, ({ widget }) => {
  const id = [
    'DataFormUploadWidget',
    widget.id(),
    useData().dataItem()?.id(),
  ].join('-')
  const attributeName = useData().attributeName()
  const [state, setState] = useState<{
    files: Array<{ file: File; key: string }>
    tooLargeFiles: string[]
    tooManyFiles: boolean
  }>({
    files: [],
    tooLargeFiles: [],
    tooManyFiles: false,
  })

  const onDrop = useCallback((droppedFiles: File[]) => {
    const tooLargeFiles: string[] = []
    const acceptedFiles = droppedFiles.filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        tooLargeFiles.push(file.name)
        return false
      }

      return true
    })

    setState((prevState) => {
      const availableSlots = MAX_FILE_COUNT - prevState.files.length
      const filesToAdd = acceptedFiles.slice(0, availableSlots)
      const tooManyFiles = acceptedFiles.length > availableSlots

      return {
        files: [
          ...prevState.files,
          ...filesToAdd.map((file) => ({
            file,
            key: pseudoRandom32CharHex(),
          })),
        ],
        tooLargeFiles: tooManyFiles ? [] : tooLargeFiles,
        tooManyFiles,
      }
    })
  }, [])

  const { getRootProps, getInputProps, inputRef, isDragActive } = useDropzone({
    onDrop,
  })

  useEffect(() => {
    if (!inputRef.current) return

    state.tooLargeFiles.forEach((filename) => {
      simpleErrorToast(getTooLargeMessage(filename))
    })

    if (state.tooManyFiles) {
      simpleErrorToast(getTooManyFilesMessage())
    }

    const dataTransfer = new DataTransfer()
    state.files.forEach((item) => dataTransfer.items.add(item.file))

    inputRef.current.files = dataTransfer.files
  }, [state, inputRef])

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
      <div>
        <div className="d-flex flex-wrap mt-2 gap-1">
          {state.files.map(({ file, key }) => (
            <FileUploadPreview
              file={file}
              key={key}
              onDelete={() => {
                setState((prevState) => ({
                  files: prevState.files.filter((item) => item.key !== key),
                  tooLargeFiles: [],
                  tooManyFiles: false,
                }))
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
})

function getDropMessage(multiple: boolean) {
  return multiple ? t('dropMultiple') : t('dropSingle')
}

function getTooLargeMessage(filename: string) {
  const locale = currentLanguage() ?? 'en'
  const maxFileSize = prettyBytes(MAX_FILE_SIZE, { locale })
  return t('tooLarge', { filename, maxFileSize })
}

function getTooManyFilesMessage() {
  return t('tooMany', { maxFileCount: MAX_FILE_COUNT })
}

const FileUploadPreview = connect(function FileUploadPreview({
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
