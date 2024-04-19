import { provideEditingConfig } from 'scrivito'
import { DataLoadMoreButtonWidget } from './DataLoadMoreButtonWidgetClass'
import thumbnail from './thumbnail.svg'

provideEditingConfig(DataLoadMoreButtonWidget, {
  title: 'Data Load More Button',
  thumbnail,
  attributes: {
    alignment: {
      title: 'Alignment',
      description: 'Default: Left',
      values: [
        { value: 'left', title: 'Left' },
        { value: 'center', title: 'Center' },
        { value: 'right', title: 'Right' },
        { value: 'block', title: 'Full width' },
      ],
    },
    buttonColor: {
      title: 'Button color',
      description: 'Default: Primary outline color',
      values: [
        { value: 'btn-primary', title: 'Primary color' },
        { value: 'btn-secondary', title: 'Secondary color' },
        { value: 'btn-danger', title: 'Danger color' },
        { value: 'btn-outline-primary', title: 'Primary outline color' },
        { value: 'btn-outline-secondary', title: 'Secondary outline color' },
        { value: 'btn-outline-danger', title: 'Danger outline color' },
      ],
    },
    buttonSize: {
      title: 'Button size',
      description: 'Default: medium',
    },
  },
  properties: ['title', 'alignment', 'buttonColor', 'buttonSize'],
  initialContent: {
    alignment: 'left',
    title: 'Load more',
    buttonColor: 'btn-outline-primary',
    buttonSize: 'medium',
  },
  validations: [
    [
      'title',
      (title) => {
        if (!title) return 'Please provide a title'
      },
    ],
  ],
})
