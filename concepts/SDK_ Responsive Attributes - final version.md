Title: SDK: Responsive Attributes (final version)

Responsive design means creating websites that adapt seamlessly across every screen size—from large desktop monitors to medium tablets to small mobile phones. A headline that looks perfect with large, center-aligned text on desktop might need smaller, left-aligned text on mobile. Editors need a straightforward way to fine-tune these presentation details for each device without requiring developer intervention.

The solution lies in responsive attribute types. Web Builder's responsive attributes empower editors to set different values for properties like text alignment, font sizes, or spacing across desktop, tablet, and mobile viewports—ensuring optimal presentation on every device.

This document covers four new responsive attribute types and related APIs that enable this functionality in Web Builder applications: `responsivestring`, `responsiveenum`, `responsiveinteger`, and `responsivefloat`.

# SDK behavior

## Configuration

Define the viewport widths that determine when your application transitions between mobile, tablet, and desktop experiences:

```ts
Scrivito.configure({
  //...
  responsiveAttributes?: {
    breakpoints: {
      mobileMaxWidth: number,
      tabletMaxWidth: number,
    }
  }
})
```

This configuration determines:

- **Mobile:** viewport width ≤ `mobileMaxWidth`
- **Tablet:** `mobileMaxWidth` < viewport width ≤ `tabletMaxWidth`
- **Desktop:** viewport width > `tabletMaxWidth`

### Default configuration

By default, `responsiveAttributes` is configured to align with [Bootstrap 5](https://getbootstrap.com/docs/5.3/layout/breakpoints/):

```ts
{
  breakpoints: {
    mobileMaxWidth: 767,
    tabletMaxWidth: 991,
  }
}
```

This results in the following breakpoints:

- **Mobile:** ≤ 767px (below Bootstrap's `md` breakpoint)
- **Tablet:** 768px - 991px (Bootstrap's `md` breakpoint range)
- **Desktop:** ≥ 992px (Bootstrap's `lg` and above)

### Custom breakpoints example

You can customize the breakpoints to match your CSS framework. For example, with [Tailwind CSS](https://tailwindcss.com/docs/responsive-design), configure the breakpoints to align with Tailwind's `md` (768px) and `lg` (1024px) breakpoints:

```ts
Scrivito.configure({
  //...
  responsiveAttributes: {
    breakpoints: {
      mobileMaxWidth: 767,
      tabletMaxWidth: 1023,
    },
  },
})
```

This maps the three viewports to Tailwind's breakpoint system:

- **Mobile:** viewport width ≤ 767px (below Tailwind's `md:` breakpoint)
- **Tablet:** 768px - 1023px (Tailwind's `md:` to `lg:` range)
- **Desktop:** viewport width ≥ 1024px (Tailwind's `lg:` and above)

Similarly, for [Material Design](https://m3.material.io/foundations/layout/applying-layout/window-size-classes) breakpoints, configure to align with Material's compact, medium, and expanded window size classes:

```ts
Scrivito.configure({
  //...
  responsiveAttributes: {
    breakpoints: {
      mobileMaxWidth: 599,
      tabletMaxWidth: 839,
    },
  },
})
```

This maps the three viewports to Material Design's breakpoint system:

- **Mobile:** viewport width ≤ 599px (Material's compact window size)
- **Tablet:** 600px - 839px (Material's medium window size)
- **Desktop:** viewport width ≥ 840px (Material's expanded window size)

## Responsive attribute types

Four new attribute types are introduced:

- `responsivestring` (`string`)
- `responsiveenum` (`enum`)
- `responsiveinteger` (`integer`)
- `responsivefloat` (`float`)

Each type stores the same kind of data as its non-responsive counterpart but provides values per breakpoint (`desktop`, `tablet` and `mobile`).

### Example: Using responsive attributes in components

This example demonstrates how to define a widget class with responsive attributes and use them in a component:

```tsx
const HeadlineWidget = provideWidgetClass('HeadlineWidget', {
  attributes: {
    text: 'html',
    alignment: ['responsiveenum', { values: ['start', 'center', 'end'] }],
    fontSize: 'responsivestring',
  },
})

provideComponent(HeadlineWidget, ({ widget }) => {
  const classNames = ['headline-widget']

  // Option 1: Build responsive class names (Bootstrap example)
  const alignment = widget.get('alignment').normalized
  classNames.push(
    `text-lg-${alignment.desktop}`,
    `text-md-${alignment.tablet}`,
    `text-${alignment.mobile}`,
  )

  // Option 2: Use CSS custom properties for responsive values
  const fontSize = widget.get('fontSize').normalized
  const style = {
    fontSize: fontSize.mobile,
    '--font-size-md': fontSize.tablet,
    '--font-size-lg': fontSize.desktop,
  }
  classNames.push('has-responsive-font-size')

  return (
    <div className={classNames.join(' ')} style={style}>
      <ContentTag content={widget} attribute="text" />
    </div>
  )
})
```

Include the following SCSS in your stylesheet:

```scss
.has-responsive-font-size {
  @include media-breakpoint-up(md) {
    font-size: var(--font-size-md) !important;
  }

  @include media-breakpoint-up(lg) {
    font-size: var(--font-size-lg) !important;
  }
}
```

```ts
provideEditingConfig(HeadlineWidget, {
  title: 'Headline',
  attributes: {
    alignment: {
      title: 'Alignment',
      description: 'Text alignment. Default: Left',
      values: [
        { value: 'start', title: 'Left' },
        { value: 'center', title: 'Center' },
        { value: 'end', title: 'Right' },
      ],
    },
    fontSize: {
      title: 'Font size',
      description:
        'CSS font-size value (e.g., 24px, 1.5rem). Default: Inherited',
    },
  },
  properties: ['alignment', 'fontSize'],
  initialContent: {
    text: 'Headline',
    alignment: { desktop: 'start', tablet: null, mobile: null },
  },
})
```

### Type definitions per attribute type

```ts
interface ResponsiveValue<T> {
  desktop: T
  tablet: T
  mobile: T
  readonly normalized: {
    desktop: T
    tablet: T
    mobile: T
  }
}

// For responsivestring
type ResponsiveStringValue = ResponsiveValue<string>

// For responsiveenum
type ResponsiveEnumValue = ResponsiveValue<string | null>

// For responsiveinteger
type ResponsiveIntegerValue = ResponsiveValue<number | null>

// For responsivefloat
type ResponsiveFloatValue = ResponsiveValue<number | null>
```

**ResponsiveValue structure:**

- `desktop`, `tablet`, `mobile`: The raw values as set by the editor
- `normalized`: Computed values with fallbacks applied
  - Desktop never falls back (always uses its own value)
  - Tablet falls back to `desktop` when empty (`''` or `null`)
  - Mobile falls back **directly** to `desktop` when empty (`''` or `null`), not to tablet

### Value normalization rules

The normalization algorithm follows a desktop fallback:

```ts
function normalize<T>(raw: { desktop: T; tablet: T; mobile: T }) {
  const isEmpty = (value: unknown) => value === null || value === ''

  return {
    // Raw values stay as-is
    ...raw,

    // Normalized values apply fallback
    normalized: {
      desktop: raw.desktop,
      tablet: isEmpty(raw.tablet) ? raw.desktop : raw.tablet,
      mobile: isEmpty(raw.mobile) ? raw.desktop : raw.mobile,
    },
  }
}
```

**Examples:**

```ts
// Case 1: Desktop only
{ desktop: 'center', tablet: null, mobile: null }
→ normalized: { desktop: 'center', tablet: 'center', mobile: 'center' }

// Case 2: Desktop and mobile
{ desktop: 'center', tablet: null, mobile: 'start' }
→ normalized: { desktop: 'center', tablet: 'center', mobile: 'start' }

// Case 3: Desktop and tablet
{ desktop: 'center', tablet: 'end', mobile: null }
→ normalized: { desktop: 'center', tablet: 'end', mobile: 'center' }

// Case 4: All breakpoints
{ desktop: 'center', tablet: 'end', mobile: 'start' }
→ normalized: { desktop: 'center', tablet: 'end', mobile: 'start' }

// Case 5: Nothing set
{ desktop: null, tablet: null, mobile: null }
→ normalized: { desktop: null, tablet: null, mobile: null }

// Case 6: Empty strings trigger fallback (responsivestring)
{ desktop: '24px', tablet: '', mobile: '' }
→ normalized: { desktop: '24px', tablet: '24px', mobile: '24px' }
```

### Writing values

Set values for all breakpoints:

```ts
widget.update({
  alignment: {
    desktop: 'center',
    tablet: 'end',
    mobile: 'start',
  },
})
```

The `normalized` property is read-only. Attempting to update it throws an error:

```ts
// ❌ ERROR: Cannot update normalized
widget.update({
  alignment: {
    normalized: { desktop: 'center', tablet: 'end', mobile: 'start' },
  },
})
```

### Setting initial content

When configuring `initialContent` in `provideEditingConfig`, responsive attributes follow the same structure as when updating values. Provide an object with `desktop`, `tablet`, and `mobile` properties:

```ts
provideEditingConfig(HeadlineWidget, {
  // ...
  initialContent: {
    text: 'Headline',
    alignment: { desktop: 'start', tablet: null, mobile: null },
    fontSize: { desktop: '24px', tablet: '20px', mobile: '16px' },
  },
})
```

**Best practice:** In most cases, set only the `desktop` value and leave `tablet` and `mobile` as `null`. This provides a sensible default while allowing editors to customize specific breakpoints as needed.

## Scrivito.ContentTag rendering

`ContentTag` always uses the `desktop` value of responsive attributes when rendering content. The ContentTag displays the desktop breakpoint value regardless of the current viewport width.

**Example**

```tsx
widget.get('fontSize')
// { desktop: '24px', tablet: '20px', mobile: '16px', normalized: {...} }

<ContentTag content={widget} attribute="fontSize" />
```

The ContentTag renders `'24px'` (desktop value) on all screen sizes, regardless of whether the viewport is mobile, tablet, or desktop.

# UI behavior

## Viewport-aware property editing

The SDK automatically shows the appropriate breakpoint value in the properties panel based on the current viewport width of the application. When an editor resizes the application or changes the viewport width, the properties panel updates to display the corresponding breakpoint variant:

- **At viewport width 1200px (desktop):** Editor shows/edits the `desktop` value
- **At viewport width 900px (tablet):** Editor shows/edits the `tablet` value
- **At viewport width 600px (mobile):** Editor shows/edits the `mobile` value

Editors don't need special configuration for responsive attributes—they use the same editing config as their non-responsive counterparts. The SDK handles viewport detection and attribute switching automatically.

## Fallback value display

The properties panel provides visual feedback when a breakpoint is using a fallback value versus having an explicitly set value:

- **Explicitly set value:** Displayed in normal text color with clear selection state
- **Fallback value (using desktop):** Displayed in muted gray text, similar to a placeholder

This visual distinction helps editors understand which breakpoints have been customized and which are inheriting from the desktop value. For example:

```ts
// Desktop has 'center', tablet is set to 'start', mobile is not set
alignment: { desktop: 'center', tablet: 'start', mobile: null }
```

When viewing this in the properties panel:

- At desktop width: Shows "Center" in normal text (explicitly set)
- At tablet width: Shows "Left" in normal text (explicitly set)
- At mobile width: Shows "Center" in muted gray (inherited from desktop)

Once an editor explicitly sets a value for tablet or mobile, that breakpoint displays in normal text color, indicating it's no longer using the fallback.

## In-place editing with ContentTag

When editors use in-place editing with `ContentTag`, they only see and modify the `desktop` value. To edit tablet or mobile values, editors must use the properties panel instead.

Note: `ContentTag` only offers in-place editing for `responsivestring` (just as it does for `string` and `html`). For `responsiveenum`, `responsiveinteger`, and `responsivefloat`, values can only be edited via the properties panel, not in-place.

**Example**

```tsx
widget.get('fontSize')
// { desktop: '24px', tablet: '20px', mobile: '16px', normalized: {...} }

<ContentTag content={widget} attribute="fontSize" />
```

In edit mode, the ContentTag displays and allows in-place editing of only the desktop value (`'24px'`). To edit the tablet or mobile values (`'20px'`, `'16px'`), editors must use the properties panel.

# Migration and compatibility

You can convert existing standard attributes to their responsive counterparts (and back) without data loss. The SDK automatically handles the conversion between formats, ensuring your content remains accessible during and after the transition.

## Migrating from standard attributes

When changing an existing `string` attribute to `responsivestring`:

```ts
// Before
provideWidgetClass('TextWidget', {
  attributes: {
    fontSize: 'string',
  },
})

// After
provideWidgetClass('TextWidget', {
  attributes: {
    fontSize: 'responsivestring',
  },
})
```

**Automatic migration behavior:**

- Existing `string` values are automatically converted to the `desktop` breakpoint
- `tablet` and `mobile` are left empty (will fall back to desktop)
- Component code reading `widget.get('fontSize')` will now receive an object instead of a string

## Migrating back to standard attributes

If you switch from `responsivestring` back to `string`:

- Only the `desktop` value is retained
- `tablet` and `mobile` values are no longer accessible

```ts
// Before: responsivestring
widget.get('fontSize')
// { desktop: '24px', tablet: '20px', mobile: '16px', normalized: {...} }

// After: changed to string
widget.get('fontSize')
// '24px' (desktop value only)
```

# Building custom editors with `Scrivito.uiContext()`

When building custom attribute editors for responsive attributes, your editor must handle responsive values and adapt to the current viewport. Use `Scrivito.uiContext()` to detect which breakpoint is being edited based on the viewport width.

## API: uiContext() – accessing the breakpoint

Provides styling and breakpoint information about the environment in which a custom component is rendered.

```ts
function uiContext(): UiContext | null

interface UiContext {
  theme: 'dark' | 'light'
  breakpoint: 'desktop' | 'tablet' | 'mobile'
}
```

Returns `null` if the user interface is not present or is being loaded.

The `breakpoint` property is a new addition to the existing `UiContext` object. It indicates which responsive breakpoint is currently being edited, based on the viewport width and the configured breakpoint thresholds:

- `'mobile'` if viewport width ≤ `mobileMaxWidth` (default: 767px)
- `'tablet'` if `mobileMaxWidth` < viewport width ≤ `tabletMaxWidth` (default: 991px)
- `'desktop'` if viewport width > `tabletMaxWidth`

**Example**

```ts
console.log(Scrivito.uiContext())
//=> { theme: 'light', breakpoint: 'desktop' }
```

## Example: Custom responsive editor

The following example demonstrates a custom editor that reads the responsive value, displays the appropriate breakpoint value (with visual feedback for fallbacks), and updates only the current breakpoint while preserving others:

```ts
function AlignmentEditor({ widget, attribute }) {
  // Separate normalized (read-only) from raw values (writable)
  const { normalized, ...rawValues } = widget.get(attribute)
  const uiContext = Scrivito.uiContext()

  if (!uiContext) return null

  const { breakpoint } = uiContext
  const value = rawValues[breakpoint]
  const normalizedValue = normalized[breakpoint]
  const isUsingFallback = value === null || value === ''

  return (
    <select
      value={normalizedValue}
      className={isUsingFallback ? 'text-muted' : ''}
      onChange={(e) => {
        widget.update({
          [attribute]: {
            ...rawValues,  // Preserve all breakpoint values
            [breakpoint]: e.target.value,
          },
        })
      }}
    >
      <option value="start">Start</option>
      <option value="center">Center</option>
      <option value="end">End</option>
    </select>
  )
}
```

**Important:** When updating a responsive attribute, always spread the raw values (excluding `normalized`) to preserve values for all breakpoints. Without this, you will accidentally clear the other breakpoint values. To clear a specific breakpoint value and revert to the desktop fallback, set it to `null` (for enum/integer/float) or `''` (for string).

# Working with emptyValue for responsive attributes

**Note:** The `emptyValue` feature is currently conceptual and not yet implemented for responsive attributes. This section describes the proposed design for how responsive attributes would work with `emptyValue` when implemented.

Responsive attributes would support the `emptyValue` option by specifying it as a single value (not an object)—it would apply only to the desktop breakpoint and then flow through to tablet and mobile via normalization:

```ts
export const HeadlineWidget = provideWidgetClass('HeadlineWidget', {
  attributes: {
    alignment: [
      'responsiveenum',
      {
        values: ['start', 'center', 'end'],
        emptyValue: 'start', // Would be applied to desktop only
      },
    ],
    fontSize: [
      'responsivestring',
      {
        emptyValue: '24px', // Would be applied to desktop only
      },
    ],
  },
})
```

The `emptyValue` would work the same way as for non-responsive attributes, including support for callback functions. See the emptyValue API documentation for details.

## Using isEmptyValue() with responsive attributes

When implemented, `isEmptyValue()` would accept an optional breakpoint parameter (defaults to `'desktop'`):

```ts
Widget#isEmptyValue(attributeName: string, breakpoint?: 'desktop' | 'tablet' | 'mobile'): boolean
Obj#isEmptyValue(attributeName: string, breakpoint?: 'desktop' | 'tablet' | 'mobile'): boolean
```

**Example:**

```ts
widget.isEmptyValue('alignment') // true if desktop is using emptyValue
widget.isEmptyValue('alignment', 'desktop') // same as above
widget.isEmptyValue('alignment', 'mobile') // true if not explicitly set
```

# Implementation details

The SDK implements responsive attribute types through virtualization—presenting a unified API while storing data as separate attributes internally. This approach requires no backend changes and maintains full compatibility with existing infrastructure.

When you define a responsive attribute, the SDK automatically manages three underlying attributes:

```ts
// Developer writes:
provideWidgetClass('HeadlineWidget', {
  attributes: {
    fontSize: 'responsivestring',
  }
})

// SDK internally creates:
{
  fontSize: 'string',              // Desktop value
  fontSizeTablet: 'string',        // Tablet value (falls back to desktop)
  fontSizeMobile: 'string',        // Mobile value (falls back to desktop)
}
```

The SDK implements the desktop fallback automatically. Tablet and mobile variants are configured to fall back to the desktop value when not explicitly set.

The SDK hides the internal attributes from attribute lists, presenting only the virtual responsive attribute to developers. This keeps the API surface clean while maintaining full backward compatibility at the storage level.
