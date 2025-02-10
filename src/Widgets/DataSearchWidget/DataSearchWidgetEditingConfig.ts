import { provideEditingConfig } from 'scrivito'
import {
  DEFAULT_URL_PARAM_NAME,
  DataSearchWidget,
  DataSearchWidgetInstance,
} from './DataSearchWidgetClass'
import thumbnail from './thumbnail.svg'

provideEditingConfig(DataSearchWidget, {
  title: 'Data Search',
  thumbnail,
  attributes: {
    buttonColor: {
      title: 'Button color',
      description: 'Default: Primary color',
      values: [
        { value: 'btn-primary', title: 'Primary color' },
        { value: 'btn-secondary', title: 'Secondary color' },
      ],
    },
    buttonLabel: {
      title: 'Button label (optional)',
    },
    placeholder: {
      title: 'Input placeholder text',
    },
    urlParamName: {
      title: 'URL parameter name',
      description: 'Default: search',
    },
  },
  properties: ['buttonColor', 'buttonLabel', 'placeholder', 'urlParamName'],
  initialContent: {
    buttonColor: 'btn-primary',
    urlParamName: DEFAULT_URL_PARAM_NAME,
    placeholder: 'Search',
  },
  validations: [
    [
      'urlParamName',
      (
        urlParamName: string,
        { widget }: { widget: DataSearchWidgetInstance },
      ) => {
        const name = urlParamName || DEFAULT_URL_PARAM_NAME
        const duplicatesCount = widget
          .obj()
          .widgets()
          .filter(
            (w) =>
              w.objClass() === 'DataSearchWidget' &&
              name === (w.get('urlParamName') || DEFAULT_URL_PARAM_NAME),
          ).length

        if (duplicatesCount > 1) {
          return {
            message: `There are ${duplicatesCount} data search widgets sharing the URL parameter name “${name}”.`,
            severity: 'warning',
          }
        }
      },
    ],
  ],
})
