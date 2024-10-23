import { provideEditingConfig } from 'scrivito'
import { DownloadCardWidget } from './DownloadCardWidgetClass'
import Thumbnail from './thumbnail.svg'
import { ScrivitoBootstrapIconEditor } from 'scrivito-icon-editor'

provideEditingConfig(DownloadCardWidget, {
  title: 'Download Card',
  thumbnail: Thumbnail,
  properties: ['link'],
  propertiesGroups: [
    {
      title: 'Icon',
      component: ScrivitoBootstrapIconEditor,
      properties: ['icon'],
      key: 'icon-group',
    },
  ],
  initialContent: {
    icon: 'bi-filetype-pdf',
  },
})
