import { provideWidgetClass } from 'scrivito'

export const DataCountWidget = provideWidgetClass('DataCountWidget', {
  attributes: {
    headline: 'string',
    headline0: 'string',
    headline1: 'string',
    loadingHeadline: 'string',
  },
})

export type DataCountWidgetInstance = InstanceType<typeof DataCountWidget>
