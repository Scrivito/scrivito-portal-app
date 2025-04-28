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
  propertiesGroups: [{ title: 'Parent data', properties: ['parentData'] }],
})
