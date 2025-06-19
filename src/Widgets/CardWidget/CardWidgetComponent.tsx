import {
  provideComponent,
  WidgetTag,
  InPlaceEditingOff,
  ImageTag,
  ContentTag,
  connect,
  Link,
  LinkTag,
  isInPlaceEditingActive,
} from 'scrivito'
import { CardWidget } from './CardWidgetClass'
import { alternativeTextForObj } from '../../utils/alternativeTextForObj'

provideComponent(CardWidget, ({ widget }) => {
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

  const backgroundColor = widget.get('backgroundColor') || 'white'
  cardClassNames.push(`bg-${backgroundColor}`)

  if (widget.get('cardExtended')) cardClassNames.push('card-extended')

  return (
    <WidgetTag className={cardClassNames.join(' ')}>
      {backgroundImage && (
        <InPlaceEditingOff>
          <ImageTag
            content={widget}
            attribute="backgroundImage"
            className={backgroundImageClassNames.join(' ')}
            alt=""
          />
        </InPlaceEditingOff>
      )}
      <LinkOrNotTag link={widget.get('linkTo')}>
        {image && (
          <InPlaceEditingOff>
            <ImageTag
              content={widget}
              attribute="image"
              className="img-box img-h-200"
              alt={alternativeTextForObj(widget.get('image'))}
            />
          </InPlaceEditingOff>
        )}
        <ContentTag
          content={widget}
          attribute="cardBody"
          className={cardBodyClassNames.join(' ')}
        />
        {widget.get('showFooter') && (
          <ContentTag
            content={widget}
            attribute="cardFooter"
            className="card-footer"
          />
        )}
      </LinkOrNotTag>
    </WidgetTag>
  )
})

const LinkOrNotTag = connect(
  ({ children, link }: { children: React.ReactNode; link: Link | null }) => {
    if (!link) return <div>{children}</div>

    return (
      <LinkTag
        to={link}
        draggable={!isInPlaceEditingActive()} // Workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=1177704
      >
        {children}
      </LinkTag>
    )
  },
)
