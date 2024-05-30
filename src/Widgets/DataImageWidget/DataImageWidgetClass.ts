import { provideWidgetClass } from 'scrivito'

export const DataImageWidget = provideWidgetClass('DataImageWidget', {
  attributes: {
    alignment: ['enum', { values: ['left', 'center', 'right'] }],
    data: 'datalocator',
    roundCorners: 'boolean',
    link: 'link',
  },
})

export type DataImageWidgetInstance = InstanceType<typeof DataImageWidget>
