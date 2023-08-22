import { configureObjClassForContentType as scrivitoConfigureObjClassForContentType } from 'scrivito'

export function configureObjClassForContentType() {
  scrivitoConfigureObjClassForContentType({
    'image/*': 'Image',
    'video/*': 'Video',
    '*/*': 'Download',
  })
}
