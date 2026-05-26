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

provideComponent(CardWidget, ({ widget }) => {
  const cardBodyClassNames: string[] = ['card-body']
  const bootstrapPadding = widget.get('padding') || 'p-4'
  cardBodyClassNames.push(tailwindPaddingFor(bootstrapPadding))
  const togglePlayPauseRef = useRef<TogglePlayPauseRef>(null)

  const image = widget.get('image')

  const cardClassNames: string[] = ['card']

  const bootstrapMarginBottom = widget.get('margin') ?? 'mb-4'
  cardClassNames.push(tailwindMarginBottomFor(bootstrapMarginBottom))

  const backgroundColor = widget.get('backgroundColor') || 'white'
  cardClassNames.push(backgroundClassName(backgroundColor))
  if (backgroundColor === 'transparent') cardClassNames.push('shadow-none')

  if (widget.get('cardExtended')) {
    cardClassNames.push(
      'overflow-visible',
      "after:rounded-portal after:pointer-events-none after:absolute after:top-0 after:bottom-0 after:-z-[1] after:block after:bg-inherit after:content-['']",
      '[*:first-child_&]:after:right-0 [*:first-child_&]:after:left-[-2600px]',
      '[*:last-child_&]:after:right-[-2600px] [*:last-child_&]:after:left-0',
      '[*:only-child_&]:after:right-0 [*:only-child_&]:after:left-0',
    )
  }

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

function tailwindPaddingFor(bootstrapPadding: string): string {
  const className = tailwindPaddingClassNames[bootstrapPadding]
  if (className === undefined) {
    throw new Error(`Unknown bootstrap padding: ${bootstrapPadding}`)
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

function tailwindMarginBottomFor(bootstrapMarginBottom: string): string {
  const className = tailwindMarginBottomClassNames[bootstrapMarginBottom]
  if (className === undefined) {
    throw new Error(`Unknown bootstrap margin: ${bootstrapMarginBottom}`)
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
