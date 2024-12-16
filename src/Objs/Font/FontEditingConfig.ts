import { Binary, provideEditingConfig } from 'scrivito'
import { Font } from './FontObjClass'

provideEditingConfig(Font, {
  title: 'Font',
  attributes: {
    weight: {
      title: 'font-weight (optional)',
      description:
        'Either a single value (e.g. "400") or a range (e.g. "100 1000").',
    },
  },
  properties: ['weight'],
  validations: [
    [
      'blob',
      (blob: Binary | null) => {
        if (blob?.raw().contentType().startsWith('font/')) return

        return {
          message: 'The uploaded file is not a font file.',
          severity: 'error',
        }
      },
    ],
    [
      'weight',
      (weight: string) => {
        if (!weight) return

        if (weight.match(/^[1-9]\d{0,3}$/)) return
        if (weight.match(/^[1-9]\d{0,3} [1-9]\d{0,3}$/)) return

        return {
          message: 'Wrong font-weight format.',
          severity: 'error',
        }
      },
    ],
  ],
})
