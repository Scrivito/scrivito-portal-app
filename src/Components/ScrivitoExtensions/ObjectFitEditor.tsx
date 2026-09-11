import { connect, Widget } from 'scrivito'
import { AdvancedEnumEditor } from './AdvancedEnumEditor'
import containSvg from './ObjectFitEditor/object-fit-contain.svg'
import coverSvg from './ObjectFitEditor/object-fit-cover.svg'

type ObjectFitWidget = Widget<{
  objectFit: ['enum', { values: ['cover', 'contain'] }]
}>

export const ObjectFitEditor = connect(function ObjectFitEditor({
  widget,
  readOnly = false,
}: {
  widget: ObjectFitWidget
  readOnly?: boolean
}) {
  return (
    <AdvancedEnumEditor
      attributeValue={widget.get('objectFit')}
      options={[
        {
          value: 'contain',
          title: 'Contain',
          description:
            'The image is resized to fit within the space, keeping its original proportions, without being cut off.',
          icon: containSvg,
        },
        {
          value: 'cover',
          title: 'Cover',
          description:
            'The image is resized to fill the entire space, keeping its proportions, but may be cropped if necessary.',
          icon: coverSvg,
        },
      ]}
      readOnly={readOnly}
      updateAttributeValue={(objectFit: string) => widget.update({ objectFit })}
    />
  )
})
