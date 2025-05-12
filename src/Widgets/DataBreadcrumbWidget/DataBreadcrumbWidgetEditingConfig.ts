import { provideEditingConfig } from 'scrivito'
import { DataBreadcrumbWidget } from './DataBreadcrumbWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DataBreadcrumbWidget, {
  title: 'Data Breadcrumb',
  description:
    'Displays breadcrumbs based on hierarchical parent connections in the data.',
  thumbnail: Thumbnail,
  attributes: { labelData: { restrictDataTo: ['itemAttribute'] } },
  properties: ['labelData'],
})
