import {
  provideComponent,
  WidgetTag,
  ContentTag,
  isUserLoggedIn,
} from 'scrivito'
import { CurrentUser } from '../../Data/CurrentUser/CurrentUserDataItem'
import { PersonCardWidget } from './PersonCardWidgetClass'
import { DataBinaryImage } from '../../Components/DataBinaryImage'
import { ensureString } from '../../utils/ensureString'
import { isDataBinary } from '../../utils/dataBinaryToUrl'
import { User } from '../../Data/User/UserDataClass'

provideComponent(PersonCardWidget, ({ widget }) => {
  if (!isUserLoggedIn()) return null

  const userId = CurrentUser.get(widget.get('attributeName') || 'salesUserId')
  if (!userId) return null

  // @ts-expect-error until out of private beta
  const userItem = User.get(userId)
  if (!userItem) return null

  const name = ensureString(userItem.get('name'))
  const position = ensureString(userItem.get('position'))
  const email = ensureString(userItem.get('email'))
  const image = userItem.get('image')

  return (
    <WidgetTag>
      <ContentTag
        content={widget}
        attribute="headline"
        tag="h6"
        className="h6 text-uppercase"
      />
      <div className="card mb-2 bg-white max-width-350">
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
    </WidgetTag>
  )
})
