import { editorLanguage, load, provideEditingConfig } from 'scrivito'
import { HeadlineWidget } from './HeadlineWidgetClass'
import messages from './i18n.editing.json'
import rosetta from 'rosetta'
import Thumbnail from './thumbnail.svg'

const i18n = rosetta(messages)
const lang = (await load(() => editorLanguage())) ?? 'en'
i18n.locale(lang in messages ? lang : 'en')

provideEditingConfig(HeadlineWidget, {
  title: i18n.t('widgetTitle'),
  thumbnail: Thumbnail,
  attributes: {
    style: {
      title: i18n.t('style.title'),
      description: i18n.t('style.description'),
      values: [
        { value: 'h1', title: i18n.t('style.h1') },
        { value: 'h2', title: i18n.t('style.h2') },
        { value: 'h3', title: i18n.t('style.h3') },
        { value: 'h4', title: i18n.t('style.h4') },
        { value: 'h5', title: i18n.t('style.h5') },
        { value: 'h6', title: i18n.t('style.h6') },
        { value: 'display-1', title: i18n.t('style.display1') },
        { value: 'display-2', title: i18n.t('style.display2') },
        { value: 'display-3', title: i18n.t('style.display3') },
        { value: 'display-4', title: i18n.t('style.display4') },
        { value: 'display-5', title: i18n.t('style.display5') },
        { value: 'display-6', title: i18n.t('style.display6') },
        { value: 'label-headline', title: i18n.t('style.labelHeadline') },
        { value: 'label-subtitle', title: i18n.t('style.labelSubtitle') },
      ],
    },
    level: {
      title: i18n.t('level.title'),
      description: i18n.t('level.description'),
      values: [
        { value: 'h1', title: 'h1' },
        { value: 'h2', title: 'h2' },
        { value: 'h3', title: 'h3' },
        { value: 'h4', title: 'h4' },
        { value: 'h5', title: 'h5' },
        { value: 'h6', title: 'h6' },
        { value: 'div', title: i18n.t('level.noSemanticTag') },
      ],
    },
    alignment: {
      title: i18n.t('alignment.title'),
      description: i18n.t('alignment.description'),
      values: [
        { value: 'left', title: i18n.t('alignment.left') },
        { value: 'center', title: i18n.t('alignment.center') },
        { value: 'right', title: i18n.t('alignment.right') },
      ],
    },
    margin: {
      title: i18n.t('margin.title'),
      description: i18n.t('margin.description'),
    },
    uppercase: {
      title: i18n.t('uppercase.title'),
      description: i18n.t('uppercase.description'),
    },
  },
  properties: ['style', 'level', 'alignment', 'margin', 'uppercase'],
  initialContent: {
    alignment: 'left',
    headline: 'Headline',
    margin: 'mb-2',
    style: 'h2',
  },
  validations: [
    [
      'headline',

      (headline) => {
        if (!headline) {
          return {
            message: i18n.t('validation.headlineMustBeSet'),
            severity: 'error',
          }
        }
      },
    ],
  ],
})
