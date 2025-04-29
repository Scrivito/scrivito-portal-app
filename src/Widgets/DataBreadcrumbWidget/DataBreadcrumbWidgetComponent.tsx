import {
  DataItem,
  LinkTag,
  provideComponent,
  useData,
  useDataLocator,
} from 'scrivito'
import { DataBreadcrumbWidget } from './DataBreadcrumbWidgetClass'
import { ensureString } from '../../utils/ensureString'

provideComponent(DataBreadcrumbWidget, ({ widget }) => {
  const currentItem = useData().dataItem()
  const parentAttributeName = useDataLocator(widget.get('parentData'))
    .dataItemAttribute()
    ?.attributeName()
  const labelAttributeName = useDataLocator(widget.get('labelData'))
    .dataItemAttribute()
    ?.attributeName()

  if (!currentItem) return <nav aria-label="breadcrumb" />

  const breadcrumbItems = getBreadcrumbItems(currentItem, parentAttributeName)
  const activeId = currentItem.id()

  return (
    <nav aria-label="breadcrumb" className="py-2">
      <ol className="breadcrumb m-1">
        {breadcrumbItems.map((item) => (
          <BreadcrumbItem
            key={item.id()}
            isActive={item.id() === activeId}
            item={item}
            label={
              ensureString(
                labelAttributeName && item.get(labelAttributeName),
              ) || '<untitled>'
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

function getBreadcrumbItems(finalItem: DataItem, parentAttributeName?: string) {
  if (!parentAttributeName) return [finalItem]

  const breadcrumbItems: DataItem[] = []

  let currentItem: DataItem | null = finalItem
  const loopGuardIds = new Set<string>()

  while (currentItem && !loopGuardIds.has(currentItem.id())) {
    breadcrumbItems.unshift(currentItem)
    loopGuardIds.add(currentItem.id())

    const parent = currentItem.get(parentAttributeName)
    currentItem = parent instanceof DataItem ? parent : null
  }

  return breadcrumbItems
}
