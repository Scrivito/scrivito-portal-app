import { ContentTag, designProps, provideComponent } from 'scrivito'
import { Carousel } from 'react-bootstrap'
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
      {...designProps(widget)}
      className="slider-widget"
      controls={showControls}
      indicators={showControls}
      interval={autoplay ? intervalMs : null}
      keyboard={false}
      fade={!motionPreferred}
    >
      {widget
        .get('slides')
        .filter(isSlideWidgetInstance)
        .map((item) => {
          // The slide's own design has to be merged with the slider's minimum height rather
          // than spread over it, so that a slide can be made taller than the slider without
          // losing the slider's default.
          const { style, ...slideDesign } = designProps(item)

          return (
            <Carousel.Item
              key={item.id()}
              {...slideDesign}
              style={{
                minHeight: `${widget.get('minHeight') || 400}px`,
                ...style,
              }}
              className={showControls ? 'has-controls' : undefined}
              onClick={(e) => togglePlayPauseRef.current?.togglePlayPause(e)}
            >
              <ImageOrVideo
                widget={item}
                attribute="background"
                togglePlayPauseRef={togglePlayPauseRef}
              />

              <ContentTag content={item} attribute="content" />
            </Carousel.Item>
          )
        })}
    </Carousel>
  )
})
