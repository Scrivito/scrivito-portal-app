import { provideWidgetClass } from 'scrivito'

export const TopNavigationWidget = provideWidgetClass('TopNavigationWidget', {
  attributes: {
    metaNavigationObjs: 'referencelist',
    metaNavigationUserDescription: 'string',
    metaNavigationUserTitle: 'string',
    metaNavigationUtilityLink: 'reference',
    slimDesign: 'boolean',
  },
})

export type TopNavigationWidgetInstance = InstanceType<
  typeof TopNavigationWidget
>
