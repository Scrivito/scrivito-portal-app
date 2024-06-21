import { provideObjClass } from 'scrivito'

export const Image = provideObjClass('Image', {
  attributes: {
    alternativeText: 'string',
    blob: 'binary',
    tags: 'stringlist',
  },
})

export type ImageInstance = InstanceType<typeof Image>

export function isImage(input: unknown): input is ImageInstance {
  return input instanceof Image
}
