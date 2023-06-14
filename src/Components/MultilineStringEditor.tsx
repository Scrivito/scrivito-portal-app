import * as Scrivito from 'scrivito'
import './MultilineStringEditor.scss'

// Workaround until #9963 is resolved
export const MultilineStringEditor = Scrivito.connect(
  function MultilineStringEditor({
    attribute,
    content,
    description,
    title,
  }: {
    attribute: string
    content: Scrivito.Obj | Scrivito.Widget
    title?: string
    description?: string
  }) {
    const uiContext = Scrivito.uiContext()
    if (!uiContext) return null

    return (
      <div className={`scrivito_${uiContext.theme}`}>
        <div className="scrivito_detail_content">
          <div className="scrivito_detail_label">
            <span>{title}</span>
          </div>
          <Scrivito.ContentTag
            content={content}
            attribute={attribute}
            className="multi-string-editor"
            tag="pre"
          />
          <div className="scrivito_notice_body">{description}</div>
        </div>
      </div>
    )
  }
)
