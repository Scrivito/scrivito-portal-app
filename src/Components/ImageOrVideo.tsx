import { useImperativeHandle, useRef, useState } from 'react'
import {
  connect,
  Widget,
  InPlaceEditingOff,
  ImageTag,
  currentLanguage,
} from 'scrivito'
import './ImageOrVideo.scss'

export interface TogglePlayPauseRef {
  togglePlayPause: (e: React.MouseEvent) => void
}

export const ImageOrVideo = connect(function ImageOrVideo<T extends string>({
  attribute,
  className,
  togglePlayPauseRef,
  widget,
}: {
  attribute: T
  className?: string
  togglePlayPauseRef: React.Ref<TogglePlayPauseRef>
  widget: Widget<{
    [K in T]: 'reference'
  }>
}) {
  const [isPaused, setIsPaused] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleVideoClick = (e: React.MouseEvent) => {
    const video = videoRef.current
    if (!video) return

    if (isPaused) {
      video.play()
      setIsPaused(false)
    } else {
      video.pause()
      setIsPaused(true)
    }
    e.stopPropagation()
  }

  useImperativeHandle(togglePlayPauseRef, () => ({
    togglePlayPause: handleVideoClick,
  }))

  const background = widget.get(attribute)
  if (!background) return null

  const classNames = ['img-background']
  if (className) classNames.push(className)

  if (background.contentType().startsWith('video/')) {
    return (
      <>
        <video
          ref={videoRef}
          autoPlay
          className={classNames.join(' ')}
          key={background.contentUrl()}
          loop
          muted
          playsInline
          src={background.contentUrl()}
          onClick={handleVideoClick}
        />
        {isPaused && (
          <button
            onClick={handleVideoClick}
            className="image-or-video-play-button"
            aria-label={localizePlayVideoLabel()}
          >
            <i className="bi bi-play-fill text-white bi-5x" />
          </button>
        )}
      </>
    )
  }

  return (
    <InPlaceEditingOff>
      <ImageTag
        content={widget}
        attribute={attribute}
        className={classNames.join(' ')}
        alt=""
      />
    </InPlaceEditingOff>
  )
})

function localizePlayVideoLabel(): string {
  switch (currentLanguage()) {
    case 'de':
      return 'Video abspielen'
    case 'fr':
      return 'Lire la vidéo'
    case 'pl':
      return 'Odtwórz wideo'
    default:
      return 'Play video'
  }
}
