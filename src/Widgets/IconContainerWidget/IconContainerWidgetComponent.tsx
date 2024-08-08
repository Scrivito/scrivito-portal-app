import { Link, provideComponent } from 'scrivito'
import { IconComponent } from '../../Components/Icon'
import { InPlaceEditingPlaceholder } from '../../Components/InPlaceEditingPlaceholder'
import { IconContainerWidget } from './IconContainerWidgetClass'
import { ensureString } from '../../utils/ensureString'

provideComponent(IconContainerWidget, ({ widget }) => {
  const iconList = widget.get('iconList')

  if (!iconList.length) {
    return (
      <InPlaceEditingPlaceholder center>
        Select icons in the widget properties.
      </InPlaceEditingPlaceholder>
    )
  }

  return (
    <ul className="list-inline mb-0">
      {iconList.map((iconListItem) => {
        const link = iconListItem.get('link')
        if (!isLinkOrNull(link)) return null

        return (
          <li className="list-inline-item btn" key={iconListItem.id()}>
            <IconComponent
              icon={ensureString(iconListItem.get('icon'))}
              size={ensureString(iconListItem.get('size'))}
              link={link}
            />
          </li>
        )
      })}
    </ul>
  )
})

function isLinkOrNull(link: unknown): link is Link | null {
  return link instanceof Link || !link
}
