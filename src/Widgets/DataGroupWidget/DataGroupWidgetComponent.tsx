import { provideComponent, useData } from 'scrivito'
import { DataGroupWidget } from './DataGroupWidgetClass'
import { DataBatchContextProvider } from '../../Components/DataBatchContext'

provideComponent(DataGroupWidget, ({ widget }) => {
  const id = ['DataGroupWidget', widget.id(), useData().dataItem()?.id()].join(
    '-',
  )

  return (
    <DataBatchContextProvider key={id} content={widget} attribute="content" />
  )
})
