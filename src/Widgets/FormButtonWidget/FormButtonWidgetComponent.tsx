import {
  provideComponent,
  ContentTag,
  WidgetTag,
  InPlaceEditingOff,
} from 'scrivito'
import { FormButtonWidget } from './FormButtonWidgetClass'
import { alignmentClassName } from '../../utils/alignmentClassName'

provideComponent(FormButtonWidget, ({ widget }) => {
  const alignment = widget.get('alignment')

  return (
    <WidgetTag className={alignmentClassName(alignment)}>
      <InPlaceEditingOff>
        <button
          className={`btn btn-primary${
            alignment === 'block' ? ' btn-block' : ''
          }`}
          type="submit"
        >
          <ContentTag tag="span" content={widget} attribute="buttonText" />
        </button>
      </InPlaceEditingOff>
    </WidgetTag>
  )
})
