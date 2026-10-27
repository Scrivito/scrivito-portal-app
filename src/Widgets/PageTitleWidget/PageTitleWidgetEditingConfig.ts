import { provideEditingConfig } from 'scrivito'
import { PageTitleWidget } from './PageTitleWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(PageTitleWidget, {
  title: 'Page Title',
  thumbnail: Thumbnail,
  attributes: {
    // The design goes on a `<span>` around the title, so that the colored plate hugs the
    // text rather than spanning the column. A size would be ignored there.
    design: { kind: 'inline' },
  },
})
