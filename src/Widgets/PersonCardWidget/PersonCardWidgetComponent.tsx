import {
  provideComponent,
  WidgetTag,
  InPlaceEditingOff,
  useDataItem,
} from 'scrivito'
import { PersonCardWidget } from './PersonCardWidgetClass'
import { DataBinaryImage } from '../../Components/DataBinaryImage'
import { ensureString } from '../../utils/ensureString'
import { isDataBinary } from '../../utils/dataBinaryToUrl'

provideComponent(PersonCardWidget, () => {
  const userItem = useDataItem()
  if (!userItem) return null

  const name = ensureString(userItem.get('name'))
  const position = ensureString(userItem.get('position'))
  const email = ensureString(userItem.get('email'))
  const image = userItem.get('image')

  return (
    <WidgetTag className="card mb-2 bg-secondary max-width-350">
      <InPlaceEditingOff>
        <div className="card-body p-3">
          <div className="row">
            <div className="col-3 d-none d-xl-block">
              {isDataBinary(image) ? (
                <DataBinaryImage dataBinary={image} className="editor-img" />
              ) : null}
            </div>
            <div className="col">
              <div className="h5 text-break">{name}</div>
              <div className="text-bold opacity-60 text-extra-small text-uppercase">
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
      </InPlaceEditingOff>
    </WidgetTag>
  )
})
