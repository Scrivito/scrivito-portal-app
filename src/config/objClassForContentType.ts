import { configureObjClassForContentType as scrivitoConfigureObjClassForContentType } from 'scrivito'

export function configureObjClassForContentType() {
  scrivitoConfigureObjClassForContentType({
    'application/font-woff': 'Font',
    'font/*': 'Font',
    'image/*': 'Image',
    'video/*': 'Video',
    '*/*': 'Download',
  })
}
