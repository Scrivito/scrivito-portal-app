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
import { backgroundClassName } from '../../utils/theme/backgroundClassName'
import { ImageOrVideo, TogglePlayPauseRef } from '../../Components/ImageOrVideo'
import { useRef } from 'react'
import './CardWidgetComponent.css'

provideComponent(CardWidget, ({ widget }) => {
  const cardBodyClassNames: string[] = ['card-body']
  const padding = widget.get('padding') || 'p-4'
  cardBodyClassNames.push(tailwindPaddingFor(padding))
  const togglePlayPauseRef = useRef<TogglePlayPauseRef>(null)

  const image = widget.get('image')

  const cardClassNames: string[] = ['card']

  const marginBottom = widget.get('margin') ?? 'mb-4'
  cardClassNames.push(tailwindMarginBottomFor(marginBottom))

  const backgroundColor = widget.get('backgroundColor') || 'white'
  cardClassNames.push(backgroundClassName(backgroundColor))
  if (backgroundColor === 'transparent') cardClassNames.push('shadow-none')

  if (widget.get('cardExtended')) cardClassNames.push('card-widget-extended')

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

const tailwindPaddingClassNames: Record<string, string> = {
  'p-0': 'p-0',
  'p-1': 'p-1',
  'p-2': 'p-2',
  'p-3': 'p-4',
  'p-4': 'p-6',
  'p-5': 'p-12',
}

function tailwindPaddingFor(padding: string): string {
  const className = tailwindPaddingClassNames[padding]
  if (className === undefined) {
    throw new Error(`Unknown padding: ${padding}`)
  }
  return className
}

const tailwindMarginBottomClassNames: Record<string, string> = {
  'mb-0': 'mb-0',
  'mb-1': 'mb-1',
  'mb-2': 'mb-2',
  'mb-3': 'mb-4',
  'mb-4': 'mb-6',
  'mb-5': 'mb-12',
}

function tailwindMarginBottomFor(marginBottom: string): string {
  const className = tailwindMarginBottomClassNames[marginBottom]
  if (className === undefined) {
    throw new Error(`Unknown margin: ${marginBottom}`)
  }
  return className
}

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
