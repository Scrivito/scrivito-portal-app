import { Binary, provideEditingConfig } from 'scrivito'
import { Font } from './FontObjClass'

provideEditingConfig(Font, {
  title: 'Font',
  attributes: {
    family: { title: 'font-family' },
    variations: {
      title: 'Variable font?',
      description:
        'Does this file contain multiple font variations? See https://fonts.google.com/knowledge/glossary/variable_fonts for details.',
    },
    weight: {
      title: 'font-weight (optional)',
      description:
        'Either a single value (e.g. "400") or a range (e.g. "100 1000").',
    },
  },
  properties: ['family', 'weight', 'variations'],
  validations: [
    [
      'blob',
      (blob: Binary | null) => {
        if (blob?.raw().contentType() === 'font/woff2') return

        return {
          message: 'Only WOFF2 font files are supported.',
          severity: 'error',
        }
      },
    ],
    [
      'family',
      (family) => {
        if (family) return

        return {
          message: 'The font-family must be set.',
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
