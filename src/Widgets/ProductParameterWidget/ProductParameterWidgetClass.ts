import { provideWidgetClass } from 'scrivito'

export const ProductParameterWidget = provideWidgetClass(
  'ProductParameterWidget',
  {
    attributes: {
      parameter: 'string', // e.g. "Color"
      values: 'stringlist', // e.g. ["red", "blue"]
    },
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
