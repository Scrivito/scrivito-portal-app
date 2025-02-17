import {
  connect,
  ContentTag,
  provideComponent,
  useData,
  WidgetTag,
} from 'scrivito'
import {
  DataCountWidget,
  DataCountWidgetInstance,
} from './DataCountWidgetClass'
import { EditorNote } from '../../Components/EditorNote'
import { alignmentClassName } from '../../utils/alignmentClassName'

provideComponent(DataCountWidget, ({ widget }) => {
  const classNames: string[] = [widget.get('margin') ?? 'mb-2']

  const style = widget.get('style') ?? 'body-font-size'
  if (style !== 'body-font-size') classNames.push(style)

  const alignment = alignmentClassName(widget.get('alignment'))
  if (alignment) classNames.push(alignment)

  return (
    <WidgetTag className={classNames.join(' ')}>
      <Count widget={widget} />
    </WidgetTag>
  )
})

const Count = connect<
  { widget: DataCountWidgetInstance },
  { widget: DataCountWidgetInstance }
>(
  function Count({ widget }) {
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
