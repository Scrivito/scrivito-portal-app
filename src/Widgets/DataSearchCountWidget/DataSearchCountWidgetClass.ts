import { provideWidgetClass } from 'scrivito'

export const DataSearchCountWidget = provideWidgetClass(
  'DataSearchCountWidget',
  {
    attributes: {
      headline: 'string',
      headline0: 'string',
      headline1: 'string',
      loadingHeadline: 'string',
    },
  },
)

export type DataSearchCountWidgetInstance = InstanceType<
  typeof DataSearchCountWidget
>
