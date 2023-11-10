import { provideWidgetClass } from 'scrivito'

export const ProductParameterWidget = provideWidgetClass(
  'ProductParameterWidget',
  {
    attributes: {
      parameter: 'string', // e.g. "Color"
      values: 'stringlist', // e.g. ["red", "blue"]
    },
    onlyInside: ['Product'],
  },
)

export type ProductParameterWidgetInstance = InstanceType<
  typeof ProductParameterWidget
>

export function isProductParameterWidget(
  input: unknown,
): input is ProductParameterWidgetInstance {
  return input instanceof ProductParameterWidget
}

export interface PlainParameter {
  parameter: string
  values: string[]
}

export function toPlainParameter(
  input: ProductParameterWidgetInstance,
): PlainParameter {
  return {
    parameter: input.get('parameter'),
    values: input.get('values'),
  }
}
