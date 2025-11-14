import { connect } from 'scrivito'
import { AdvancedEnumEditor } from './AdvancedEnumEditor'
import containSvg from './ObjectFitEditor/object-fit-contain.svg'
import coverSvg from './ObjectFitEditor/object-fit-cover.svg'

export const ObjectFitEditor = connect(function ObjectFitEditor({
  attributeValue,
  readOnly,
  theme,
  updateAttributeValue,
}: {
  attributeValue?: unknown
  readOnly: boolean
  theme: 'dark' | 'light' | null
  updateAttributeValue: (value: string) => void
}) {
  return (
    <AdvancedEnumEditor
      attributeValue={attributeValue}
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
      theme={theme}
      updateAttributeValue={updateAttributeValue}
    />
  )
})
