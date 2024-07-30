import {
  connect,
  ContentTag,
  DataItem,
  provideComponent,
  useData,
} from 'scrivito'

import { DataBinaryImage } from '../../Components/DataBinaryImage'
import { ensureString } from '../../utils/ensureString'
import { isDataBinary } from '../../utils/dataBinaryToUrl'
import { DataPersonCardWidget } from './DataPersonCardWidgetClass'
import { EditorNote } from '../../Components/EditorNote'
import personCircle from '../../assets/images/person-circle.svg'
import { Loading } from '../../Components/Loading'
import { DataErrorEditorNote } from '../../Components/DataErrorEditorNote'

provideComponent(
  DataPersonCardWidget,
  ({ widget }) => {
    const dataScope = useData()
    let dataError: unknown

    try {
      if (dataScope.isEmpty()) return <EditorNote>Data is empty.</EditorNote>
    } catch (error) {
      dataError = error
    }

    let dataItems: DataItem[]
    try {
      dataItems = dataScope.take()
    } catch (error) {
      dataItems = []
      dataError = error
    }

    if (dataError) return <DataErrorEditorNote error={dataError} />

    return (
      <div>
        <ContentTag
          tag="h6"
          content={widget}
          attribute="headline"
          className="h6 text-uppercase"
        />
        {dataItems.map((dataItem) => (
          <PersonCard dataItem={dataItem} key={dataItem.id()} />
        ))}
      </div>
    )
  },
  { loading: Loading },
)

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
            {email ? (
              <div className="d-flex text-small">
                <div className="me-1 ms-1">
                  <i className="bi bi-envelope" aria-hidden={true} />
                </div>
                <div>
                  <a href={`mailto:${email}`}>{email}</a>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
})
