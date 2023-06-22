import * as Scrivito from 'scrivito'

export const DownloadCardWidget = Scrivito.provideWidgetClass(
  'DownloadCardWidget',
  {
    attributes: {
      details: 'string',
      icon: 'string',
      link: 'link',
      subTitle: 'string',
      title: 'string',
    },
  }
)
