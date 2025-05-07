import { provideEditingConfig } from 'scrivito'
import { DataBreadcrumbWidget } from './DataBreadcrumbWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DataBreadcrumbWidget, {
  title: 'Data Breadcrumb',
  description:
    'Generates breadcrumbs by following a parent attribute on items.',
  thumbnail: Thumbnail,
  attributes: { data: { restrictDataTo: ['itemAttribute'] } },
  propertiesGroups: [{ title: 'Label data', properties: ['labelData'] }],
})
