import { provideComponent, WidgetTag } from 'scrivito'
import { InPlaceEditingPlaceholder } from '../../Components/InPlaceEditingPlaceholder'
import './YoutubeVideoWidget.scss'
import { YoutubeVideoWidget } from './YoutubeVideoWidgetClass'
import { applyPadding } from '../propertiesGroups/padding/applyPadding'

provideComponent(YoutubeVideoWidget, ({ widget }) => {
  const youtubeVideoId = widget.get('youtubeVideoId')
  const aspectRatioValue = widget.get('aspectRatio') || '16to9'

  if (!youtubeVideoId) {
    return (
      <InPlaceEditingPlaceholder center>
        Provide a YouTube video ID in the widget properties.
      </InPlaceEditingPlaceholder>
    )
  }

  return (
    <WidgetTag style={applyPadding(widget)}>
      <div className={`youtube-video-widget aspect-ratio-${aspectRatioValue}`}>
        <iframe
          title="Youtube Video Widget"
          src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}`}
          className="youtube-video-widget--fullsize-iframe"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </WidgetTag>
  )
})
