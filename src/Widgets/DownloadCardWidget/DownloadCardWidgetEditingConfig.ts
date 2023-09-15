import { provideEditingConfig } from 'scrivito'
import { DownloadCardWidget } from './DownloadCardWidgetClass'

provideEditingConfig(DownloadCardWidget, {
  title: 'Download card',
  attributes: {
    icon: {
      title: 'Icon',
      description:
        'Default: "bi-filetype-pdf". The full list of names can be found at https://icons.getbootstrap.com/',
    },
    link: {
      title: 'Link',
      description:
        'Title, "Open in new tab" toggle and SEO options will be ignored.',
    },
    linkFromDataItem: {
      title: 'Generate link from data item?',
    },
    dataItemAttributeName: {
      title: 'Data item attribute name',
    },
  },
  properties: (widget) => [
    'icon',
    ['link', { enabled: !widget.get('linkFromDataItem') }],
    'linkFromDataItem',
    ['dataItemAttributeName', { enabled: widget.get('linkFromDataItem') }],
  ],
  initialContent: {
    icon: 'bi-filetype-pdf',
  },
})
