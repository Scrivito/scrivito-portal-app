import { provideWidgetClass } from 'scrivito'

export const PageTitleWidget = provideWidgetClass('PageTitleWidget', {
  attributes: {
    // The background color used to be an enum of theme colors; the design carries it now.
    design: 'design',
  },
})
