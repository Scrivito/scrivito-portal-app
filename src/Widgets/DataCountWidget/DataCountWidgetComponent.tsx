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
import { applyTextStyle } from '../propertiesGroups/textStyle/applyTextStyle'
import { DataErrorEditorNote } from '../../Components/DataErrorEditorNote'

provideComponent(DataCountWidget, ({ widget }) => {
  const classNames: string[] = [widget.get('margin') ?? 'mb-2']

  const style = widget.get('style') ?? 'body-font-size'
  if (style !== 'body-font-size') classNames.push(style)

  const alignment = alignmentClassName(widget.get('alignment'))
  if (alignment) classNames.push(alignment)

  return (
    <WidgetTag className={classNames.join(' ')} style={applyTextStyle(widget)}>
      <Count widget={widget} />
    </WidgetTag>
  )
})

const Count = connect(
  function Count({ widget }: { widget: DataCountWidgetInstance }) {
    const dataScope = useData()

    let totalCount: number | null
    try {
      totalCount = dataScope.count()
    } catch (error) {
      return <DataErrorEditorNote error={error} />
    }

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
    loading: ({ widget }: { widget: DataCountWidgetInstance }) => (
      <ContentTag content={widget} attribute="loadingHeadline" />
    ),
  },
)
