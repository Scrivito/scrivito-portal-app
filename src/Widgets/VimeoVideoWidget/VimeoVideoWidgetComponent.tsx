import { provideComponent } from 'scrivito'
import { InPlaceEditingPlaceholder } from '../../Components/InPlaceEditingPlaceholder'
import './VimeoVideoWidget.scss'
import { VimeoVideoWidget } from './VimeoVideoWidgetClass'

provideComponent(VimeoVideoWidget, ({ widget }) => {
  const vimeoVideoId = widget.get('vimeoVideoId')
  const aspectRatioValue = widget.get('aspectRatio')

  if (!vimeoVideoId) {
    return (
      <InPlaceEditingPlaceholder center>
        Provide a Vimeo video ID in the widget properties.
      </InPlaceEditingPlaceholder>
    )
  }

  return (
    <div className={`aspect-ratio-${aspectRatioValue}`}>
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
  )
})
