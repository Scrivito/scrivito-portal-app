import {
  ContentTag,
  DataItem,
  WidgetTag,
  provideComponent,
  useData,
} from 'scrivito'
import { DataMessageWidget } from './DataMessageWidgetClass'
import { CurrentUser } from '../../Data/CurrentUser/CurrentUserDataItem'
import { DataBinary, isDataBinary } from '../../utils/dataBinaryToUrl'

import personCircle from '../../assets/images/person-circle.svg'
import { DataBinaryImage } from '../../Components/DataBinaryImage'
import { ensureString } from '../../utils/ensureString'

provideComponent(DataMessageWidget, ({ widget }) => {
  const dataItem = useData().dataItem()
  const createdBy = dataItem?.get('createdBy')

  const user = createdBy instanceof DataItem ? createdBy : null

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
  dataItem: DataItem | null
  user?: DataItem | null
}): DataBinary {
  if (!dataItem) {
    return { url: ensureString(CurrentUser.get('picture')) || personCircle }
  }

  const userImage = user?.get('image')
  if (isDataBinary(userImage)) return userImage

  return { url: personCircle }
}
