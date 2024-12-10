import { provideObjClass } from 'scrivito'

export const Font = provideObjClass('Font', {
  attributes: {
    blob: 'binary',
    family: 'string',
    variations: 'boolean',
    weight: 'string',
  },
})

export type FontInstance = InstanceType<typeof Font>
export function isFont(input: unknown): input is FontInstance {
  return input instanceof Font
}
