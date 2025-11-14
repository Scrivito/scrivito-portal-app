Title: SDK: emptyValue API

Widgets and objects often need sensible default values for their attributes—whether to ensure consistent styling across a site, provide fallback values when attributes aren't set, or maintain backward compatibility during migrations. Managing these defaults with manual null checks and fallback logic in every component quickly becomes cumbersome and error-prone.

The `emptyValue` option provides a declarative way to define default values for attributes. When an attribute is empty or unset, Web Builder automatically returns the specified default value, eliminating the need for defensive coding throughout your components.

This document covers the `emptyValue` API and the `isEmptyValue()` method for working with attribute defaults in Web Builder applications.

# SDK behavior

## Example: Static default value

Provide a fixed default value for an attribute:

```ts
export const TextWidget = provideWidgetClass('TextWidget', {
  attributes: {
    alignment: [
      'enum',
      {
        values: ['start', 'center', 'end'],
        emptyValue: 'start', // Always defaults to 'start'
      },
    ],
  },
})
```

Now `widget.get('alignment')` returns `'start'`, `'center'`, or `'end'` — never `null`.

## Supported attribute types

The `emptyValue` option is available for the following attribute types:

| Attribute Type | Empty When          |
| -------------- | ------------------- |
| `string`       | `''` (empty string) |
| `enum`         | `null`              |
| `float`        | `null`              |
| `integer`      | `null`              |
| `link`         | `null`              |
| `reference`    | `null`              |

## Signature

```ts
interface AttributeOptions<T> {
  emptyValue?: T | ((obj: Obj | Widget) => T)
}
```

The `emptyValue` can be:

- A **static value** of the appropriate type
- A **function** that receives the obj/widget instance and returns a value

## Examples

### Site-wide defaults

Reference a global configuration value:

```ts
export const ButtonWidget = provideWidgetClass('ButtonWidget', {
  attributes: {
    borderRadius: [
      'string',
      {
        // Fallback to site-wide default from root page
        emptyValue: (widget) => Obj.root().get('defaultBorderRadius') || '8px',
      },
    ],
    primaryColor: [
      'string',
      {
        // Use theme color from site configuration
        emptyValue: (widget) =>
          Obj.root().get('themePrimaryColor') || '#0066cc',
      },
    ],
  },
})
```

### Computed defaults

Calculate default values based on widget state:

```ts
export const ImageWidget = provideWidgetClass('ImageWidget', {
  attributes: {
    altText: 'string',
    title: [
      'string',
      {
        // Default title to alt text if not set
        emptyValue: (widget) => widget.get('altText') || 'Image',
      },
    ],
  },
})
```

### Migration compatibility

Maintain backward compatibility when renaming attributes:

```ts
export const ProductWidget = provideWidgetClass('ProductWidget', {
  attributes: {
    // Old attribute (deprecated but still in data)
    oldPrice: 'string',

    // New attribute with fallback to old one
    price: [
      'string',
      {
        emptyValue: (widget) => widget.get('oldPrice') || '',
      },
    ],
  },
})
```

## `isEmptyValue()` method

Check whether an attribute is using its `emptyValue` fallback or has an explicitly set value.

### Signature

```ts
Obj#isEmptyValue(attributeName: string): boolean
Widget#isEmptyValue(attributeName: string): boolean
```

### Returns

- `true` if the attribute is empty and `emptyValue` is being used
- `false` if the attribute has an explicitly set value

### Example

```ts
// Initially, alignment uses emptyValue
widget.get('alignment') // Returns 'start' (from emptyValue)
widget.isEmptyValue('alignment') // Returns true

// After explicitly setting a value
widget.update({ alignment: 'center' })

widget.get('alignment') // Returns 'center'
widget.isEmptyValue('alignment') // Returns false
```

# UI behavior

## Fallback value display

The Web Builder properties panel automatically displays fallback values with special styling when an attribute is using its `emptyValue`:

- **Explicitly set value:** Normal text color, clearly indicating an explicit value
- **Fallback value:** Light gray text, appearing similar to a placeholder

This visual distinction helps editors understand whether they're seeing an explicitly set value or a default.

## Building custom editors

Custom attribute editors can use `isEmptyValue()` to provide placeholder-style UI when showing fallback values:

```ts
function AlignmentEditor({ widget, attribute }) {
  const value = widget.get(attribute)
  const isUsingFallback = widget.isEmptyValue(attribute)

  return (
    <select
      value={value}
      className={isUsingFallback ? 'text-muted' : ''}
      onChange={(e) => widget.update({ [attribute]: e.target.value })}
    >
      <option value="start">Left</option>
      <option value="center">Center</option>
      <option value="end">Right</option>
    </select>
  )
}
```

The `className` conditionally applies muted styling when displaying a fallback value, matching the built-in editor behavior.
