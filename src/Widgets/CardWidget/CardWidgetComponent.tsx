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

const PADDING_CLASSES: Record<string, string> = {
  'p-0': 'p-0',
  'p-1': 'p-1',
  'p-2': 'p-2',
  'p-3': 'p-4',
  'p-4': 'p-6',
  'p-5': 'p-12',
}

const MARGIN_CLASSES: Record<string, string> = {
  'mb-0': 'mb-0',
  'mb-1': 'mb-1',
  'mb-2': 'mb-2',
  'mb-3': 'mb-4',
  'mb-4': 'mb-6',
  'mb-5': 'mb-12',
}

provideComponent(CardWidget, ({ widget }) => {
  const togglePlayPauseRef = useRef<TogglePlayPauseRef>(null)

  const padding = widget.get('padding') || 'p-4'
  const margin = widget.get('margin') || 'mb-4'
  const backgroundColor = widget.get('backgroundColor') || 'white'
  const image = widget.get('image')

  const cardClassNames = [
    'card',
    'relative',
    'z-[1]',
    'overflow-hidden',
    'rounded-(--bs-border-radius)',
    MARGIN_CLASSES[margin] ?? 'mb-6',
    `bg-${backgroundColor}`,
  ]

  if (backgroundColor !== 'transparent') {
    cardClassNames.push('shadow-(--jr-box-shadow)')
  }

  if (widget.get('cardExtended')) cardClassNames.push('card-extended')

  const cardBodyClassNames = [
    'relative',
    'z-[1]',
    PADDING_CLASSES[padding] ?? 'p-6',
  ]

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
              className="w-full h-[200px] object-cover object-center"
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
        <LinkOrNotTag link={widget.get('linkTo')} className="pt-0 px-8 pb-4">
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
