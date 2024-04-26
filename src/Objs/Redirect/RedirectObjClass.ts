import { provideObjClass } from 'scrivito'

export const Redirect = provideObjClass('Redirect', {
  attributes: {
    title: 'string',
    link: 'link',
    requireLogin: 'boolean',
  },
})

export type RedirectInstance = InstanceType<typeof Redirect>

export function isRedirect(input: unknown): input is RedirectInstance {
  return input instanceof Redirect
}
