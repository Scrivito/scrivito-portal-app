import {
  Binary,
  ContentTag,
  isInPlaceEditingActive,
  Obj,
  provideComponent,
} from 'scrivito'
import { VideoWidget } from './VideoWidgetObjClass'
import { videoPlaceholder } from './videoPlaceholder'
import './VideoWidget.scss'

provideComponent(VideoWidget, ({ widget }) => {
  const aspectRatio = widget.get('aspectRatio') || '16to9'
  const sourceUrl = urlFromBinaryObj(widget.get('source'))
  const posterUrl = urlFromBinaryObj(widget.get('poster'))

  const src = !posterUrl && sourceUrl ? `${sourceUrl}#t=0.01` : sourceUrl
  const isPlaceholderActive = isInPlaceEditingActive() && !src && !posterUrl

  if (!sourceUrl && !posterUrl && !isPlaceholderActive) return null

  return (
    <ContentTag
      tag="video"
      key={`${src || ''}${posterUrl || ''}`}
      className={`video-widget aspect-ratio-${aspectRatio}`}
      src={src}
      content={widget}
      attribute="source"
      poster={posterUrl}
      controls={!isPlaceholderActive}
      style={isPlaceholderActive ? videoPlaceholder : undefined}
    />
  )
})

function urlFromBinaryObj(binary: Obj | null) {
  const blob = binary?.get('blob')
  return blob instanceof Binary ? blob.url() || null : null
}
