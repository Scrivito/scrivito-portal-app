import { provideComponent, WidgetTag } from 'scrivito'
import { InPlaceEditingPlaceholder } from '../../Components/InPlaceEditingPlaceholder'
import './VimeoVideoWidget.scss'
import { VimeoVideoWidget } from './VimeoVideoWidgetClass'
import { applyPadding } from '../propertiesGroups/padding/applyPadding'

provideComponent(VimeoVideoWidget, ({ widget }) => {
  const vimeoVideoId = widget.get('vimeoVideoId')
  const aspectRatioValue = widget.get('aspectRatio') || '16to9'

  if (!vimeoVideoId) {
    return (
      <InPlaceEditingPlaceholder center>
        Provide a Vimeo video ID in the widget properties.
      </InPlaceEditingPlaceholder>
    )
  }

  return (
    <WidgetTag style={applyPadding(widget)}>
      <div className={`vimeo-video-widget aspect-ratio-${aspectRatioValue}`}>
        <iframe
          title="Vimeo Video Widget"
          src={`https://player.vimeo.com/video/${vimeoVideoId}?dnt=1`}
          className="vimeo-video-widget--fullsize-iframe"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </WidgetTag>
  )
})
