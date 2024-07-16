import { provideWidgetClass } from 'scrivito'

export const TopNavigationWidget = provideWidgetClass('TopNavigationWidget', {
  attributes: {
    metaNavigationObjs: 'referencelist',
    metaNavigationUserDescription: 'string',
    metaNavigationUserTitle: 'string',
    metaNavigationProminentPage: 'reference',
    slimDesign: 'boolean',
  },
})

export type TopNavigationWidgetInstance = InstanceType<
  typeof TopNavigationWidget
>
