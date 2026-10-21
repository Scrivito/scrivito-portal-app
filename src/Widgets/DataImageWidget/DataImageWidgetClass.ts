import { provideWidgetClass } from 'scrivito'

export const DataImageWidget = provideWidgetClass('DataImageWidget', {
  attributes: {
    alignment: ['enum', { values: ['left', 'center', 'right'] }],
    data: 'datalocator',
    // Width, height, object fit and round corners used to be attributes of their own. The
    // design applies to the image itself, which is what all four of them styled.
    design: ['design', { preset: 'media' }],
    link: 'link',
  },
})

export type DataImageWidgetInstance = InstanceType<typeof DataImageWidget>
