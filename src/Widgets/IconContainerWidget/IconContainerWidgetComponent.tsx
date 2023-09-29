import { Link, provideComponent } from 'scrivito'
import { IconComponent } from '../../Components/Icon'
import { InPlaceEditingPlaceholder } from '../../Components/InPlaceEditingPlaceholder'
import { IconContainerWidget } from './IconContainerWidgetClass'

provideComponent(IconContainerWidget, ({ widget }) => {
  const icons = widget.get('iconList')

  if (!icons.length) {
    return (
      <InPlaceEditingPlaceholder center>
        Select icons in the widget properties.
      </InPlaceEditingPlaceholder>
    )
  }

  return (
    <ul className="list-inline mb-0">
      {icons.map((iconListItem) => {
        const icon = iconListItem.get('icon')
        const size = iconListItem.get('size')
        const link = iconListItem.get('link')

        if (
          typeof icon !== 'string' ||
          typeof size !== 'string' ||
          !isLinkOrNull(link)
        ) {
          return
        }

        return (
          <li className="list-inline-item btn" key={iconListItem.id()}>
            <IconComponent icon={icon} size={size} link={link} />
          </li>
        )
      })}
    </ul>
  )
})

function isLinkOrNull(link: unknown): link is Link | null {
  return link instanceof Link || !link
}
