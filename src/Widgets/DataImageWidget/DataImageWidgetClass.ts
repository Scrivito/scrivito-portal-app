import { provideWidgetClass } from 'scrivito'
import { paddingAttributes } from '../propertiesGroups/padding/paddingAttributes'

export const DataImageWidget = provideWidgetClass('DataImageWidget', {
  attributes: {
    alignment: ['enum', { values: ['left', 'center', 'right'] }],
    data: 'datalocator',
    height: 'string',
    link: 'link',
    objectFit: ['enum', { values: ['cover', 'contain'] }],
    roundCorners: 'boolean',
    width: 'string',
    ...paddingAttributes,
  },
})

export type DataImageWidgetInstance = InstanceType<typeof DataImageWidget>
