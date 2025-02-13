import { connect, ContentTag, provideComponent, useData } from 'scrivito'
import {
  DataCountWidget,
  DataCountWidgetInstance,
} from './DataCountWidgetClass'
import { EditorNote } from '../../Components/EditorNote'

provideComponent(DataCountWidget, ({ widget }) => (
  <h1 className="h3 text-center">
    <Count widget={widget} />
  </h1>
))

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
