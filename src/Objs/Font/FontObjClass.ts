import { provideObjClass } from 'scrivito'

export const Font = provideObjClass('Font', {
  attributes: {
    blob: 'binary',
    weight: 'string',
  },
})

export type FontInstance = InstanceType<typeof Font>
export function isFont(
  input: unknown,
): input is FontInstance & { objClass(): 'Font' } {
  return input instanceof Font
}
