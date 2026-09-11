import {
  Obj,
  uiContext,
  connect,
  ImageTag,
  Widget,
  validationResultsFor,
  ContentTag,
} from 'scrivito'
import { TwitterPreview, FacebookPreview } from './SocialCardPreviews'
import './SocialCardsTab.scss'

export function SocialCardsTab({ obj }: { obj: Obj }) {
  const { theme } = uiContext() || { theme: null }
  if (!theme) return null

  return (
    <div className={`social-cards-tab scrivito_${theme}`}>
      <div className="scrivito_detail_content">
        <div className="row">
          <div className="col-sm-6">
            <TwitterInput obj={obj} />
          </div>
          <div className="col-sm-6">
            <TwitterPreview obj={obj} />
          </div>
        </div>
      </div>

      <div className="scrivito_detail_content">
        <div className="row">
          <div className="col-sm-6">
            <FacebookInput obj={obj} />
          </div>
          <div className="col-sm-6">
            <FacebookPreview obj={obj} />
          </div>
        </div>
      </div>
    </div>
  )
}

const TwitterInput = connect(({ obj }: { obj: Obj }) => (
  <div>
    <div className="scrivito_detail_label">
      <span className="headline">X Twitter Card</span>
    </div>
    <ContentProperty
      content={obj}
      attribute="tcCreator"
      title="Creator"
      description="Username of the content creator. Start with @"
    />
    <div className="scrivito_detail_label">
      <span>Image</span>
    </div>
    <ImageTag
      alt=""
      attribute="tcImage"
      className="social_card_img"
      content={obj}
    />
    <div className="scrivito_notice_body">Add or replace the image here.</div>
    <ContentProperty content={obj} attribute="tcTitle" title="Title" />
    <ContentProperty
      content={obj}
      attribute="tcDescription"
      title="Description"
      description="Limit to 200 characters"
    />
  </div>
))

const FacebookInput = connect(({ obj }) => (
  <div>
    <div className="scrivito_detail_label">
      <span className="headline">Facebook</span>
    </div>
    <div className="scrivito_detail_label">
      <span>Image</span>
    </div>
    <ImageTag
      alt=""
      attribute="ogImage"
      className="social_card_img"
      content={obj}
    />
    <div className="scrivito_notice_body">Add or replace the image here.</div>
    <ContentProperty
      content={obj}
      attribute="ogTitle"
      title="Title"
      description="Add a catchy title for the post."
    />
    <ContentProperty
      content={obj}
      attribute="ogDescription"
      title="Description"
      description="What is this post about and why would someone want to read it? Limit to 300 characters."
    />
  </div>
))

const ContentProperty = connect(
  ({
    content,
    attribute,
    title,
    description,
  }: {
    content: Obj | Widget
    attribute: string
    title: string
    description?: string
  }) => {
    const validationResults = validationResultsFor(content, attribute)
    const highestSeverity = findHighestSeverity(validationResults)
    const severityClass = highestSeverity ? `scrivito_${highestSeverity}` : ''

    return (
      <>
        <div className={`scrivito_detail_label ${severityClass}`}>
          {severityClass && (
            <i className="social_card_icon social_card_icon_error"></i>
          )}
          <span>{title}</span>
        </div>
        <div className={`content_property_input ${severityClass}`}>
          <ContentTag content={content} attribute={attribute} />
        </div>
        <div>
          {validationResults.map((v) => (
            <div
              key={`${v.severity}${v.message}`}
              className={`scrivito_validation_notice scrivito_${v.severity}`}
            >
              <span className="scrivito_validation_message">{v.message}</span>
            </div>
          ))}
        </div>
        {description && (
          <div className="scrivito_notice_body">{description}</div>
        )}
      </>
    )
  },
)

function findHighestSeverity(
  validationResults: {
    message: string
    severity: 'error' | 'warning' | 'info'
  }[],
) {
  const highestSeverityValidation =
    validationResults.find((v) => v.severity === 'error') ||
    validationResults.find((v) => v.severity === 'warning') ||
    validationResults.find((v) => v.severity === 'info')
  return highestSeverityValidation?.severity
}
