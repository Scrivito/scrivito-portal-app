import * as Scrivito from 'scrivito'
import { HeadlineWidget } from './HeadlineWidgetClass'
import * as speakingUrl from 'speakingurl'

Scrivito.provideComponent(HeadlineWidget, ({ widget }) => {
  const level = widget.get('level') || 'h2'

  return (
    <>
      <span
        className="headline-widget--anchor"
        id={speakingUrl(widget.get('headline'))}
      ></span>
      <Scrivito.ContentTag
        content={widget}
        attribute="headline"
        className={alignmentClassName(widget.get('alignment'))}
        tag={level}
      />
    </>
  )
})

function alignmentClassName(
  widgetAlignment: string | null
): string | undefined {
  if (widgetAlignment === 'center') return 'text-center'
  if (widgetAlignment === 'right') return 'text-end'
}
