import { provideEditingConfig } from 'scrivito'
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
