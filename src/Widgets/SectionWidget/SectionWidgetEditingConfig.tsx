import {
  canEdit,
  isComparisonActive,
  provideEditingConfig,
  uiContext,
  Widget,
} from 'scrivito'
import { SectionWidget } from './SectionWidgetClass'
import { AdvancedEnumEditor } from '../../Components/ScrivitoExtensions/AdvancedEnumEditor'
import fixedSvg from '../../Components/ScrivitoExtensions/ContainerWidthEditor/container-width-fixed.svg'
import width95Svg from '../../Components/ScrivitoExtensions/ContainerWidthEditor/container-width-95.svg'
import width100Svg from '../../Components/ScrivitoExtensions/ContainerWidthEditor/container-width-100.svg'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(SectionWidget, {
  title: 'Section',
  thumbnail: Thumbnail,
  attributes: {
    backgroundAnimateOnHover: {
      title: 'Animate background on hover?',
      description: 'Default: No',
    },
    backgroundColor: {
      title: 'Background color',
      description: 'Default: Transparent',
      values: [
        { value: 'transparent', title: 'Transparent' },
        { value: 'white', title: 'White' },
        { value: 'primary', title: 'Primary color' },
        { value: 'secondary', title: 'Secondary color' },
        { value: 'light-grey', title: 'Light grey' },
        { value: 'middle-grey', title: 'Grey' },
        { value: 'dark-grey', title: 'Dark grey' },
        { value: 'success', title: 'Success' },
        { value: 'info', title: 'Info' },
        { value: 'warning', title: 'Warning' },
        { value: 'danger', title: 'Danger' },
      ],
    },
    backgroundImage: {
      title: 'Background image or video',
    },
    containerWidth: {
      title: 'Container width',
      description: 'Default: fixed',
    },
    showPadding: {
      title: 'Padding',
      description: 'Padding adds space around this section. Default: Yes',
    },
  },
  properties: (widget) => [
    'backgroundColor',
    'backgroundImage',
    ['backgroundAnimateOnHover', { enabled: !!widget.get('backgroundImage') }],
    [
      'containerWidth',
      {
        component: ({ widget }: { widget: Widget }) => (
          <AdvancedEnumEditor
            attributeValue={widget.get('containerWidth')}
            options={[
              {
                value: 'fixed',
                title: 'Fixed',
                icon: fixedSvg,
              },
              {
                value: '95-percent',
                title: '95%',
                icon: width95Svg,
              },
              {
                value: '100-percent',
                title: '100%',
                icon: width100Svg,
              },
            ]}
            readOnly={!canEdit(widget.obj()) || isComparisonActive()}
            theme={(uiContext() || { theme: null }).theme}
            updateAttributeValue={(value: string) =>
              widget.update({ containerWidth: value })
            }
          />
        ),
      },
    ],
    'showPadding',
  ],
  initialContent: {
    backgroundColor: 'transparent',
    containerWidth: 'fixed',
    showPadding: true,
  },
})
