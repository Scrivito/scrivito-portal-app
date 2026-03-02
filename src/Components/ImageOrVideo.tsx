import { useImperativeHandle, useRef, useState, useEffect } from 'react'
import {
  connect,
  currentLanguage,
  Widget,
  InPlaceEditingOff,
  ImageTag,
} from 'scrivito'
import messages from './i18n.visitor.json'
import rosetta from 'rosetta'
import { useMotionPreference } from '../hooks/useMotionPreference'
import './ImageOrVideo.scss'

const i18n = rosetta(messages)
const lang = currentLanguage() ?? 'en'
i18n.locale(lang in messages ? lang : 'en')

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
  const motionPreferred = useMotionPreference()
  const [isPaused, setIsPaused] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (motionPreferred) {
      setIsPaused(false)
      videoRef.current?.play()
    } else {
      setIsPaused(true)
      videoRef.current?.pause()
    }
  }, [motionPreferred])

  const handleVideoClick = (e: React.MouseEvent) => {
    const video = videoRef.current
    if (!video) return

    if (isPaused) {
      setIsPaused(false)
      video.play()
    } else {
      setIsPaused(true)
      video.pause()
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
          autoPlay={motionPreferred}
          className={classNames.join(' ')}
          key={background.contentUrl()}
          loop
          muted
          playsInline
          src={background.contentUrl()}
          onClick={handleVideoClick}
        />
        <button
          className={`image-or-video-play-button ${isPaused ? 'is-paused' : ''}`}
          aria-label={isPaused ? i18n.t('playVideo') : i18n.t('pauseVideo')}
        >
          <i className="bi bi-play-fill text-white bi-3x" />
        </button>
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
