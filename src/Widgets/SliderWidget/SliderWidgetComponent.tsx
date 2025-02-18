import {
  connect,
  ContentTag,
  ImageTag,
  InPlaceEditingOff,
  provideComponent,
} from 'scrivito'
import Carousel from 'react-bootstrap/Carousel'
import { SliderWidget } from './SliderWidgetClass'
import {
  SlideWidgetInstance,
  isSlideWidgetInstance,
} from '../SlideWidget/SlideWidgetClass'
import './SliderWidget.scss'

provideComponent(SliderWidget, ({ widget }) => {
  const showControls = widget.get('autoplay') ? widget.get('controls') : true

  return (
    <Carousel
      className={`slider-widget ${widget.get('margin') || 'mb-4'}`}
      controls={showControls}
      indicators={showControls}
      interval={widget.get('autoplay') ? 5000 : null}
      keyboard={false}
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
          >
            <ImageOrVideo widget={item} />

            <ContentTag content={item} attribute="content" />
          </Carousel.Item>
        ))}
    </Carousel>
  )
})

const ImageOrVideo = connect(
  function ImageOrVideo({ widget }: { widget: SlideWidgetInstance }) {
    const background = widget.get('background')
    if (!background) return null

    if (background.contentType().startsWith('video/')) {
      return (
        <video autoPlay loop muted playsInline className="img-background">
          <source
            src={background.contentUrl()}
            type={background.contentType()}
          />
        </video>
      )
    }

    return (
      <InPlaceEditingOff>
        <ImageTag
          content={widget}
          attribute="background"
          alt=""
          className="img-background"
        />
      </InPlaceEditingOff>
    )
  },
  { loading: () => null },
)
