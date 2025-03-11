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
  layoutMainBackgroundColor: [
    'enum',
    {
      values: [
        'white',
        'primary',
        'secondary',
        'light-grey',
        'middle-grey',
        'dark-grey',
        'transparent',
        'success',
        'info',
        'warning',
        'danger',
      ],
    },
  ],
  // Meta tags
  description: 'string',
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
