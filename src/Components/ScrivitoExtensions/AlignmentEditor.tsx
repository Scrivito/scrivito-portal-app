import { connect } from 'scrivito'
import './AlignmentEditor/AlignmentEditor.scss'

export const AlignmentEditor = connect(function AlignmentEditor({
  attributeValue,
  readOnly,
  theme,
  updateAttributeValue,
}: {
  attributeValue: unknown
  readOnly: boolean
  theme: 'dark' | 'light' | null
  updateAttributeValue: (value: string) => void
}) {
  if (!theme) return null

  const initialClasses = readOnly
    ? ['gle-preview', 'p-0']
    : ['gle-preview', 'p-0', 'clickable']

  const startAlignmentClasses = [...initialClasses]
  const centerAlignmentClasses = [...initialClasses]
  const endAlignmentClasses = [...initialClasses]
  const stretchAlignmentClasses = [...initialClasses]

  switch (attributeValue) {
    case 'start':
      startAlignmentClasses.push('active')
      break
    case 'center':
      centerAlignmentClasses.push('active')
      break
    case 'end':
      endAlignmentClasses.push('active')
      break
    case 'stretch':
      stretchAlignmentClasses.push('active')
      break
    default:
      startAlignmentClasses.push('active')
      break
  }

  return (
    <div className={`alignment-editor ${`scrivito_${theme}`}`}>
      <div className="gle-preview-list">
        <div className="gle-preview-group">
          <button
            className={startAlignmentClasses.join(' ')}
            title="Content top aligned"
            disabled={readOnly}
            onClick={() => updateAttributeValue('start')}
          >
            <div className="grid-col-12">
              <span className="alignment" />
            </div>
          </button>

          <button
            className={centerAlignmentClasses.join(' ')}
            title="Content center aligned"
            disabled={readOnly}
            onClick={() => updateAttributeValue('center')}
          >
            <div className="grid-col-12">
              <span className="alignment center" />
            </div>
          </button>

          <button
            className={endAlignmentClasses.join(' ')}
            title="Content bottom aligned"
            disabled={readOnly}
            onClick={() => updateAttributeValue('end')}
          >
            <div className="grid-col-12">
              <span className="alignment bottom" />
            </div>
          </button>

          <button
            className={stretchAlignmentClasses.join(' ')}
            title="Content stretch (full height) aligned"
            disabled={readOnly}
            onClick={() => updateAttributeValue('stretch')}
          >
            <div className="grid-col-12">
              <span className="alignment fullHeight" />
            </div>
          </button>
        </div>
      </div>
      <AlignmentDescription attributeValue={attributeValue} />
    </div>
  )
})

function AlignmentDescription({ attributeValue }: { attributeValue: unknown }) {
  if (attributeValue !== 'stretch') return null

  return (
    <div className="scrivito_notice_body">
      Stretch (full height) only works with one box widget inside a column.
    </div>
  )
}
