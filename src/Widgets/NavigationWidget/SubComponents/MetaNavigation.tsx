import * as Scrivito from 'scrivito'
import { NavigationWidget } from '../NavigationWidgetClass'
import { NavItem } from './NavItem'
import Nav from 'react-bootstrap/Nav'

export const MetaNavigation = Scrivito.connect(function MetaNavigation({
  widget,
}: {
  widget: InstanceType<typeof NavigationWidget>
}) {
  return (
    <div className="navbar-meta">
      <Nav className="me-auto">
        {widget.get('metaNavigationObjs').map((metaObj, index) => (
          <NavItem obj={metaObj} key={`${metaObj.id()}${index}`} />
        ))}
      </Nav>
    </div>
  )
})
