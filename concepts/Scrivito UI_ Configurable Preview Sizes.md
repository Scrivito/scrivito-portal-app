# Scrivito UI: Configurable Preview Sizes

## This document provides an overview of how Scrivito UI can be configured to offer project specific preview sizes. Motivation for this feature can be found in the [corresponding Github issue](https://github.com/infopark/scrivito_js/issues/8320).

# Public API

## **configurePreviewSizes(previewSizes)**

In its sidebar Scrivito UI offers a way to preview content using certain preview sizes:

By default the UI allows the editor to preview content on a mobile phone, on a tablet, on a laptop and on a desktop (which is the default). However, Scrivito UI can also be configured to offer custom preview sizes, specific for your project:

```ts
Scrivito.configurePreviewSizes(\[
  {
    title: "iPhone 11 Pro Max",
    width: 414,
    description: "414 × 896",
    icon: "https://unpkg.com/bootstrap-icons/icons/phone.svg"
  },

  ...
\]);
```

**Params:**

- previewSizes (Array) \- A list of the preview sizes ([see below for details](#bookmark=id.u668u0x1n6wy)).

Each entry must include a title and can provide a max available width, alongside an optional description and an icon:

- title (String) \- The displayed title, e.g. _"iPhone 11 Pro Max"_.
- width (Number) \- Max width of the device in px. This number limits the width available for the content and thus, simulates a preview on a device with similar limitations. If left out, no width limitation is assumed and the content will fill all available width.
- description (String) \- An optional description, e.g. _"414 × 896"_.
- icon (String) \- Optional URL of an image representing the device. We recommend using SVG images. If left out, Scrivito UI will determine an appropriate icon, based on the provided preview size width.

# ---

## _This section is for team-internal use only._

# SDK accepts preview sizes {#sdk-accepts-preview-sizes}

The SDK provides the above API to configure preview sizes:

// src/scrivito_sdk/app_support/preview_sizes

export function configurePreviewSizes(
previewSizes: [PreviewSize](#sdk-communicates-preview-sizes-to-the-ui)\[\]
): void;

export function getPreviewSizes(): [PreviewSize](#sdk-communicates-preview-sizes-to-the-ui)\[\] | undefined;

- Preview sizes are validated and an explanatory error is thrown _immediately_ if a configuration is invalid. The validation does not have to happen via Tcomb.
- If valid, the preview sizes configuration is stored _in a state container_.
- For inspiration please see configure_obj_class_for_content_type.

# SDK communicates preview sizes to the UI {#sdk-communicates-preview-sizes-to-the-ui}

In order to communicate the preview sizes to the UI, the app adapter interface is extended with a new data type and a new GET function:

interface PreviewSize {
title: string;
description?: string;
width?: number;
icon?: string;
}

export class AppAdapter {
getPreviewSizes(): PreviewSize\[\] | undefined;
}

- Simply delegates to [getPreviewSizes](#sdk-accepts-preview-sizes).

# UI calculates preview sizes

In order to calculate the preview sizes, a new UI module is introduced:

// src/scrivito/preview_sizes

export function getPreviewSizes(): PreviewSize\[\];

- Tries to get the preview sizes from the AppConfig.
- If the AppConfig returns preview sizes, these preview sizes are returned as is.
- If the AppConfig does not return any preview sizes, the default preview sizes are returned. These are the four currently available preview sizes, but transformed into the format of PreviewSize. Please see src/scrivito_ui.scss, devices_panel.tsx and application_iframe.tsx for details. However, since the icons are CSS class based, they should be left out, as well as the width for desktop.

# UI is prepared for preview sizes

In order to comply with the new format and naming, the UI has to be prepared for new previews sizes:

- In order to reduce confusion, any wording containing "preview device" is changed to "preview size".
- The module src/scrivito/preview_device.ts is renamed to current_preview_size.ts and its API is adjusted accordingly. In the local storage not the device name is stored anymore, but the width of the current preview size, even though it might be missing like in the case of desktop.
- The freshly renamed function getCurrentPreviewSize compares the stored preview size with the available ones and if none is matching, then null is returned.
- The component DevicesPanel is changed to use getPreviewSizes instead of using hard-coded constants.
- The component ApplicationIframe is changed to use inline CSS (max-width) instead of a CSS class when adjusting its width to the current preview size. If the corresponding width property is missing, max-width: 100% is used instead (this could be the default set in the CSS and left out from inline style for the no-width case). For more details please see src/scrivito_ui.scss.

# UI offers configured preview sizes

- The component DevicesPanel is changed to support preview sizes:
  - If a preview size has a description, then it is rendered below the title.
  - If an icon is provided, then it is rendered in an \<img /\> tag.
  - If an icon is missing in a preview size, then an icon is calculated based on the configured width. If no width is configured, then desktop is assumed.

# UI uses consistent naming for preview sizes (a.k.a. "clean up")

- Once the above has been implemented, the UI code will still contain the term "device(s)" in several places, e.g. DevicesPanel component. All these places have to be identified and the naming has to be adjusted accordingly, e.g. DevicesPanel renamed to PreviewSizesPanel.
