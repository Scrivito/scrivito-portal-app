import * as Scrivito from 'scrivito'
import { TextWidget } from './TextWidgetClass'

Scrivito.provideComponent(TextWidget, ({ widget }) => (
  <Scrivito.ContentTag
    attribute="text"
    className={alignmentClassName(widget.get('alignment'))}
    content={widget}
    tag="div"
  />
))

function alignmentClassName(
  widgetAlignment: string | null
): string | undefined {
  if (widgetAlignment === 'center') return 'text-center'
  if (widgetAlignment === 'right') return 'text-end'
}
