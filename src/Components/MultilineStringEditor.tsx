import * as Scrivito from 'scrivito'

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
          <span className="scrivito_detail_label">{title}</span>
          <span className="scrivito_notice_body">{description}</span>

          <Scrivito.ContentTag
            content={content}
            attribute={attribute}
            style={{ border: '2px dotted grey' }}
            tag="pre"
          />
        </div>
      </div>
    )
  }
)
