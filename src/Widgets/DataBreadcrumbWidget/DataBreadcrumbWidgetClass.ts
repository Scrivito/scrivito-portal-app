import { provideWidgetClass } from 'scrivito'

export const DataBreadcrumbWidget = provideWidgetClass('DataBreadcrumbWidget', {
  attributes: {
    data: 'datalocator',
    parentData: 'datalocator',
  },
})
