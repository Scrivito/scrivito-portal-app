import { ContentTag, provideComponent, WidgetTag } from 'scrivito'
import { Carousel } from 'react-bootstrap'
import { SliderWidget } from './SliderWidgetClass'
import { isSlideWidgetInstance } from '../SlideWidget/SlideWidgetClass'
import { ImageOrVideo, TogglePlayPauseRef } from '../../Components/ImageOrVideo'
import { useRef } from 'react'
import { useMotionPreference } from '../../hooks/useMotionPreference'
import { applyPadding } from '../propertiesGroups/padding/applyPadding'
import { marginBottomToPixels } from '../propertiesGroups/padding/marginBottomToPixels'
import './SliderWidget.scss'

provideComponent(SliderWidget, ({ widget }) => {
  const motionPreferred = useMotionPreference()
  const autoplay = widget.get('autoplay')
  const showControls = autoplay ? widget.get('controls') : true
  const intervalMs = Math.round((widget.get('autoplayInterval') ?? 5) * 1000)
  const togglePlayPauseRef = useRef<TogglePlayPauseRef>(null)

  return (
    <WidgetTag
      style={applyPadding(widget, {
        paddingBottom: marginBottomToPixels(widget.get('margin')),
      })}
    >
      <Carousel
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
    </WidgetTag>
  )
})
