import { Binary, provideEditingConfig } from 'scrivito'
import { Font } from './FontObjClass'

provideEditingConfig(Font, {
  title: 'Font',
  attributes: {
    family: { title: 'font-family' },
    weight: {
      title: 'font-weight (optional)',
      description:
        'Either a single value (e.g. "400") or a range (e.g. "100 1000").',
    },
  },
  properties: ['family', 'weight'],
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
      (family: string) => {
        if (!family) {
          return {
            message: 'The font-family name must be set.',
            severity: 'error',
          }
        }

        if (family !== family.trim()) {
          return {
            message:
              'Invalid font-family name: The name must not start or end with a space.',
            severity: 'error',
          }
        }

        if (family.match(/ {2}/)) {
          return {
            message:
              'Invalid font-family name: The name must not contain consecutive spaces.',
            severity: 'error',
          }
        }

        if (
          !family
            .split(' ')
            .every((part) => part.match(/^[a-zA-Z_-][a-zA-Z0-9_-]*$/))
        ) {
          return {
            message:
              'Invalid font-family name: Only letters (a-z, A-Z), numbers, spaces, _ or - are allowed.',
            severity: 'error',
          }
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
