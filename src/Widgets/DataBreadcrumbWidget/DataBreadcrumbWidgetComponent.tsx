import {
  DataItem,
  LinkTag,
  provideComponent,
  useData,
  useDataLocator,
} from 'scrivito'
import { DataBreadcrumbWidget } from './DataBreadcrumbWidgetClass'
import { ensureString } from '../../utils/ensureString'
import { localizeNoTitle } from '../../utils/title'

provideComponent(DataBreadcrumbWidget, ({ widget }) => {
  const currentItem = useData().dataItem()
  const labelAttributeName = useDataLocator(widget.get('labelData'))
    .dataItemAttribute()
    ?.attributeName()

  if (!currentItem) return <nav aria-label="breadcrumb" />

  const breadcrumbItems = getBreadcrumbItems(currentItem)
  const activeId = currentItem.id()

  return (
    <nav aria-label="breadcrumb" className="pb-2">
      <ol className="breadcrumb m-1">
        {breadcrumbItems.map((item) => (
          <BreadcrumbItem
            key={item.id()}
            isActive={item.id() === activeId}
            item={item}
            label={
              ensureString(
                labelAttributeName && item.get(labelAttributeName),
              ) || localizeNoTitle()
            }
          />
        ))}
      </ol>
    </nav>
  )
})

function BreadcrumbItem({
  isActive,
  item,
  label,
}: {
  isActive: boolean
  item: DataItem
  label: string
}) {
  if (isActive) return <li className="breadcrumb-item active">{label}</li>

  return (
    <li className="breadcrumb-item">
      <LinkTag to={item}>{label}</LinkTag>
    </li>
  )
}

function getBreadcrumbItems(finalItem: DataItem) {
  const breadcrumbItems: DataItem[] = []

  let currentItem: DataItem | null = finalItem
  const loopGuardIds = new Set<string>()

  while (currentItem && !loopGuardIds.has(currentItem.id())) {
    breadcrumbItems.unshift(currentItem)
    loopGuardIds.add(currentItem.id())

    const parent: unknown =
      currentItem.get('parent') || currentItem.get('parentId')
    currentItem = parent instanceof DataItem ? parent : null
  }

  return breadcrumbItems
}
