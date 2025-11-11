import { provideEditingConfig, Widget } from 'scrivito'
import { DownloadCardWidget } from './DownloadCardWidgetClass'
import Thumbnail from './thumbnail.svg'
import { ScrivitoBootstrapIconEditor } from 'scrivito-icon-editor'

provideEditingConfig(DownloadCardWidget, {
  title: 'Download Card',
  thumbnail: Thumbnail,
  properties: [
    'link',
    [
      'icon',
      {
        component: ({ widget }: { widget: Widget }) => (
          <ScrivitoBootstrapIconEditor
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
