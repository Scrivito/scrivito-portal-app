Title: SDK: Responsive Attributes - Device Preview

When responsive attributes are enabled in a Web Builder application, editors need a clear way to switch between desktop, tablet, and mobile viewports to see how their content adapts across different screen sizes. The device preview replaces the legacy preview sizes feature, providing a more integrated and purposeful responsive editing experience.

# Device preview UI

## Visual design

The device preview appears in the top bar next to the "Preview, Edit, Diff" mode icons, displaying three viewport options: Desktop, Tablet, and Mobile.

Design specifications:

- Location: Top bar, adjacent to mode icons
- Active state: Visually distinct from inactive options
- Labels: Icons/text with tooltips for "Desktop", "Tablet", and "Mobile"

## Interaction behavior

Clicking a viewport option:

1. Resizes the viewport to match the selected breakpoint
2. Updates the properties panel to show values for that breakpoint
3. Persists the selection across page navigation

The device preview works across all modes (Preview, Edit, Diff) independently. Editors can combine any viewport with any mode.

Viewport widths:

- Desktop: No width limit (full available width)
- Tablet: `tabletMaxWidth` value (default: 991px)
- Mobile: `mobileMaxWidth` value (default: 767px)

# Integration with responsive attributes

## Automatic enablement

The device preview appears automatically when:

1. `Scrivito.configure()` is called with `responsiveAttributes` settings, or
2. Any obj/widget class defines a responsive attribute type

```ts
Scrivito.configure({
  responsiveAttributes: {
    breakpoints: { mobileMaxWidth: 767, tabletMaxWidth: 991 },
  },
})
// → Device preview appears
```

## Availability in dialogs

Device preview icons are also available in contexts where the main application viewport is not visible, such as:

- Content browser
- Page and widget properties dialogs

The device preview icons appear in these contexts when one or more attributes of the current widget or obj have responsive variants defined. This ensures editors can switch between device contexts to view and edit responsive attribute values regardless of where they're editing.

The selected device context is shared across all editing interfaces, maintaining consistency as editors move between the main application and these auxiliary views.

# Deprecation of preview sizes

When responsive attributes are enabled, the legacy preview sizes feature is deprecated and replaced by the device preview.

## Automatic hiding

The "Preview Sizes" menu item disappears from the sidebar navigation to prevent confusion between two viewport systems.

## Behavior of `Scrivito.configurePreviewSizes()`

Once responsive attributes are enabled, `configurePreviewSizes()` throws an error:

```ts
Scrivito.configurePreviewSizes({ mobile: { width: 375 } })
// → Throws: "configurePreviewSizes() cannot be used when responsive attributes
//    are enabled. Use the device preview instead."
```

## Rationale

The device preview replaces preview sizes because:

1. Purpose-built for responsive editing with tight integration to the properties panel
2. Three defined breakpoints align with the responsive attribute system
3. Reduces complexity by having one viewport system
4. Viewport selection directly affects which values are being edited
