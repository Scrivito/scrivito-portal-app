import { provideWidgetClass } from 'scrivito'

export const MapWidget = provideWidgetClass('MapWidget', {
  attributes: {
    mapType: ['enum', { values: ['interactive', 'static'] }],
    zoom: [
      'enum',
      {
        values: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
        ],
      },
    ],
    longitude: 'float',
    location: 'string',
    latitude: 'float',
    showWidgets: 'boolean',
    content: 'widgetlist',
  },
})

export type MapWidgetInstance = InstanceType<typeof MapWidget>
