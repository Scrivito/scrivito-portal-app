import { provideEditingConfig, Widget } from 'scrivito'
import { DownloadCardWidget } from './DownloadCardWidgetClass'
import Thumbnail from './thumbnail.svg'
import { ScrivitoBootstrapIconPicker } from '../../Components/ScrivitoExtensions/ScrivitoBootstrapIconPicker'

provideEditingConfig(DownloadCardWidget, {
  title: 'Download Card',
  thumbnail: Thumbnail,
  properties: [
    'link',
    [
      'icon',
      {
        component: ({ widget }: { widget: Widget }) => (
          <ScrivitoBootstrapIconPicker
            attribute="icon"
            defaultValue="filetype-pdf"
            widget={widget}
          />
        ),
      },
    ],
  ],
  initialContent: {
    icon: 'bi-filetype-pdf',
  },
})
