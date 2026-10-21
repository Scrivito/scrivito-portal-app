import { provideWidgetClass } from 'scrivito'

export const PageTitleWidget = provideWidgetClass('PageTitleWidget', {
  attributes: {
    // The background color used to be an enum of theme colors. The design carries it now, on
    // the title itself — the element that used to get the `bg-*` class.
    design: ['design', { groups: ['text', 'decoration'] }],
  },
})
