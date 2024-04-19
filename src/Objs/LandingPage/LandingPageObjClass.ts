import { provideObjClass } from 'scrivito'

export const LandingPage = provideObjClass('LandingPage', {
  attributes: {
    body: 'widgetlist',
    excludeFromSearch: 'boolean',
    hideInNavigation: 'boolean',
    metaDataDescription: 'string',
    title: 'string',
  },
  extractTextAttributes: ['body'],
})

export type LandingPageInstance = InstanceType<typeof LandingPage>

export function isLandingPage(input: unknown): input is LandingPageInstance {
  return input instanceof LandingPage
}
