import { configureObjClassForContentType as scrivitoConfigureObjClassForContentType } from 'scrivito'

export function configureObjClassForContentType() {
  scrivitoConfigureObjClassForContentType({
    'font/*': 'Font',
    'image/*': 'Image',
    'video/*': 'Video',
    '*/*': 'Download',
  })
}
