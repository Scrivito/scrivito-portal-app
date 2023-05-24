import * as Scrivito from 'scrivito'
import Carousel from 'react-bootstrap/Carousel'
import { CarouselContainerWidget } from './CarouselContainerWidgetClass'

// TODO: Improve editing, e.g. add a button to add more items etc.
Scrivito.provideComponent(CarouselContainerWidget, ({ widget }) => {
  return (
    <Carousel interval={null}>
      {widget.get('items').map((item) => (
        <Carousel.Item key={item.id()}>
          <Scrivito.InPlaceEditingOff>
            <Scrivito.ImageTag content={item} attribute="background" />
          </Scrivito.InPlaceEditingOff>

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
