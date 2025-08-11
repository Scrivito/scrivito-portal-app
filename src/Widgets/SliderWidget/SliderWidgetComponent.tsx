import { ContentTag, provideComponent } from 'scrivito'
import Carousel from 'react-bootstrap/Carousel'
import { SliderWidget } from './SliderWidgetClass'
import { isSlideWidgetInstance } from '../SlideWidget/SlideWidgetClass'
import { ImageOrVideo, TogglePlayPauseRef } from '../../Components/ImageOrVideo'
import { useRef } from 'react'
import { useMotionPreference } from '../../hooks/useMotionPreference'
import './SliderWidget.scss'

provideComponent(SliderWidget, ({ widget }) => {
  const motionPreferred = useMotionPreference()
  const autoplay = widget.get('autoplay')
  const showControls = autoplay ? widget.get('controls') : true
  const intervalMs = Math.round((widget.get('autoplayInterval') ?? 5) * 1000)
  const togglePlayPauseRef = useRef<TogglePlayPauseRef>(null)

  return (
    <Carousel
      className={`slider-widget ${widget.get('margin') || 'mb-4'}`}
      controls={showControls}
      indicators={showControls}
      interval={autoplay ? intervalMs : null}
      keyboard={false}
      fade={!motionPreferred}
    >
      {widget
        .get('slides')
        .filter(isSlideWidgetInstance)
        .map((item) => (
          <Carousel.Item
            key={item.id()}
            style={{ minHeight: `${widget.get('minHeight') || 400}px` }}
            className={[
              `bg-${item.get('backgroundColor') || 'transparent'}`,
              showControls ? 'has-controls' : '',
            ].join(' ')}
            onClick={(e) => togglePlayPauseRef.current?.togglePlayPause(e)}
          >
            <ImageOrVideo
              widget={item}
              attribute="background"
              togglePlayPauseRef={togglePlayPauseRef}
            />

            <ContentTag content={item} attribute="content" />
          </Carousel.Item>
        ))}
    </Carousel>
  )
})
