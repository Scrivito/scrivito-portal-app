import * as Scrivito from 'scrivito'
import { CardWidget } from './CardWidgetClass'

Scrivito.provideComponent(CardWidget, ({ widget }) => {
  const cardBodyClassNames: string[] = ['card-body']
  const padding = widget.get('padding')
  cardBodyClassNames.push(padding ? padding : 'p-4')

  const backgroundImage = widget.get('backgroundImage')
  const backgroundImageClassNames = ['img-background']
  if (widget.get('backgroundAnimateOnHover')) {
    backgroundImageClassNames.push('img-zoom')
  }

  const image = widget.get('image')

  const cardClassNames: string[] = ['card']

  const margin = widget.get('margin')
  cardClassNames.push(margin ? margin : 'mb-4')

  const backgroundColor = widget.get('backgroundColor')
  if (backgroundColor && backgroundColor !== 'transparent') {
    cardClassNames.push(`bg-${backgroundColor}`)
  }

  if (widget.get('cardExtended')) cardClassNames.push('card-extended')

  const link = widget.get('linkTo')

  const topLevelProps: React.AllHTMLAttributes<unknown> = {
    className: cardClassNames.join(' '),
  }

  let tag = 'div'

  if (link && !Scrivito.isInPlaceEditingActive()) {
    tag = 'a'
    topLevelProps.href = Scrivito.urlFor(link)
    topLevelProps.onClick = (e) => {
      e.preventDefault()
      Scrivito.navigateTo(link)
    }
  }

  return (
    <Scrivito.WidgetTag tag={tag} {...topLevelProps}>
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
            className="img-box img-h-200"
          />
        </Scrivito.InPlaceEditingOff>
      )}
      <Scrivito.ContentTag
        content={widget}
        attribute="cardBody"
        className={cardBodyClassNames.join(' ')}
      />
      {widget.get('showFooter') && (
        <Scrivito.ContentTag
          content={widget}
          attribute="cardFooter"
          className="card-footer"
        />
      )}
    </Scrivito.WidgetTag>
  )
})
