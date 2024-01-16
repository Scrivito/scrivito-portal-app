import { provideEditingConfig } from 'scrivito'
import { DownloadCardWidget } from './DownloadCardWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DownloadCardWidget, {
  title: 'Download Card',
  thumbnail: Thumbnail,
  attributes: {
    icon: {
      title: 'Icon',
      description:
        'Default: "bi-filetype-pdf". The full list of names can be found at https://icons.getbootstrap.com/',
    },
  },
  properties: ['link', 'icon'],
  initialContent: {
    icon: 'bi-filetype-pdf',
  },
})
