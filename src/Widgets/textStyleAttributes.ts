export const textStyleAttributes = {
  fontSize: 'string',
  letterSpacing: 'string',
  lineHeight: 'string',
  textColor: 'string',
  textTransform: [
    'enum',
    { values: ['none', 'uppercase', 'lowercase', 'capitalize'] },
  ],
} as const
