import { connect, getInstanceId, uiContext } from 'scrivito'
import { ContentProperty } from '../../Components/ScrivitoExtensions/ContentProperty'

export const FormIdComponent = connect(({ widget }) => {
  const formSubmissionsHref = widget.get('formId')
    ? `https://edit.neoletter.com/i/${getInstanceId()}/forms/${widget.get('formId')}`
    : undefined
  const { theme } = uiContext() || { theme: null }
  if (!theme) return null

  return (
    <div className={`scrivito_${theme}`}>
      <div className="scrivito_detail_content">
        <div className="attribute_form_id_item">
          <ContentProperty
            content={widget}
            attribute="formId"
            title="Form ID"
            description="This ID identifies the form in Neoletter."
          />

          <a
            className={`scrivito_button ${
              formSubmissionsHref ? 'scrivito_blue' : 'scrivito_disabled'
            }`}
            href={formSubmissionsHref}
            target="_blank"
            rel="noreferrer"
          >
            View submissions
          </a>
        </div>
      </div>
    </div>
  )
})
