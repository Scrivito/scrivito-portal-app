import { provideWidgetClass } from 'scrivito'

export const DataIconWidget = provideWidgetClass('DataIconWidget', {
  attributes: {
    alignment: ['enum', { values: ['left', 'center', 'right'] }],
    conditions: ['widgetlist', { only: 'DataIconConditionWidget' }],
    data: 'datalocator',
    fallbackIcon: 'string',
    label: 'string',
    size: ['enum', { values: ['bi-1x', 'bi-2x', 'bi-3x', 'bi-4x', 'bi-5x'] }],
  },
})
