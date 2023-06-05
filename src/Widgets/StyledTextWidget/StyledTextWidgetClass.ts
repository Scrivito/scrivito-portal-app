import * as Scrivito from 'scrivito'

export const StyledTextWidget = Scrivito.provideWidgetClass(
  'StyledTextWidget',
  {
    attributes: {
      alignment: ['enum', { values: ['left', 'center', 'right'] }],
      bold: 'boolean',
      opacity: [
        'enum',
        {
          values: ['opacity-100', 'opacity-60', 'opacity-50', 'opacity-40'],
        },
      ],
      size: [
        'enum',
        {
          values: [
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'body-font-size',
            'text-small',
            'text-extra-small',
          ],
        },
      ],
      text: 'string',
      uppercase: 'boolean',
    },
    extractTextAttributes: ['text'],
  }
)
