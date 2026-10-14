import { useContext } from 'react'
import { ContentTag, provideComponent, WidgetTag } from 'scrivito'
import { SvgIcon } from '../../Components/Icon'
import { TickListItemWidget } from './TickListItemWidgetClass'
import { TickListIconContext } from '../TickListWidget/TickListWidgetComponent'

provideComponent(TickListItemWidget, ({ widget }) => (
  <WidgetTag tag="li">
    <SvgIcon icon={useContext(TickListIconContext)} className="icon bi-3x" />
    <ContentTag content={widget} attribute="statement" tag="span" />
  </WidgetTag>
))
