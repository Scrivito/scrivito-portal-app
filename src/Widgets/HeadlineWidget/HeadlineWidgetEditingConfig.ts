import { setupEditorI18n } from '../../i18n'
import { provideEditingConfig } from 'scrivito'
import { HeadlineWidget } from './HeadlineWidgetClass'
import messages from './i18n.editing.json'
import Thumbnail from './thumbnail.svg'

const t = await setupEditorI18n(messages)

provideEditingConfig(HeadlineWidget, {
  title: t('widgetTitle'),
  thumbnail: Thumbnail,
  attributes: {
    style: {
      title: t('style.title'),
      description: t('style.description'),
      values: [
        { value: 'h1', title: t('style.h1') },
        { value: 'h2', title: t('style.h2') },
        { value: 'h3', title: t('style.h3') },
        { value: 'h4', title: t('style.h4') },
        { value: 'h5', title: t('style.h5') },
        { value: 'h6', title: t('style.h6') },
        { value: 'display-1', title: t('style.display1') },
        { value: 'display-2', title: t('style.display2') },
        { value: 'display-3', title: t('style.display3') },
        { value: 'display-4', title: t('style.display4') },
        { value: 'display-5', title: t('style.display5') },
        { value: 'display-6', title: t('style.display6') },
        { value: 'label-headline', title: t('style.labelHeadline') },
        { value: 'label-subtitle', title: t('style.labelSubtitle') },
      ],
    },
    level: {
      title: t('level.title'),
      description: t('level.description'),
      values: [
        { value: 'h1', title: 'h1' },
        { value: 'h2', title: 'h2' },
        { value: 'h3', title: 'h3' },
        { value: 'h4', title: 'h4' },
        { value: 'h5', title: 'h5' },
        { value: 'h6', title: 'h6' },
        { value: 'div', title: t('level.noSemanticTag') },
      ],
    },
    alignment: {
      title: t('alignment.title'),
      description: t('alignment.description'),
      values: [
        { value: 'left', title: t('alignment.left') },
        { value: 'center', title: t('alignment.center') },
        { value: 'right', title: t('alignment.right') },
      ],
    },
    margin: {
      title: t('margin.title'),
      description: t('margin.description'),
    },
    uppercase: {
      title: t('uppercase.title'),
      description: t('uppercase.description'),
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
            message: t('validation.headlineMustBeSet'),
            severity: 'error',
          }
        }
      },
    ],
  ],
})
