import { provideEditingConfig } from 'scrivito'
import { MapWidget } from './MapWidgetClass'
import { MapLocationEditorTab } from './MapLocationEditorTab'

provideEditingConfig(MapWidget, {
  title: 'Map',
  attributes: {
    mapType: {
      title: 'Map type',
      description: 'Default: Interactive',
      values: [
        { value: 'interactive', title: 'Interactive' },
        { value: 'static', title: 'Static' },
      ],
    },
    zoom: {
      title: 'Zoom level',
      description: 'Default: 15 (Street level)',
      values: [
        { value: '1', title: '1 (World level)' },
        { value: '2', title: '2' },
        { value: '3', title: '3' },
        { value: '4', title: '4' },
        { value: '5', title: '5' },
        { value: '6', title: '6' },
        { value: '7', title: '7' },
        { value: '8', title: '8' },
        { value: '9', title: '9' },
        { value: '10', title: '10' },
        { value: '11', title: '11' },
        { value: '12', title: '12' },
        { value: '13', title: '13' },
        { value: '14', title: '14' },
        { value: '15', title: '15 (Street level)' },
        { value: '16', title: '16' },
        { value: '17', title: '17' },
        { value: '18', title: '18' },
        { value: '19', title: '19' },
        { value: '20', title: '20 (Building level)' },
      ],
    },
    showWidgets: {
      title: 'Show map widgets?',
      description: 'Should widgets be shown on top of this map? Default: No',
    },
  },
  propertiesGroups: [
    {
      title: 'Map Location',
      key: 'map-location-group',
      component: MapLocationEditorTab,
      properties: ['location', 'longitude', 'latitude'],
    },
  ],
  properties: ['zoom', 'mapType', 'showWidgets'],
  initialContent: {
    latitude: 52.517,
    longitude: 13.388,
    mapType: 'interactive',
    zoom: '15',
  },
  validations: [
    [
      'latitude',
      (value) => {
        if (typeof value === 'number' && value >= -90 && value <= 90) return

        return {
          message: 'The latitude must be a number between -90 and 90.',
          severity: 'error',
        }
      },
    ],
    [
      'longitude',
      (value) => {
        if (typeof value === 'number' && value >= -180 && value <= 180) return

        return {
          message: 'The longitude must be a number between -180 and 180.',
          severity: 'error',
        }
      },
    ],
  ],
})
