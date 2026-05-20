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

function backgroundClassName(backgroundColor: string): string {
  switch (backgroundColor) {
    case 'primary':
      return 'bg-portal-primary text-on-portal-primary'
    case 'secondary':
      return 'bg-portal-secondary text-on-portal-secondary'
    case 'white':
      return 'bg-portal-white text-on-portal-white'
    case 'light-grey':
      return 'bg-portal-light-grey text-on-portal-light-grey'
    case 'middle-grey':
      return 'bg-portal-middle-grey text-on-portal-middle-grey'
    case 'dark-grey':
      return 'bg-portal-dark-grey text-on-portal-dark-grey'
    case 'success':
      return 'bg-portal-success text-on-portal-success'
    case 'info':
      return 'bg-portal-info text-on-portal-info'
    case 'warning':
      return 'bg-portal-warning text-on-portal-warning'
    case 'danger':
      return 'bg-portal-danger text-on-portal-danger'
    case 'transparent':
      return ''
    default:
      throw new Error(`Unknown backgroundColor: ${backgroundColor}`)
  }
}

function tailwindPaddingFor(bootstrapPadding: string): string {
  switch (bootstrapPadding) {
    case 'p-0':
      return 'p-0'
    case 'p-1':
      return 'p-1'
    case 'p-2':
      return 'p-2'
    case 'p-3':
      return 'p-4'
    case 'p-4':
      return 'p-6'
    case 'p-5':
      return 'p-12'
    default:
      throw new Error(`Unknown bootstrap padding: ${bootstrapPadding}`)
  }
}

function tailwindMarginBottomFor(bootstrapMarginBottom: string): string {
  switch (bootstrapMarginBottom) {
    case 'mb-0':
      return 'mb-0'
    case 'mb-1':
      return 'mb-1'
    case 'mb-2':
      return 'mb-2'
    case 'mb-3':
      return 'mb-4'
    case 'mb-4':
      return 'mb-6'
    case 'mb-5':
      return 'mb-12'
    default:
      throw new Error(`Unknown bootstrap margin: ${bootstrapMarginBottom}`)
  }
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
