import { connect, Obj, Widget, ContentTag, uiContext } from 'scrivito'
import './MultilineStringEditor.scss'

// Workaround until #9963 is resolved
export const MultilineStringEditor = connect(function MultilineStringEditor({
  attribute,
  content,
  description,
  title,
}: {
  attribute: string
  content: Obj | Widget
  title?: string
  description?: string
}) {
  const { theme } = uiContext() || { theme: null }
  if (!theme) return null

  return (
    <div className={`scrivito_${theme}`}>
      <div className="scrivito_detail_content">
        <div className="scrivito_detail_label">
          <span>{title}</span>
        </div>
        <ContentTag
          content={content}
          attribute={attribute}
          className="multi-string-editor"
        />
        <div className="scrivito_notice_body">{description}</div>
      </div>
    </div>
  )
})
