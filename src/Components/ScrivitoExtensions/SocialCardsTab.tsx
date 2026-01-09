import { Obj, connect, uiContext } from 'scrivito'
import { getMetadata } from '../../utils/getMetadata'
import './SocialCardsTab.scss'

export const TwitterPreview = connect(({ obj }: { obj: Obj }) => {
  const { theme } = uiContext() || { theme: null }
  if (!theme) return null

  return (
    <div className={`scrivito_${theme}`}>
      <div className="social_card_preview">
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
    </div>
  )
})

export const FacebookPreview = connect(({ obj }: { obj: Obj }) => {
  const { theme } = uiContext() || { theme: null }
  if (!theme) return null

  return (
    <div className={`scrivito_${theme}`}>
      <div className="social_card_preview">
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
    </div>
  )
})

function OptionalImage({ src }: { src: string }) {
  if (!src) return null

  return <img src={src} alt="seo-card-preview-img" />
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
