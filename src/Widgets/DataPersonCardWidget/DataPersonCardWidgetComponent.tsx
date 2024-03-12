import {
  provideComponent,
  WidgetTag,
  // @ts-expect-error TODO: remove once officially released
  useDataScope,
  DataScope,
  connect,
  DataItem,
  ContentTag,
} from 'scrivito'

import { DataBinaryImage } from '../../Components/DataBinaryImage'
import { ensureString } from '../../utils/ensureString'
import { isDataBinary } from '../../utils/dataBinaryToUrl'
import { DataPersonCardWidget } from './DataPersonCardWidgetClass'
import { EditorNote } from '../../Components/EditorNote'
import personCircle from '../../assets/images/person-circle.svg'

provideComponent(DataPersonCardWidget, ({ widget }) => {
  const dataScope: DataScope | undefined = useDataScope()

  if (!dataScope) {
    return <EditorNote>No data found. Please select a data source.</EditorNote>
  }

  if (dataScope.isEmpty()) return <EditorNote>Data is empty.</EditorNote>

  return (
    <WidgetTag>
      <ContentTag
        content={widget}
        attribute="headline"
        tag="h6"
        className="h6 text-uppercase"
      />
      {dataScope.take().map((dataItem) => (
        <PersonCard dataItem={dataItem} key={dataItem.id()} />
      ))}
    </WidgetTag>
  )
})

const PersonCard = connect(function PersonCard({
  dataItem,
}: {
  dataItem: DataItem
}) {
  const name = ensureString(dataItem.get('name'))
  const position = ensureString(dataItem.get('position'))
  const email = ensureString(dataItem.get('email'))
  const image = dataItem.get('image') || { url: personCircle }

  return (
    <div className="card mb-2 bg-white no-color-adaption max-width-350">
      <div className="card-body p-3">
        <div className="row">
          <div className="col-3 d-none d-xl-block">
            {isDataBinary(image) ? (
              <DataBinaryImage dataBinary={image} className="editor-img" />
            ) : null}
          </div>
          <div className="col">
            <div className="h5 text-break">{name}</div>
            <div className="text-bold text-extra-small text-uppercase">
              {position}
            </div>
            <table className="table-extra-small">
              <tbody>
                {email ? (
                  <tr>
                    <th className="align-top">
                      <i className="bi bi-envelope"></i>
                    </th>
                    <td>
                      <a href={`mailto:${email}`}>{email}</a>
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
})
