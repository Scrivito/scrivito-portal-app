import {
  canEdit,
  isComparisonActive,
  provideEditingConfig,
  uiContext,
  Widget,
} from 'scrivito'
import { HeadlineWidget } from './HeadlineWidgetClass'
import { AdvancedEnumEditor } from '../../Components/ScrivitoExtensions/AdvancedEnumEditor'
import textAlignLeftSvg from '../../Components/ScrivitoExtensions/AlignmentEditor/text-align-left.svg'
import textAlignCenterSvg from '../../Components/ScrivitoExtensions/AlignmentEditor/text-align-center.svg'
import textAlignRightSvg from '../../Components/ScrivitoExtensions/AlignmentEditor/text-align-right.svg'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(HeadlineWidget, {
  title: 'Headline',
  thumbnail: Thumbnail,
  attributes: {
    style: {
      title: 'Style',
      description: 'Default: Heading 2',
      values: [
        { value: 'h1', title: 'Heading 1' },
        { value: 'h2', title: 'Heading 2' },
        { value: 'h3', title: 'Heading 3' },
        { value: 'h4', title: 'Heading 4' },
        { value: 'h5', title: 'Heading 5' },
        { value: 'h6', title: 'Heading 6' },
        { value: 'display-1', title: 'Display heading 1' },
        { value: 'display-2', title: 'Display heading 2' },
        { value: 'display-3', title: 'Display heading 3' },
        { value: 'display-4', title: 'Display heading 4' },
        { value: 'display-5', title: 'Display heading 5' },
        { value: 'display-6', title: 'Display heading 6' },
        { value: 'label-headline', title: 'Label heading' },
        { value: 'label-subtitle', title: 'Label subtitle' },
      ],
    },
    level: {
      title: 'Heading tag (optional)',
      description:
        'May be used for SEO, for generating a table of contents,' +
        ' or for improving accessibility. Default: Derived from Style',
      values: [
        { value: 'h1', title: 'h1' },
        { value: 'h2', title: 'h2' },
        { value: 'h3', title: 'h3' },
        { value: 'h4', title: 'h4' },
        { value: 'h5', title: 'h5' },
        { value: 'h6', title: 'h6' },
        { value: 'div', title: 'No semantic tag' },
      ],
    },
    alignment: {
      title: 'Alignment',
      description: 'Default: Left',
    },
    margin: {
      title: 'Margin',
      description: 'Space below the widget. Default: mb-2',
    },
    uppercase: { title: 'Uppercase?', description: 'Default: No' },
  },
  properties: [
    'style',
    'level',
    [
      'alignment',
      {
        component: ({ widget }: { widget: Widget }) => (
          <AdvancedEnumEditor
            attributeValue={widget.get('alignment')}
            options={[
              {
                value: 'left',
                title: 'Left',
                icon: textAlignLeftSvg,
              },
              {
                value: 'center',
                title: 'Center',
                icon: textAlignCenterSvg,
              },
              {
                value: 'right',
                title: 'Right',
                icon: textAlignRightSvg,
              },
            ]}
            readOnly={!canEdit(widget.obj()) || isComparisonActive()}
            theme={(uiContext() || { theme: null }).theme}
            updateAttributeValue={(value: string) =>
              widget.update({ alignment: value })
            }
          />
        ),
      },
    ],
    'margin',
    'uppercase',
  ],
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
          return { message: 'The headline must be set.', severity: 'error' }
        }
      },
    ],
  ],
})
