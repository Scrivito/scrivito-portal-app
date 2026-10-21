import { Design, provideEditingConfig } from 'scrivito'
import { SectionWidget } from './SectionWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(SectionWidget, {
  title: 'Section',
  thumbnail: Thumbnail,
  attributes: {
    backgroundAnimateOnHover: {
      title: 'Animate background on hover?',
      description: 'Default: No',
    },
    backgroundImage: {
      title: 'Background image or video',
    },
    containerWidth: {
      title: 'Container width',
      description: 'Default: fixed',
      values: [
        { value: 'fixed', title: 'fixed' },
        { value: '95-percent', title: '95%' },
        { value: '100-percent', title: '100%' },
      ],
    },
  },
  properties: ['containerWidth'],
  initialContent: {
    containerWidth: 'fixed',
    // What `showPadding: true` used to render.
    design: new Design({
      desktop: { paddingTop: '3rem', paddingBottom: '3rem' },
    }),
  },
})
