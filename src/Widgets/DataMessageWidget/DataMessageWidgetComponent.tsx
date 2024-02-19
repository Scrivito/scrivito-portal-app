import {
  ContentTag,
  DataItem,
  WidgetTag,
  provideComponent,
  useDataItem,
} from 'scrivito'
import { DataMessageWidget } from './DataMessageWidgetClass'
import { User } from '../../Data/User/UserDataClass'
import { CurrentUser } from '../../Data/CurrentUser/CurrentUserDataItem'
import { DataBinary, isDataBinary } from '../../utils/dataBinaryToUrl'

import personCircle from '../../assets/images/person-circle.svg'
import { DataBinaryImage } from '../../Components/DataBinaryImage'
import { ensureString } from '../../utils/ensureString'

provideComponent(DataMessageWidget, ({ widget }) => {
  const dataItem = useDataItem()
  const createdBy = dataItem?.get('createdBy')

  const user:
    | null
    | DataItem
    // @ts-expect-error until out of private beta
    | undefined = createdBy && User.get(createdBy)

  const classNames = ['box-comment']

  const staff = user?.get('staff') || false
  if (staff) classNames.push('staff')

  const currenUserPisaId = CurrentUser.get('pisaId')
  const colleague =
    !staff && !!currenUserPisaId && user?.get('_id') == currenUserPisaId
  if (colleague) classNames.push('colleague')

  const image = getImage({ dataItem, user })

  return (
    <WidgetTag className={classNames.join(' ')}>
      <div className="avatar">
        <DataBinaryImage dataBinary={image} />
      </div>
      <div className="flex-grow-1">
        <div className="card mb-4 bg-white">
          <ContentTag
            content={widget}
            attribute="content"
            className="card-body p-4"
          />
        </div>
      </div>
    </WidgetTag>
  )
})

function getImage({
  dataItem,
  user,
}: {
  dataItem?: DataItem
  user?: DataItem | null
}): DataBinary {
  if (!dataItem) {
    return { url: ensureString(CurrentUser.get('picture')) || personCircle }
  }

  const userImage = user?.get('image')
  if (isDataBinary(userImage)) return userImage

  return { url: personCircle }
}
