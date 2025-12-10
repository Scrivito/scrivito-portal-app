import { provideEditingConfig, Widget } from 'scrivito'
import { DownloadCardWidget } from './DownloadCardWidgetClass'
import Thumbnail from './thumbnail.svg'
import { ScrivitoBootstrapIconPicker } from '@justrelate/icon-picker'

provideEditingConfig(DownloadCardWidget, {
  title: 'Download Card',
  thumbnail: Thumbnail,
  properties: ['link'],
  propertiesGroups: [
    {
      title: 'Icon',
      component: (props: { widget: Widget }) => (
        <ScrivitoBootstrapIconPicker defaultValue="filetype-pdf" {...props} />
      ),
      properties: ['icon'],
      key: 'icon-group',
    },
  ],
  initialContent: {
    icon: 'bi-filetype-pdf',
  },
})
