import { provideEditingConfig } from 'scrivito'
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
      title: 'font-weight',
      description:
        'Either a single value (e.g. "400") or a range (e.g. "100 1000").',
    },
  },
  properties: ['family', 'variations', 'weight'],
  initialContent: {
    format: 'woff2',
    variations: true,
  },
})
