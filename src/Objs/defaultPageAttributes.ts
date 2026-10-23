export const defaultPageAttributes = {
  title: 'string',
  linkIcon: 'string',
  // Layout widgets
  layoutHeader: 'widgetlist',
  layoutShowHeader: 'boolean',
  layoutFooter: [
    'widgetlist',
    { only: ['HomepageFooterWidget', 'SectionWidget'] },
  ],
  layoutShowFooter: 'boolean',
  layoutLeftSidebar: 'widgetlist',
  layoutShowLeftSidebar: 'boolean',
  layoutRightSidebar: 'widgetlist',
  layoutShowRightSidebar: 'boolean',
  // The design of the main area, i.e. of everything but the header and the footer.
  design: ['design', { kind: 'container' }],
  // Meta tags
  description: 'string',
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
