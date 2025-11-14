# SDK: Responsive Attributes (first try)

Responsive design means creating websites that look perfect on every screen size—from large desktop monitors to medium tablets and small mobile phones. Editors need a way to fine-tune how content appears across these different devices without requiring developer intervention for every adjustment.

Web Builder's responsive attributes empower editors to set different values for properties like text alignment or font sizes across desktop, tablet, and mobile viewports—ensuring the ideal presentation for each device. The desktop value serves as the default and automatically applies to smaller devices until explicitly overridden.

This guide explains how to create responsive attributes that adapt to different viewport sizes in your Web Builder (formerly known as Scrivito) application.

## **Quick Start**

The simplest way to create responsive attributes is using Web Builder's built-in helper APIs. The examples below use [Bootstrap 5](https://getbootstrap.com/docs/5.3/layout/breakpoints/) for responsive CSS classes and breakpoint mixins. We'll use a simplified `HeadlineWidget` as an example with two responsive attributes: `alignment` and `fontSize`. You'll create three files for your widget:

### **`HeadlineWidgetClass.ts`**

Define your widget class with responsive attributes:

```ts
import { provideWidgetClass, responsiveAttribute } from 'scrivito'

export const HeadlineWidget = provideWidgetClass('HeadlineWidget', {
  attributes: {
    text: 'html',
    ...responsiveAttribute('alignment', [
      'enum',
      {
        values: ['start', 'center', 'end'],
        emptyValue: 'start',
      },
    ]),
    ...responsiveAttribute('fontSize', 'string'),
    ...responsiveAttribute('backgroundColor', 'string'),
  },
})
```

### **`HeadlineWidgetEditingConfig.ts`**

Configure the editing properties:

```ts
import {
  provideEditingConfig,
  responsiveEditingAttribute,
  responsiveProperty,
} from 'scrivito'
import { HeadlineWidget } from './HeadlineWidgetClass'

provideEditingConfig(HeadlineWidget, {
  title: 'Headline',
  attributes: {
    ...responsiveEditingAttribute('alignment', {
      title: 'Alignment',
      values: [
        { value: 'start', title: 'Left' },
        { value: 'center', title: 'Center' },
        { value: 'end', title: 'Right' },
      ],
    }),
    ...responsiveEditingAttribute('fontSize', {
      title: 'Font Size',
    }),
    ...responsiveEditingAttribute('backgroundColor', {
      title: 'Background Color',
      editor: 'colorPicker',
    }),
  },
  properties: [
    ...responsiveProperty('alignment'),
    ...responsiveProperty('fontSize'),
    ...responsiveProperty('backgroundColor'),
  ],
})
```

### **`HeadlineWidgetComponent.tsx`**

Use the responsive attributes in your component:

```ts
import { provideComponent, ContentTag } from 'scrivito'
import { HeadlineWidget } from './HeadlineWidgetClass'

provideComponent(HeadlineWidget, ({ widget }) => {
  const classNames = [
    'headline-widget',
    `text-lg-${widget.get('alignment')}`, // Bootstrap lg (≥992px)
    `text-md-${widget.get('alignmentTablet')}`, // Bootstrap md (≥768px)
    `text-${widget.get('alignmentMobile')}`, // Bootstrap base (mobile-first)
  ]

  classNames.push('has-responsive-font-size')
  classNames.push('has-responsive-background-color')
  const style = {
    fontSize: widget.get('fontSizeMobile'),
    '--font-size-md': widget.get('fontSizeTablet'),
    '--font-size-lg': widget.get('fontSize'),
    backgroundColor: widget.get('backgroundColorMobile'),
    '--background-color-md': widget.get('backgroundColorTablet'),
    '--background-color-lg': widget.get('backgroundColor'),
  } as React.CSSProperties

  return (
    <div className={classNames.join(' ')} style={style}>
      <ContentTag content={widget} attribute="text" />
    </div>
  )
})
```

Include the following SCSS in your stylesheet:

```css
.has-responsive-font-size {
  @include media-breakpoint-up(md) {
    font-size: var(--font-size-md) !important;
  }

  @include media-breakpoint-up(lg) {
    font-size: var(--font-size-lg) !important;
  }
}

.has-responsive-background-color {
  @include media-breakpoint-up(md) {
    background-color: var(--background-color-md) !important;
  }

  @include media-breakpoint-up(lg) {
    background-color: var(--background-color-lg) !important;
  }
}
```

That's it\! Using Web Builder's built-in responsive attribute helpers, you now have responsive attributes that work across desktop, tablet, and mobile viewports with proper fallback values.

## **High-Level APIs**

### **`responsiveAttribute()`**

Creates a set of responsive attribute definitions for a widget or page class. This function automatically generates three variants of an attribute: the base attribute (desktop), tablet variant, and mobile variant, with proper fallback behavior.

**Signature:**

```ts
function responsiveAttribute(
  name: string,
  definition: AttributeDefinition,
): AttributeDefinitions
```

**Parameters:**

- `name` \- The base attribute name (e.g., 'alignment')
- `definition` \- The Web Builder attribute definition (type and options)

**Returns:** An object containing three attribute definitions:

- `[name]` \- Desktop version (e.g., 'alignment')
- `[name]Tablet` \- Tablet version (e.g., 'alignmentTablet') with fallback to desktop
- `[name]Mobile` \- Mobile version (e.g., 'alignmentMobile') with fallback to desktop

**Example:**

```ts
export const HeadlineWidget = provideWidgetClass('HeadlineWidget', {
  attributes: {
    text: 'html',
    ...responsiveAttribute('alignment', [
      'enum',
      {
        values: ['start', 'center', 'end'],
        emptyValue: 'start',
      },
    ]),
    ...responsiveAttribute('fontSize', 'string'),
    ...responsiveAttribute('backgroundColor', 'string'),
  },
})
```

This expands to:

```ts
export const HeadlineWidget = provideWidgetClass('HeadlineWidget', {
  attributes: {
    text: 'html',

    alignment: [
      'enum',
      { values: ['start', 'center', 'end'], emptyValue: 'start' },
    ],
    alignmentTablet: [
      'enum',
      {
        values: ['start', 'center', 'end'],
        emptyValue: (widget) => widget.get('alignment'),
      },
    ],
    alignmentMobile: [
      'enum',
      {
        values: ['start', 'center', 'end'],
        emptyValue: (widget) => widget.get('alignment'),
      },
    ],

    fontSize: 'string',
    fontSizeTablet: [
      'string',
      { emptyValue: (widget) => widget.get('fontSize') },
    ],
    fontSizeMobile: [
      'string',
      { emptyValue: (widget) => widget.get('fontSize') },
    ],

    backgroundColor: 'string',
    backgroundColorTablet: [
      'string',
      { emptyValue: (widget) => widget.get('backgroundColor') },
    ],
    backgroundColorMobile: [
      'string',
      { emptyValue: (widget) => widget.get('backgroundColor') },
    ],
  },
})
```

### **`responsiveEditingAttribute()`**

Creates editing configuration for responsive attributes, including viewport visibility rules. This ensures that only the relevant attribute variant is shown in the properties panel based on the current viewport width.

**Signature:**

```ts
function responsiveEditingAttribute(
  name: string,
  config: AttributeEditingConfig,
): AttributeEditingConfigs
```

**Parameters:**

- `name` \- The base attribute name (must match the name used in `responsiveAttribute()`)
- `config` \- The editing configuration (title, values, editor, etc.)

**Returns:** An object containing three editing configurations with appropriate `visibleAt` constraints:

- `[name]` \- Visible at desktop viewport (≥992px)
- `[name]Tablet` \- Visible at tablet viewport (768px \- 991px)
- `[name]Mobile` \- Visible at mobile viewport (\<768px)

**Example:**

```ts
provideEditingConfig(HeadlineWidget, {
  title: 'Headline',
  attributes: {
    ...responsiveEditingAttribute('alignment', {
      title: 'Alignment',
      values: [
        { value: 'start', title: 'Left' },
        { value: 'center', title: 'Center' },
        { value: 'end', title: 'Right' },
      ],
    }),
    ...responsiveEditingAttribute('fontSize', {
      title: 'Font Size',
      editor: 'dimensionPicker',
      options: { units: ['px', 'rem'] },
    }),
  },

  // ...
})
```

This expands to:

```ts
provideEditingConfig(HeadlineWidget, {
  title: 'Headline',
  attributes: {
    alignment: {
      title: 'Alignment',
      values: [
        { value: 'start', title: 'Left' },
        { value: 'center', title: 'Center' },
        { value: 'end', title: 'Right' },
      ],
      visibleAt: { minWidth: 992 },
    },
    alignmentTablet: {
      title: 'Alignment',
      values: [
        { value: 'start', title: 'Left' },
        { value: 'center', title: 'Center' },
        { value: 'end', title: 'Right' },
      ],
      visibleAt: { minWidth: 768, maxWidth: 991 },
    },
    alignmentMobile: {
      title: 'Alignment',
      values: [
        { value: 'start', title: 'Left' },
        { value: 'center', title: 'Center' },
        { value: 'end', title: 'Right' },
      ],
      visibleAt: { minWidth: 0, maxWidth: 767 },
    },
    fontSize: {
      title: 'Font Size',
      editor: 'dimensionPicker',
      options: { units: ['px', 'rem'] },
      visibleAt: { minWidth: 992 },
    },
    fontSizeTablet: {
      title: 'Font Size',
      editor: 'dimensionPicker',
      options: { units: ['px', 'rem'] },
      visibleAt: { minWidth: 768, maxWidth: 991 },
    },
    fontSizeMobile: {
      title: 'Font Size',
      editor: 'dimensionPicker',
      options: { units: ['px', 'rem'] },
      visibleAt: { minWidth: 0, maxWidth: 767 },
    },
  },

  // ...
})
```

### **`responsiveProperty()`**

Returns an array of property definitions for all responsive variants of an attribute. Use this in the `properties` array of your editing config to include all three breakpoint variants.

**Signature:**

```ts
function responsiveProperty(property: GroupProperty): GroupProperty[]
```

Where `GroupProperty` is defined as:

```ts
type GroupPropertyWithConfig = readonly [string, { enabled: boolean }]
type GroupProperty = GroupPropertyWithConfig | string
```

**Parameters:**

- `property` \- The base attribute name (string) or attribute configuration (tuple with name and config object)

**Returns:** An array of three `GroupProperty` items for desktop, tablet, and mobile variants. If a simple string is provided, returns three strings. If a tuple with configuration is provided, returns three tuples with the same configuration.

**Example with simple strings:**

```ts
provideEditingConfig(HeadlineWidget, {
  title: 'Headline',
  // ...
  properties: [
    ...responsiveProperty('alignment'),
    ...responsiveProperty('fontSize'),
    ...responsiveProperty('backgroundColor'),
  ],
})
```

This expands to:

```ts
provideEditingConfig(HeadlineWidget, {
  title: 'Headline',
  // ...
  properties: [
    'alignment',
    'alignmentTablet',
    'alignmentMobile',

    'fontSize',
    'fontSizeTablet',
    'fontSizeMobile',

    'backgroundColor',
    'backgroundColorTablet',
    'backgroundColorMobile',
  ],
})
```

**Example with configuration:**

```ts
provideEditingConfig(HeadlineWidget, {
  title: 'Headline',
  // ...
  properties: [...responsiveProperty(['alignment', { enabled: true }])],
})
```

This expands to:

```ts
provideEditingConfig(HeadlineWidget, {
  title: 'Headline',
  // ...
  properties: [
    ['alignment', { enabled: true }],
    ['alignmentTablet', { enabled: true }],
    ['alignmentMobile', { enabled: true }],
  ],
})
```

---

## **Low-Level APIs**

The high-level APIs are built on top of these low-level primitives. You can use these directly for more control or custom breakpoint configurations.

### **`emptyValue`**

The `emptyValue` option provides a default value when an attribute is empty or unset. This is useful for several scenarios: implementing responsive attribute fallback systems, providing site-wide default values, ensuring attributes always have valid values, and maintaining migration compatibility when upgrading attribute names.

**Available For:**

- `string` \- Empty when `''`
- `enum` \- Empty when `null`
- `float` \- Empty when `null`
- `integer` \- Empty when `null`
- `link` \- Empty when `null`
- `reference` \- Empty when `null`

**Signature:**

```ts
interface AttributeOptions<T> {
  emptyValue?: T | ((obj: Obj | Widget) => T)
}
```

**Static Value Example:**

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

**Site-wide defaults:**

```ts
export const TextWidget = provideWidgetClass('TextWidget', {
  attributes: {
    borderRadius: [
      'string',
      {
        // Fallback to site-wide default
        emptyValue: (widget) => Obj.root().get('defaultBorderRadius') || '0px',
      },
    ],
  },
})
```

**Responsive Fallback Example:**

This is how the high-level `responsiveAttribute()` API works internally:

```ts
export const HeadlineWidget = provideWidgetClass('HeadlineWidget', {
  attributes: {
    alignment: [
      'enum',
      {
        values: ['start', 'center', 'end'],
        emptyValue: 'start',
      },
    ],
    alignmentTablet: [
      'enum',
      {
        values: ['start', 'center', 'end'],
        emptyValue: (widget) => widget.get('alignment'), // Falls back to desktop
      },
    ],
    alignmentMobile: [
      'enum',
      {
        values: ['start', 'center', 'end'],
        emptyValue: (widget) => widget.get('alignment'), // Falls back to desktop
      },
    ],
  },
})
```

**Important:** The `emptyValue` option is configured in `provideWidgetClass`/`provideObjClass`, NOT in `provideEditingConfig`. This ensures a single source of truth and prevents drift between component logic and editing configuration.

**UI Behavior:**

The Web Builder properties panel automatically displays fallback values in a muted style (similar to placeholders) when an attribute is using its `emptyValue`:

- **Set value:** Normal text color, clearly selected
- **Fallback value:** Light gray text, appears as placeholder

This matches the behavior in Dartagnan where mobile/tablet properties show the desktop value as a grayed-out default until explicitly overridden.

### **`hasEmptyValue()`**

Check whether an attribute is using its `emptyValue` fallback or has an explicitly set value.

**Signature:**

```ts
Obj#hasEmptyValue(attributeName: string): boolean
Widget#hasEmptyValue(attributeName: string): boolean
```

**Returns:**

- `true` if the attribute is empty and `emptyValue` is being used
- `false` if the attribute has an explicitly set value

**Example:**

```ts
widget.get('alignment') // Returns 'left' (from emptyValue)
widget.hasEmptyValue('alignment') // Returns true

widget.update({ alignment: 'center' })

widget.get('alignment') // Returns 'center'
widget.hasEmptyValue('alignment') // Returns false
```

**Use in Custom Editors:**

Custom attribute editors can use `hasEmptyValue()` to display placeholder-style UI when showing fallback values:

```ts
function AlignmentEditor({ widget, attribute }) {
  const value = widget.get(attribute)
  const isUsingFallback = widget.hasEmptyValue(attribute)

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

The `value` prop on the `<select>` element ensures that the matching `<option>` is automatically shown as selected. For example:

- If `widget.get('alignmentTablet')` returns `'center'` (from desktop fallback), the "Center" option will be active/selected
- If the user hasn't set a tablet-specific value, `isUsingFallback` will be `true`, and the select will display with muted styling while still showing the desktop value as selected
- When the user changes the selection, `widget.update()` sets an explicit value, making `isUsingFallback` false on subsequent renders

### **`visibleAt`**

The `visibleAt` option controls when an attribute appears in the properties panel based on the current viewport width.

**Signature:**

```ts
interface VisibleAt {
  minWidth: number // Minimum viewport width (inclusive)
  maxWidth?: number // Maximum viewport width (inclusive, optional)
}

interface AttributeEditingConfig {
  visibleAt?: VisibleAt // Defaults to { minWidth: 0 } if not specified
}
```

**Example:**

```ts
provideEditingConfig(HeadlineWidget, {
  title: 'Headline',
  attributes: {
    alignment: {
      title: 'Alignment',
      values: [
        { value: 'start', title: 'Left' },
        { value: 'center', title: 'Center' },
        { value: 'end', title: 'Right' },
      ],
      visibleAt: { minWidth: 992 }, // Desktop only (≥992px)
    },
    alignmentTablet: {
      title: 'Alignment',
      values: [
        { value: 'start', title: 'Left' },
        { value: 'center', title: 'Center' },
        { value: 'end', title: 'Right' },
      ],
      visibleAt: { minWidth: 768, maxWidth: 991 }, // Tablet (768px - 991px)
    },
    alignmentMobile: {
      title: 'Alignment',
      values: [
        { value: 'start', title: 'Left' },
        { value: 'center', title: 'Center' },
        { value: 'end', title: 'Right' },
      ],
      visibleAt: { minWidth: 0, maxWidth: 767 }, // Mobile (<768px)
    },
  },
  properties: ['alignment', 'alignmentTablet', 'alignmentMobile'],
})
```

**Behavior:**

When the editor is rendered at 900px width:

- ❌ `alignment` is hidden (requires ≥992px)
- ✅ `alignmentTablet` is shown (768px \- 991px)
- ❌ `alignmentMobile` is hidden (requires \<768px)

**Breakpoint Conventions:**

Based on [Bootstrap 5 breakpoints](https://getbootstrap.com/docs/5.3/layout/breakpoints/):

- **Desktop:** `{ minWidth: 992 }` (lg and above)
- **Tablet:** `{ minWidth: 768, maxWidth: 991 }` (md range)
- **Mobile:** `{ minWidth: 0, maxWidth: 767 }` (below md)

**Custom Breakpoints:**

You can use arbitrary breakpoints if needed:

```ts
provideEditingConfig(CustomWidget, {
  attributes: {
    specialLayout: {
      title: 'Special Layout',
      visibleAt: { minWidth: 1400 }, // Extra large screens only
    },
  },
  properties: ['specialLayout'],
})
```

### **`hasEditorVisibleAttribute`**

Check whether an attribute's `visibleAt` configuration matches the current application width in editing mode.

**Signature:**

```ts
Obj#hasEditorVisibleAttribute(attributeName: string): boolean
Widget#hasEditorVisibleAttribute(attributeName: string): boolean
```

**Returns:**

Returns a boolean indicating whether the attribute's `visibleAt` configuration matches the current application width.

- In editing mode: `true` if the current application width matches the attribute's `visibleAt` constraint, `false` otherwise
- In non-editing mode: Always `false`

**Example:**

```ts
// In an editing context at 900px viewport width
provideEditingConfig(HeadlineWidget, {
  attributes: {
    alignment: {
      title: 'Alignment',
      visibleAt: { minWidth: 992 }, // Desktop only
    },
    alignmentTablet: {
      title: 'Alignment',
      visibleAt: { minWidth: 768, maxWidth: 991 }, // Tablet only
    },
  },
})

// At 900px viewport width:
widget.hasEditorVisibleAttribute('alignment') // Returns false (requires ≥992px)
widget.hasEditorVisibleAttribute('alignmentTablet') // Returns true (768-991px matches)

// In a published site (non-editing context):
widget.hasEditorVisibleAttribute('alignment') // Returns false (not in editor)
widget.hasEditorVisibleAttribute('alignmentTablet') // Returns false (not in editor)
```

**Use Cases:**

This method is primarily useful when building custom components rendered in property tabs via `propertiesGroups`. It allows your component to determine which responsive attribute variant to display or edit based on the current application width.

```ts
// Custom extension component for a properties group
function CustomAlignmentEditor({ widget }) {
  // Edit tablet variant when in tablet viewport width
  if (widget.hasEditorVisibleAttribute('alignmentTablet')) {
    return (
      <input
        value={widget.get('alignmentTablet')}
        onChange={(e) => widget.update({ alignmentTablet: e.target.value })}
      />
    )
  }

  // Edit desktop variant otherwise
  return (
    <input
      value={widget.get('alignment')}
      onChange={(e) => widget.update({ alignment: e.target.value })}
    />
  )
}

// Register in editing config
provideEditingConfig(HeadlineWidget, {
  propertiesGroups: [
    {
      title: 'Custom Alignment',
      key: 'custom-alignment',
      component: ({ widget }) => <CustomAlignmentEditor widget={widget} />,
    },
  ],
})
```

---

## **Custom Breakpoints and Additional Variants**

The high-level APIs (`responsiveAttribute()`, `responsiveEditingAttribute()`, `responsiveProperty()`) use Bootstrap 5 breakpoints by default (mobile: \<768px, tablet: 768-991px, desktop: ≥992px). If your application uses a different CSS framework or custom breakpoints, you can create your own helper functions tailored to your breakpoint system.

### **Using Custom Breakpoint Values**

If you're using a different CSS framework like Tailwind CSS or Material Design, or have application-specific breakpoint requirements, you only need to create one custom helper function: `customResponsiveEditingAttribute`. You can continue using Web Builder's built-in `responsiveAttribute()` and `responsiveProperty()` helpers, since only the viewport visibility rules need to change.

Create a single helper function that returns editing configurations with your framework's breakpoint values:

**File: `src/utils/responsiveHelpers.ts`**

```ts
// Helper to create responsive editing configurations with custom breakpoints
export function customResponsiveEditingAttribute(
  name: string,
  config: AttributeEditingConfig,
) {
  return {
    [name]: {
      ...config,
      visibleAt: { minWidth: 1024 }, // Adjust to your framework
    },
    [`${name}Tablet`]: {
      ...config,
      visibleAt: { minWidth: 768, maxWidth: 1023 }, // Adjust to your framework
    },
    [`${name}Mobile`]: {
      ...config,
      visibleAt: { minWidth: 0, maxWidth: 767 }, // Adjust to your framework
    },
  } as const
}
```

**Framework-Specific Breakpoint Values**

Adjust the `minWidth` and `maxWidth` values in `customResponsiveEditingAttribute` to match your CSS framework:

| Framework                 | Desktop              | Tablet                              | Mobile                           |
| :------------------------ | :------------------- | :---------------------------------- | :------------------------------- |
| **Bootstrap 5** (default) | `{ minWidth: 992 }`  | `{ minWidth: 768, maxWidth: 991 }`  | `{ minWidth: 0, maxWidth: 767 }` |
| **Tailwind CSS**          | `{ minWidth: 1024 }` | `{ minWidth: 768, maxWidth: 1023 }` | `{ minWidth: 0, maxWidth: 767 }` |
| **Material Design**       | `{ minWidth: 960 }`  | `{ minWidth: 600, maxWidth: 959 }`  | `{ minWidth: 0, maxWidth: 599 }` |

### **Adding Additional Variants**

If you need more than three breakpoints (e.g., for extra-large displays or wearable devices), simply add more entries to the returned objects in your helper functions.

**Example: Five-Breakpoint System**

Here's an example with five breakpoints (watch, mobile, tablet, desktop, and xl):

```ts
// Five-breakpoint system with watch and xl variants
export function customResponsiveAttribute(
  name: string,
  definition: AttributeDefinition,
) {
  const [type, options = {}] = Array.isArray(definition)
    ? definition
    : [definition, {}]

  return {
    [name]: definition, // Desktop (base)
    [`${name}Xl`]: [type, { ...options, emptyValue: (obj) => obj.get(name) }],
    [`${name}Tablet`]: [
      type,
      { ...options, emptyValue: (obj) => obj.get(name) },
    ],
    [`${name}Mobile`]: [
      type,
      { ...options, emptyValue: (obj) => obj.get(name) },
    ],
    [`${name}Watch`]: [
      type,
      { ...options, emptyValue: (obj) => obj.get(name) },
    ],
  } as const
}

export function customResponsiveEditingAttribute(name: string, config: any) {
  return {
    [name]: { ...config, visibleAt: { minWidth: 1024 } },
    [`${name}Xl`]: { ...config, visibleAt: { minWidth: 1400 } },
    [`${name}Tablet`]: {
      ...config,
      visibleAt: { minWidth: 768, maxWidth: 1023 },
    },
    [`${name}Mobile`]: {
      ...config,
      visibleAt: { minWidth: 640, maxWidth: 767 },
    },
    [`${name}Watch`]: { ...config, visibleAt: { minWidth: 0, maxWidth: 639 } },
  } as const
}

export function customResponsiveProperty(
  property: string | readonly [string, { enabled: boolean }],
) {
  const [name, config] = Array.isArray(property)
    ? property
    : [property, undefined]

  return config
    ? [
        [name, config],
        [`${name}Xl`, config],
        [`${name}Tablet`, config],
        [`${name}Mobile`, config],
        [`${name}Watch`, config],
      ]
    : [name, `${name}Xl`, `${name}Tablet`, `${name}Mobile`, `${name}Watch`]
}
```

With this five-breakpoint system, your widgets automatically get five responsive variants:

```ts
export const HeadlineWidget = provideWidgetClass('HeadlineWidget', {
  attributes: {
    ...customResponsiveAttribute('fontSize', 'string'),
    // Creates: fontSize, fontSizeXl, fontSizeTablet, fontSizeMobile, fontSizeWatch
  },
})
```

# Changes

2025-10-27:

- Added `hasEditorVisibleAttribute`.
