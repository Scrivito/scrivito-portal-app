import prettyBytes from 'pretty-bytes'
import { connect, currentLanguage } from 'scrivito'

export const BoxAttachment = connect(function BoxAttachment({
  binaryUrl,
  filename,
  contentType,
  contentLength,
  onDelete,
}: {
  binaryUrl?: string
  filename: string
  contentType: string
  contentLength: number
  onDelete?: () => void
}) {
  return (
    <div className="box-attachment">
      <div className="box-preview">
        <BoxPreviewContent
          binaryUrl={binaryUrl}
          contentType={contentType}
          filename={filename}
        />
      </div>
      <div className="box-meta flex-row">
        <div className="d-flex flex-column flex-grow-1 min-vw-0">
          <span className="box-name text-truncate">{filename}</span>
          <span className="box-size">
            {prettyBytes(contentLength, {
              locale: currentLanguage() ?? 'en',
            })}
          </span>
        </div>
        {onDelete && (
          <div className="d-flex">
            <button
              className="btn btn-sm"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onDelete()
              }}
              title={getDeleteButtonMessage()}
            >
              <i className="bi bi-trash3"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  )
})

function BoxPreviewContent({
  binaryUrl,
  contentType,
  filename,
}: {
  binaryUrl?: string
  contentType: string
  filename: string
}) {
  if (binaryUrl && contentType.startsWith('image/')) {
    return <img src={binaryUrl} alt="" />
  }

  let iconName = 'bi-file-earmark'
  if (filename.endsWith('.pdf')) iconName = 'bi-filetype-pdf'
  if (filename.endsWith('.docx')) iconName = 'bi-filetype-docx'
  if (filename.endsWith('.doc')) iconName = 'bi-filetype-doc'
  if (filename.endsWith('.csv')) iconName = 'bi-filetype-csv'
  if (filename.endsWith('.json')) iconName = 'bi-filetype-json'
  if (filename.endsWith('.xml')) iconName = 'bi-filetype-xml'
  if (filename.endsWith('.txt')) iconName = 'bi-filetype-txt'
  if (filename.endsWith('.md')) iconName = 'bi-filetype-md'

  return <i className={`bi ${iconName}`}></i>
}

function getDeleteButtonMessage() {
  switch (currentLanguage()) {
    case 'de':
      return 'Datei aus der Auswahl löschen'
    case 'fr':
      return 'Supprimer le fichier de la sélection'
    case 'pl':
      return 'Usuń plik z wyboru'
    default:
      return 'Delete file from selection'
  }
}
