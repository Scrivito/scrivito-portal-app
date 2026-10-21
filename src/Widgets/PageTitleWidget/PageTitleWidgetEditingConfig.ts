import { Design, provideEditingConfig } from 'scrivito'
import { PageTitleWidget } from './PageTitleWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(PageTitleWidget, {
  title: 'Page Title',
  thumbnail: Thumbnail,
  initialContent: {
    // What `backgroundColor: 'primary'` used to render — as literal colors, because a design
    // color cannot be a theme variable.
    design: new Design({
      desktop: { backgroundColor: '#274486', color: '#ffffff' },
    }),
  },
})
