import thumbnail from './thumbnail.svg'
import { TickListItemWidget } from '../TickListItemWidget/TickListItemWidgetClass'
import { provideEditingConfig, Widget } from 'scrivito'
import { ScrivitoBootstrapIconPicker } from '../../Components/ScrivitoExtensions/ScrivitoBootstrapIconPicker'
import { TickListWidget } from './TickListWidgetClass'
import {
  textStyleEditAttributes,
  textStyleGroup,
  textStyleInitialContent,
} from '../propertiesGroups/textStyle/textStyleEditingConfig'
import {
  paddingEditAttributes,
  paddingGroup,
} from '../propertiesGroups/padding/paddingEditingConfig'

// @ts-expect-error - TODO: Remove once #12736 is fixed
provideEditingConfig(TickListWidget, {
  title: 'Tick List',
  thumbnail,
  attributes: {
    ...paddingEditAttributes,
    ...textStyleEditAttributes,
  },
  properties: [
    [
      'icon',
      {
        component: ({ widget }: { widget: Widget }) => (
          <ScrivitoBootstrapIconPicker
            attribute="icon"
            defaultValue="check"
            widget={widget}
          />
        ),
      },
    ],
  ],
  propertiesGroups: [textStyleGroup, paddingGroup],
  initialContent: {
    icon: 'bi-check',
    items: [
      new TickListItemWidget({}),
      new TickListItemWidget({}),
      new TickListItemWidget({}),
    ],
    ...textStyleInitialContent,
  },
  validations: [
    [
      'items',

      (items) => {
        if (Array.isArray(items) && items.length < 1) {
          return {
            message: 'The tick list must include at least one item.',
            severity: 'error',
          }
        }
      },
    ],
  ],
})
