import { provideEditingConfig } from 'scrivito'
import { DataSearchWidget } from './DataSearchWidgetClass'
import thumbnail from './thumbnail.svg'

const DEFAULT_PARAM_NAME = 'search'

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
    placeholder: { title: 'Placeholder text' },
    urlParamName: {
      title: 'URL parameter name',
      description: 'Default: search',
    },
  },
  properties: ['buttonColor', 'placeholder', 'urlParamName'],
  initialContent: {
    buttonColor: 'btn-primary',
    urlParamName: DEFAULT_PARAM_NAME,
  },
  validations: [
    [
      'urlParamName',
      (urlParamName, { widget }) => {
        const name = urlParamName || DEFAULT_PARAM_NAME
        const duplicatesCount = widget
          .obj()
          .widgets()
          .filter(
            (w) =>
              w.objClass() === 'DataSearchWidget' &&
              name === (w.get('urlParamName') || DEFAULT_PARAM_NAME),
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
