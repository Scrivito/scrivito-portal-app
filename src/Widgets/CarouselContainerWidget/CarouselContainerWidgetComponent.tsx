import * as Scrivito from 'scrivito'
import Carousel from 'react-bootstrap/Carousel'
import { CarouselContainerWidget } from './CarouselContainerWidgetClass'

Scrivito.provideComponent(CarouselContainerWidget, ({ widget }) => {
  return (
    <Carousel interval={null}>
      {widget.get('items').map((item) => (
        <Carousel.Item key={item.id()}>
          <Scrivito.ImageTag content={item} attribute="background" />

          <Scrivito.ContentTag
            content={item}
            attribute="caption"
            className="carousel-caption"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  )
})
