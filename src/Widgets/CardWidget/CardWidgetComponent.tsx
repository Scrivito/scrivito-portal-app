import * as Scrivito from 'scrivito'
import { CardWidget } from './CardWidgetClass'

Scrivito.provideComponent(CardWidget, ({ widget }) => {
  const cardClassNames: string[] = ['card']

  const backgroundColor = widget.get('backgroundColor')
  if (backgroundColor && backgroundColor !== 'transparent') {
    cardClassNames.push(`bg-${backgroundColor}`)
  }

  const backgroundImage = widget.get('backgroundImage')
  const backgroundImageClassNames = ['img-background']
  if (widget.get('backgroundAnimateOnHover')) {
    backgroundImageClassNames.push('img-zoom')
  }

  const image = widget.get('image')

  return (
    <div className={cardClassNames.join(' ')}>
      {backgroundImage && (
        <Scrivito.InPlaceEditingOff>
          <Scrivito.ImageTag
            content={widget}
            attribute="backgroundImage"
            className={backgroundImageClassNames.join(' ')}
          />
        </Scrivito.InPlaceEditingOff>
      )}
      {image && (
        <Scrivito.InPlaceEditingOff>
          <Scrivito.ImageTag
            content={widget}
            attribute="image"
            className="image-box img-h-200"
          />
        </Scrivito.InPlaceEditingOff>
      )}
      <Scrivito.ContentTag
        content={widget}
        attribute="cardBody"
        className="card-body"
      />
      {widget.get('showFooter') && (
        <Scrivito.ContentTag
          content={widget}
          attribute="cardFooter"
          className="card-footer"
        />
      )}
    </div>
  )
})
