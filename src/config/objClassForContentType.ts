import { configureObjClassForContentType as scrivitoConfigureObjClassForContentType } from 'scrivito'

export function configureObjClassForContentType() {
  scrivitoConfigureObjClassForContentType({
    'font/*': 'Font',
    'application/font-woff': 'Font',
    'image/*': 'Image',
    'video/*': 'Video',
    '*/*': 'Download',
  })
}
