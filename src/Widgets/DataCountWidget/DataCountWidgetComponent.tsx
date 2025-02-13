import { connect, ContentTag, provideComponent, useData } from 'scrivito'
import {
  DataCountWidget,
  DataCountWidgetInstance,
} from './DataCountWidgetClass'
import { EditorNote } from '../../Components/EditorNote'

provideComponent(DataCountWidget, ({ widget }) => {
  const classNames: string[] = []

  const style =
    (widget.get('style') as
      | 'display-1'
      | 'display-2'
      | 'display-3'
      | 'display-4'
      | 'display-5'
      | 'display-6'
      | 'h1'
      | 'h2'
      | 'h3'
      | 'h4'
      | 'h5'
      | 'h6'
      | 'text-small'
      | 'body-font-size'
      | null) ?? 'body-font-size'
  if (style !== 'body-font-size') classNames.push(style)

  const level = widget.get('level') as
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'div'
    | null
  const Tag = tag(level, style)

  return (
    <Tag className={classNames.join(' ')}>
      <Count widget={widget} />
    </Tag>
  )
})

const Count = connect(
  function Count({ widget }: { widget: DataCountWidgetInstance }) {
    const dataScope = useData()
    const totalCount = dataScope.count()

    if (totalCount === null) {
      return (
        <>
          <EditorNote>Data does not support count.</EditorNote>
          <ContentTag content={widget} attribute="loadingHeadline" />
        </>
      )
    }

    const attributes = ['headline0', 'headline1'] as const
    const attribute = attributes[totalCount] || 'headline'

    return widget.get(attribute).replaceAll('__count__', totalCount.toString())
  },
  {
    loading: ({ widget }) => (
      <ContentTag content={widget} attribute="loadingHeadline" />
    ),
  },
)

function tag(
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | null,
  style:
    | 'display-1'
    | 'display-2'
    | 'display-3'
    | 'display-4'
    | 'display-5'
    | 'display-6'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'text-small'
    | 'body-font-size',
): keyof JSX.IntrinsicElements {
  if (level) return level

  if (style === 'display-1') return 'h1'
  if (style === 'display-2') return 'h2'
  if (style === 'display-3') return 'h3'
  if (style === 'display-4') return 'h4'
  if (style === 'display-5') return 'h5'
  if (style === 'display-6') return 'h6'
  if (style === 'text-small') return 'div'
  if (style === 'body-font-size') return 'div'

  return style
}
