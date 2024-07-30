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
  const createdBy = ensureString(dataItem?.get('createdBy'))

  const user: DataItem | null = createdBy ? User.get(createdBy) : null

  const classNames = ['box-comment']

  const staff = user?.get('staff') || false
  if (staff) classNames.push('staff')

  const currenUserPisaId = CurrentUser.get('pisaUserId')
  const userId = user?.id()
  const colleague = !staff && !!userId && userId !== currenUserPisaId
  if (colleague) classNames.push('colleague')

  const image = getImage({ dataItem, user })

  return (
    <WidgetTag className={classNames.join(' ')}>
      <div className="avatar">
        <DataBinaryImage dataBinary={image} />
        <span className="avatar-text">
          {staff ? 'Staff' : colleague ? 'Colleague' : undefined}
        </span>
      </div>
      <div className="flex-grow-1">
        <div className="card mb-4 bg-white no-color-adaption">
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
