import { provideEditingConfig } from 'scrivito'
import { BreadcrumbWidget } from './BreadcrumbWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(BreadcrumbWidget, {
  title: 'Breadcrumb',
  thumbnail: Thumbnail,
})
