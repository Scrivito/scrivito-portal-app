import { connect, ContentTag, DataItem, provideComponent } from 'scrivito'

import { DataBinaryImage } from '../../Components/DataBinaryImage'
import { ensureString } from '../../utils/ensureString'
import { isDataBinary } from '../../utils/dataBinaryToUrl'
import { DataPersonCardWidget } from './DataPersonCardWidgetClass'
import { EditorNote } from '../../Components/EditorNote'
import personCircle from '../../assets/images/person-circle.svg'
import { CurrentUser } from '../../Data/CurrentUser/CurrentUserDataItem'
import { User } from '../../Data/User/UserDataClass'
import { Loading } from '../../Components/Loading'

provideComponent(
  DataPersonCardWidget,
  ({ widget }) => {
    // TODO: Remove workaround, once #10883 is resolved
    const name = ensureString(widget.get('attributeName'))
    if (!name) return <EditorNote>Data is empty.</EditorNote>

    const value = CurrentUser.get(name)
    if (!value) return <EditorNote>Data is empty.</EditorNote>

    // @ts-expect-error until out of private beta
    const user: DataItem | null = User.get(value)

    if (!user) return <EditorNote>Data is empty.</EditorNote>

    return (
      <div>
        <ContentTag
          content={widget}
          attribute="headline"
          className="h6 text-uppercase"
        />
        <PersonCard dataItem={user} key={user.id()} />
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
