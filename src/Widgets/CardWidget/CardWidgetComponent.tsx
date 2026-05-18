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
import { ImageOrVideo, TogglePlayPauseRef } from '../../Components/ImageOrVideo'
import { useRef } from 'react'

provideComponent(CardWidget, ({ widget }) => {
  const cardBodyClassNames: string[] = ['card-body']
  const padding = widget.get('padding')
  cardBodyClassNames.push(padding ? padding : 'p-4')
  const togglePlayPauseRef = useRef<TogglePlayPauseRef>(null)

  const image = widget.get('image')

  const cardClassNames: string[] = ['card']

  cardClassNames.push(widget.get('margin') ?? 'mb-4')

  const backgroundColor = widget.get('backgroundColor') || 'white'
  if (backgroundColor === 'primary') {
    cardClassNames.push('bg-portal-primary', 'text-on-portal-primary')
  } else if (backgroundColor === 'secondary') {
    cardClassNames.push('bg-portal-secondary', 'text-on-portal-secondary')
  } else if (backgroundColor === 'white') {
    cardClassNames.push('bg-portal-white', 'text-on-portal-white')
  } else if (backgroundColor === 'light-grey') {
    cardClassNames.push('bg-portal-light-grey', 'text-on-portal-light-grey')
  } else if (backgroundColor === 'middle-grey') {
    cardClassNames.push('bg-portal-middle-grey', 'text-on-portal-middle-grey')
  } else if (backgroundColor === 'dark-grey') {
    cardClassNames.push('bg-portal-dark-grey', 'text-on-portal-dark-grey')
  } else if (backgroundColor === 'success') {
    cardClassNames.push('bg-portal-success', 'text-on-portal-success')
  } else if (backgroundColor === 'info') {
    cardClassNames.push('bg-portal-info', 'text-on-portal-info')
  } else if (backgroundColor === 'warning') {
    cardClassNames.push('bg-portal-warning', 'text-on-portal-warning')
  } else if (backgroundColor === 'danger') {
    cardClassNames.push('bg-portal-danger', 'text-on-portal-danger')
  }

  if (widget.get('cardExtended')) cardClassNames.push('card-extended')

  return (
    <WidgetTag
      className={cardClassNames.join(' ')}
      onClick={(e) => togglePlayPauseRef.current?.togglePlayPause(e)}
    >
      <ImageOrVideo
        widget={widget}
        attribute="backgroundImage"
        className={
          widget.get('backgroundAnimateOnHover') ? 'img-zoom' : undefined
        }
        togglePlayPauseRef={togglePlayPauseRef}
      />

      {image && (
        <LinkOrNotTag link={widget.get('linkTo')}>
          <InPlaceEditingOff>
            <ImageTag
              content={widget}
              attribute="image"
              className="img-box img-h-200"
              alt={alternativeTextForObj(widget.get('image'))}
            />
          </InPlaceEditingOff>
        </LinkOrNotTag>
      )}

      <LinkOrNotTag
        link={widget.get('linkTo')}
        className={cardBodyClassNames.join(' ')}
      >
        <ContentTag content={widget} attribute="cardBody" />
      </LinkOrNotTag>

      {widget.get('showFooter') && (
        <LinkOrNotTag link={widget.get('linkTo')} className="card-footer">
          <ContentTag content={widget} attribute="cardFooter" />
        </LinkOrNotTag>
      )}
    </WidgetTag>
  )
})

const LinkOrNotTag = connect(
  ({
    children,
    className,
    link,
  }: {
    children: React.ReactNode
    className?: string
    link: Link | null
  }) => {
    if (!link) return <div className={className}>{children}</div>

    return (
      <LinkTag
        to={link}
        className={className}
        draggable={!isInPlaceEditingActive()} // Workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=1177704
      >
        {children}
      </LinkTag>
    )
  },
)
