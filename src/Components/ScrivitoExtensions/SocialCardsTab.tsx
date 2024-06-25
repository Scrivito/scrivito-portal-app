import {
  Obj,
  uiContext,
  connect,
  ImageTag,
  Widget,
  validationResultsFor,
  ContentTag,
} from 'scrivito'
import { getMetadata } from '../../utils/getMetadata'
import './SocialCardsTab.scss'

export function SocialCardsTab({ obj }: { obj: Obj }) {
  const uiCtx = uiContext()
  if (!uiCtx) return null

  return (
    <div className={`scrivito_${uiCtx.theme}`}>
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
      <span className="headline">Twitter</span>
    </div>
    <ContentProperty
      content={obj}
      attribute="tcCreator"
      title="Creator"
      description="Twitter handle of the tweet creator. Start with @"
    />
    <div className="scrivito_detail_label">
      <span>Image</span>
    </div>
    <ImageTag content={obj} attribute="tcImage" className="social_card_img" />
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
    <ImageTag content={obj} attribute="ogImage" className="social_card_img" />
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

const TwitterPreview = connect(({ obj }: { obj: Obj }) => (
  <div className="social_card_preview">
    <div className="scrivito_detail_label">
      <span className="headline">Twitter preview</span>
      <span>Twitter (Summary card with large image)</span>
    </div>
    <div className="creator">
      Tweet creator: {lookupMetadata(obj, 'twitter:creator')}
    </div>

    <div className="card twitter_card">
      <div className="social_card_img">
        <OptionalImage src={lookupMetadata(obj, 'twitter:image')} />
      </div>
      <div className="card_text">
        <h5>{lookupMetadata(obj, 'twitter:title')}</h5>
        <p>{lookupMetadata(obj, 'twitter:description')}</p>
      </div>
    </div>
  </div>
))

const FacebookPreview = connect(({ obj }) => (
  <div className="social_card_preview">
    <div className="scrivito_detail_label">
      <span className="headline">Facebook preview</span>
      <span>Facebook (Article style)</span>
    </div>
    <div className="card fb_card">
      <div className="social_card_img">
        <OptionalImage src={lookupMetadata(obj, 'og:image')} />
      </div>
      <div className="card_text">
        <h5>{lookupMetadata(obj, 'og:title')}</h5>
        <p>{lookupMetadata(obj, 'og:description')}</p>
      </div>
    </div>
  </div>
))

function OptionalImage({ src }: { src: string }) {
  if (!src) return null

  return <img src={src} alt="seo-card-preview-img" />
}

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
    const severityClass = highestSeverity && `scrivito_${highestSeverity}`

    return (
      <>
        <div className={`scrivito_detail_label ${severityClass}`}>
          {severityClass && (
            <i className="scrivito_icon scrivito_icon_error"></i>
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
    severity?: 'error' | 'warning' | 'info'
  }[],
) {
  const highestSeverityValidation =
    validationResults.find((v) => v.severity === 'error') ||
    validationResults.find((v) => v.severity === 'warning') ||
    validationResults.find((v) => v.severity === 'info')
  return highestSeverityValidation?.severity
}

function lookupMetadata(obj: Obj, value: string) {
  const metadata = getMetadata(obj)

  if (value.includes('og:')) {
    const ogData = metadata.find((x) => x.property === value)
    if (ogData) return ogData.content
  }

  if (value.includes('twitter:')) {
    const twitterData = metadata.find((x) => x.name === value)
    if (twitterData) return twitterData.content
  }

  return ''
}
