import { provideEditingConfig } from 'scrivito'
import { DataBreadcrumbWidget } from './DataBreadcrumbWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DataBreadcrumbWidget, {
  title: 'Data Breadcrumb',
  thumbnail: Thumbnail,
  attributes: {
    data: { restrictDataTo: ['itemAttribute'] },
    parentData: { restrictDataTo: ['itemAttribute'] },
  },
  propertiesGroups: [
    { title: 'Label data', properties: ['labelData'] },
    { title: 'Parent data', properties: ['parentData'] },
  ],
})
