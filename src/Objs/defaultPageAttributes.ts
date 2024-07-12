export const defaultPageAttributes = {
  title: 'string',
  // Layout widgets
  layoutHeader: 'widgetlist',
  layoutShowHeader: 'boolean',
  layoutFooter: ['widgetlist', { only: 'SectionWidget' }],
  layoutShowFooter: 'boolean',
  // Meta tags
  metaDataDescription: 'string',
  robotsIndex: 'boolean',
  // Twitter attributes
  tcCreator: 'string',
  tcDescription: 'string',
  tcImage: ['reference', { only: ['Image'] }],
  tcTitle: 'string',
  // Open Graph attributes (used by Facebook)
  ogDescription: 'string',
  ogImage: ['reference', { only: ['Image'] }],
  ogTitle: 'string',
  // The order of the child pages
  childOrder: 'referencelist',
} as const
