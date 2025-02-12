import { connect, ContentTag, provideComponent, useData } from 'scrivito'
import {
  DataSearchCountWidget,
  DataSearchCountWidgetInstance,
} from './DataSearchCountWidgetClass'
import { EditorNote } from '../../Components/EditorNote'

provideComponent(DataSearchCountWidget, ({ widget }) => (
  <h1 className="h3 text-center">
    <TotalCountSummary widget={widget} />
  </h1>
))

const TotalCountSummary = connect(
  function TotalCountSummary({
    widget,
  }: {
    widget: DataSearchCountWidgetInstance
  }) {
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
      <ContentTag content={widget} attribute="resultsLoadingHeadline" />
    ),
  },
)
