import { provideEditingConfig } from 'scrivito'
import { TextWidget } from './TextWidgetClass'
import {
  textStyleEditAttributes,
  textStyleGroup,
  textStyleInitialContent,
} from '../propertiesGroups/textStyle/textStyleEditingConfig'
import Thumbnail from './thumbnail.svg'

// @ts-expect-error - TODO: Remove once #12736 is fixed
provideEditingConfig(TextWidget, {
  title: 'Text',
  thumbnail: Thumbnail,
  attributes: {
    alignment: {
      title: 'Alignment',
      description: 'Default: Left',
      values: [
        { value: 'left', title: 'Left' },
        { value: 'center', title: 'Center' },
        { value: 'right', title: 'Right' },
      ],
    },
    text: {
      title: 'Content',
    },
    ...textStyleEditAttributes,
  },
  properties: ['alignment', 'text'],
  propertiesGroups: [textStyleGroup],
  initialContent: {
    alignment: 'left',
    text: 'Text',
    ...textStyleInitialContent,
  },
})
