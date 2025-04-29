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
  const labelAttributeName = useDataLocator(widget.get('data'))
    .dataItemAttribute()
    ?.attributeName()

  if (!currentItem) return <nav aria-label="breadcrumb" />

  const breadcrumbItems: DataItem[] = []

  for (
    let ancestorItem: unknown = currentItem, loopGuardIds = new Set<string>();
    ancestorItem instanceof DataItem && !loopGuardIds.has(ancestorItem.id());
    ancestorItem = parentAttributeName
      ? ancestorItem.get(parentAttributeName)
      : null
  ) {
    breadcrumbItems.unshift(ancestorItem)
    loopGuardIds.add(ancestorItem.id())
  }

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
  return (
    <li className={isActive ? 'breadcrumb-item active' : 'breadcrumb-item'}>
      {isActive ? label : <LinkTag to={item}>{label}</LinkTag>}
    </li>
  )
}
