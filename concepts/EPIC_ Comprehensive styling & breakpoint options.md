# EPIC: Comprehensive styling & breakpoint options

Dartagnan offers the option to provide different styling for different breakpoints. The `desktop` breakpoint is the "leading" breakpoint, that is used by the other breakpoints if not specified. The other breakpoints are `tablet` and `mobile`.

The goal of this document is to enable the portal app to have similar comprehensive styling options and to provide different styling options for different breakpoints.

Goals:

- Offer more styling options for most widgets.
- Offer different styling options for different breakpoints.
- Be inspired by Dartagnan, but not copy it 1 to 1\.
- Do not overwhelm the editor with too many or too fine grained styling options.

In [General remarks](#general-remarks), [Widget groups](#widget-groups), [Properties groups](#properties-groups) and [Breakpoint styling options and default values](#breakpoint-styling-options-and-default-values) I outline some high level requirements for the portal application.

In [SDK/UI proposals](#sdk/ui-proposals) I outline what SDK features would be needed to make this happen.

# General remarks {#general-remarks}

## **Text structure vs Text/Headline widget** {#text-structure-vs-text/headline-widget}

Dartagnan offers only a "text structure", but not a dedicated "headline structure". In the portal app there is a distinction between a HeadlineWidget (a `string` value with "heading levels") and a TextWidget (a `html` value without "heading levels"). I would keep TextWidget and HeadlineWidget, since I find them useful for editors to differentiate between them.

## **Column widget additions** {#column-widget-additions}

Dartagnan offers the possibility to design columns differently depending on the breakpoint. E.g. in desktop one can design this:
![][image1]
on mobile it looks like this:
![][image2]

You can do this in dartagnan by combining several "wrapper structures" with different width attributes. But this is quite tedious to configure and needs expert knowledge on how to do it.

The portal application already offers a ColumnWidget with up to 12 columns that is quite intuitive to edit. So far it only offered "Grid" and "Flex" display modes as well as the option to show "Responsive adaption?". If on it will linearize all columns in rows in mobile.

I propose to abandon the "Responsive adaption?" option and add two more enum options:

- **Rows** (`rows`) \- this will render each column as a dedicated row \- identical to the previous "Responsive adaption" version for smaller screens.
- **Rows (reverse)** (`rowsReverse`) \- this will show each column as a dedicated row, but in reverse order. So the last column will be shown first, second last column will be shown second and so forth.

Here is a screenshot of the property:
![][image3]

With that it becomes possible to e.g. show rows in desktop (e.g. one icon and in the next row the associated text) and grid in mobile (e.g. one icon next to the associated text in one row).

# Widget groups {#widget-groups}

For a start I grouped some widgets as follows. Please note, that this list is not complete and there are more widgets within the portal app.

## **Headline widgets** {#headline-widgets}

- HeadlineWidget
- PageTitleWidget
- BannerHeadlineWidget

## **Text based widgets** {#text-based-widgets}

- All [headline widgets](#headline-widgets)
- TextWidget
- DataCountWidget
- AddressWidget
- TickListItemWidget
- LinkWidget

## **Media widgets** {#media-widgets}

- ImageWidget
- DataImageWidget
- VideoWidget
- YoutubeVideoWidget
- VimeoVideoWidget

## **Button widgets** {#button-widgets}

- ButtonWidget
- LogInButtonWidget
- CheckoutButtonWidget
- DataLoadMoreButtonWidget
- DataFormSubmitButtonWidget
- DataDeleteButtonWidget

## **Container widgets** {#container-widgets}

- SectionWidget
- GroupWidget
- DataGroupWidget
- ColumnContainerWidget
- TickListWidget
- SliderWidget
- LinkContainerWidget

# Properties groups {#properties-groups}

## **Container properties group** {#container-properties-group}

As a frame of reference Dartagnan offers the "Container" properties group:
![][image4]

I propose to add the following attributes within the Portal App:

- **Width** (`width`): A string value storing `<number>px` or `<number>%` values. Please note that technically this is a min width value.
  Same as Dartagnan.
- **Height** (`height`): A `string` value storing `<number>px` values. Please note that technically this is a min height value.
  Same as Dartagnan.
- **(?) Background color** (`backgroundColor`): A `string` value using the colorPicker storing hex values.
  Same as Dartagnan.

I intentionally left out the following attributes from this group:

- **Opacity**: I don't have enough data to judge if this is widely used.
- **Hidden on tablet:** Leaving out for now.
- **Hidden on mobile**: Leaving out for now.

Here is a photoshopped mock-up of the proposed editing group:
![][image5]
As you can see the attributes are part of the "General" properties group below the widget specific attributes such as "Content" for a TextWidget.

The following widgets should have this properties group:

- All [text based widgets](#text-based-widgets)
- All [button widgets](#button-widgets)
- All [container widgets](#container-widgets)

All [media widgets](#media-widgets) get a variant of those properties:

- **Width** (`width`): A string value storing `<number>px` or `<number>%` values. Now this is an actual `width`, not a `minWidth`.
  Same as Dartagnan.
- **Height** (`height`): A `string` value storing `<number>px` values. Now this is an actual `width`, not a `minWidth`.
  Same as Dartagnan.
- **Object fit** (`objectFit`): A `enum` value with the option 'cover' and 'contain'. Only available, when a width is set.
- **(?) Background color** (`backgroundColor`): A `string` value using the colorPicker storing hex values.
  Same as Dartagnan.

Here is a screenshot on how this can look like for editors:
![][image6]

## **Text style properties group**

As a frame of reference Dartagnan offers the "Font" properties group:
![][image7]

I propose to offer the following attributes within the portal app:

- **(?) Text color** (`color`): A `string` value using the colorPicker storing hex values.
  Same as Dartagnan.
- **Font size** (`fontSize`): A `string` value storing `<number>px` values.
  Same as Dartagnan.
- **Letter spacing** (`letterSpacing`): A `string` value storing `<number>px` values.
  Same as Dartagnan.
- **Line height** (`lineHeight`): A `string` value storing `<number>px` values.
  Same as Dartagnan.
- **Case changes** (`textTransform`): A `enum` value offering 'none', 'uppercase' (AA), 'lowercase' (aa) and 'capitalize' (Aa) options.
  Same as Dartagnan.

Here is a screenshot of the proposed editing capabilities:
![][image8]

"Empty values" for Font size, letter spacing and line height should be dynamic to the selected "Heading level" (only for Headline related widgets).

I intentionally left out the following attributes, that are present within Dartagnan:

- **Heading level**: See [Text structure vs Text/Headline widget](#text-structure-vs-text/headline-widget) section.
- **Font family** (or just **Font**):The portal app already offers site wide font settings for headline and body font. At least currently I don't see much value in offering even more font options per text element. It also is not trivial to build and has loading implications, since each additional font potentially slows down the loading of the page. Here is a screenshot of the already existing site wide setting:
  ![][image9]
- **Bold** or **Italic**: For `html` attributes (such as the one used by TextWidget) there is an inline option to mark sentences or words as italic or bold etc. The email builder only allows setting these globally, not for individual breakpoints. I don't see value in setting this for the whole text. Here is a screenshot of the current html inplace editing capabilities:
  ![][image10]
- Alignment options should be part of a different properties group.

The following widgets should have this properties group:

- All [text based widgets](#text-based-widgets)

## **Margin properties group** {#margin-properties-group}

Dartagnan offers the following "padding" options, but names them "Margins" ([reason](https://infopark.slack.com/archives/C06BK6CF3ND/p1760014443536749?thread_ts=1760012759.423949&cid=C06BK6CF3ND)):
![][image11]

I propose to keep the same naming as Dartagnan and offer the following attributes within the portal app:

- **Top** (`paddingTop`): A `string` value storing `<number>px` or `<number>%` values.
  Same as Dartagnan.
- **Left** (`paddingLeft`): A `string` value storing `<number>px` or `<number>%` values.
  Same as Dartagnan.
- **Right** (`paddingRight`): A `string` value storing `<number>px` or `<number>%` values.
  Same as Dartagnan.
- **Bottom** (`paddingBottom`): A `string` valuestoring `<number>px` or `<number>%` values.
  Same as Dartagnan.

Here is a screenshot of the proposed editing capabilities:
![][image12]
Please note that this uses a single attribute extension per attribute. For a nicer design similar to Dartagan we would either offer to use a "custom component" with its limit (e.g. no diff mode, no revert etc.) or have to invent some kind of new SDK native editor. I consider this part out of scope for this concept.

The following widgets should have this properties group:

- All [text based widgets](#text-based-widgets)
- All [media widgets](#media-widgets)
- All [button widgets](#button-widgets)
- All [container widgets](#container-widgets)

## **Rounded corners properties group**

As a frame of reference Dartagnan offers a "Rounded corners" properties group:
![][image13]

I propose to add the following attributes within the portal app:

- **Top left** (`borderTopLeftRadius`): A `string` value storing `<number>px` values.
  Same as Dartagnan.
- **Top right** (`borderTopRightRadius`): A `string` value storing `<number>px` values.
  Same as Dartagnan.
- **Bottom left** (`borderBottomLeftRadius`): A `string` value storing `<number>px` values.
  Same as Dartagnan.
- **Bottom right** (`borderBottomRightRadius`): A `string` value storing `<number>px` values.
  Same as Dartagnan.

Here is a photoshopped mock-up on how the editor could look like in the sidebar:
![][image14]
For this the custom component `BorderRadiusEditor` would need to be provided and implemented. Of course the colors would need to adjust to the Scrivito styling (and maybe some icons as well). Potentially Scrivito could offer such an attribute editor out of the box, but this is out of scope from this concept.

The following widgets should have this properties group:

- All [text based widgets](#text-based-widgets)
- All [media widgets](#media-widgets)
- All [button widgets](#button-widgets)
- All [container widgets](#container-widgets)

## **Borders properties group**

As a frame of reference Dartagnan offers a "Borders" properties group:
![][image15]

I propose to add the following attributes within the portal app:

- **Top** (`borderTop`): A `string` value storing values such as `'1px solid #929292'`.
  Same as Dartagnan.
- **Left** (`borderLeft`): A `string` value storing values such as `'1px solid #929292'`.
  Same as Dartagnan.
- **Right** (`borderRight`): A `string` value storing values such as `'1px solid #929292'`.
  Same as Dartagnan.
- **Bottom** (`borderBottom`): A `string` value storing values such as `'1px solid #929292'`.
  Same as Dartagnan.

Here is a "rough" version on how this can look like in scrivito:
![][image16]

For this the custom component `BordersEditor` would need to be provided and implemented. Of course the colors would need to adjust to the Scrivito styling (and maybe some icons as well). Potentially Scrivito could offer such an attribute editor out of the box, but this is out of scope from this concept.

The following widgets should have this properties group:

- All [text based widgets](#text-based-widgets)
- All [media widgets](#media-widgets)
- All [button widgets](#button-widgets)
- All [container widgets](#container-widgets)

## **Alignment properties group**

Dartagnan spreads alignment attributes over the "Font" and the "Element alignment" properties groups:
![][image17]
![][image18]

I propose to add the following attributes within the portal app:

- **Text alignment** (`textAlign`): A `enum` attribute with the values `left`, `center` and `right`**.**
  Same as Dartagnan.
- **Vertical text alignment** (`verticalAlign`): A `enum` attribute with the value `top`, `middle` and `bottom`.
  Same as Dartagnan.
- **Element alignment** (`align`): A `enum` attribute with the values `left`, `center` and `right`**.**
  Same as Dartagnan.

Here is a screenshot of the proposed properties group within Scrivito:
![][image19]
The _Vertical text alignment_ is only editable if a _height_ in the container group is set.

The following widgets should have this properties group:

- All [text based widgets](#text-based-widgets)
- All [media widgets](#media-widgets)
- All [button widgets](#button-widgets)
- All [container widgets](#container-widgets)

# Breakpoint styling options and default values {#breakpoint-styling-options-and-default-values}

Each of the above mentioned properties groups should offer different styling options for different breakpoints.

Let's take a look at how Dartagnan offers these options:

Dartagnan has three hard-coded breakpoints: `desktop`, `laptop` and `mobile`. They show very prominent in the top bar a switch between the three breakpoints \- similar to view, edit and diff toggle within scrivito:
![][image20]

In the property only the value of the current breakpoint is shown, e.g. the `desktop` view of the margins properties group:
![][image21]

If one switches to the `mobile` view the same margins properties group looks like this:
![][image22]
As you can see, the value of the `desktop` view port is copied over and shown in a light gray option. So by default `tablet` and `mobile` use the `desktop` value, but allow to overwrite the value.

Scrivito and the Portal App should offer something similar.

# ---

# SDK/UI proposals {#sdk/ui-proposals}

Currently the Scrivito UI already offers a preview sizes (`desktop`, `laptop`, `tablet` and `mobile`) in the sidebar:
![][image23]

The Scrivito SDK also already offers [Scrivito.configurePreviewSizes](https://docs.scrivito.com/js-sdk/configurePreviewSizes) to configure arbitrary preview sizes, e.g.

```
configurePreviewSizes([
  { title: 'Full width' },
  { title: 'iPhone 11', width: 414, description: 'iPhone 11 Pro Max' },
  { title: 'iPad 12.9 (portrait)', width: 1024 },
  {
    title: 'Smartwatch',
    width: 184,
    icon: 'https://img.icons8.com/material-outlined/24/ffffff/apple-watch.png',
  },
])
```

results in
![][image24]

Keep in mind that preview sizes don't need to be equal to breakpoints. E.g. having "only" three breakpoints (`desktop`, `tablet`, `mobile`) but showing four preview sizes (`desktop`, `laptop`, `tablet`, `mobile`) could use the `desktop` value for the `laptop` preview size, without offering a custom `laptop` value.

See the [SDK: Responsive Attributes](https://docs.google.com/document/u/0/d/1JecdJfN3ThPJjVb6mMssNHoFFBlJm_qNhfMRpfcmwjE/edit) concept, on how the high level functions `responsiveAttribute`, `responsiveEditingAttribute` and `responsiveProperty` can be the building blocks for some of the above described features.

Additionally the following features would be nice:

### **More prominent preview sizes**

There should be a way to switch between preview sizes, without leaving the properties sidebar. This could be done by either adding some kind of preview sizes picker to the top bar (next to the preview, edit, diff buttons) or by adding a switch at the top of the properties sidebar.

I leave this part vague so that the design team can come up with good ideas, after we settle on the "hard coded" vs. "custom" breakpoints decision.

Here is a photoshopped mock-up on how the preview sizes could look like in the properties sidebar:
![][image25]

### **Bonus wish \- Additional editor: dimensionPicker**

Similar to `editor: 'colorPicker'` in the editing config, there should be an `editor: 'dimensionPicker'`. It requires an option to include units. For that the existing `EditorSpecificAttributeEditingConfig` should be extended by:

```
interface DimensionPickerEditorAttributeEditingOptions {
  units: Unit[];
}

type Unit = 'px' | '%';

type EditorSpecificAttributeEditingConfig =
  | {
      editor: 'colorPicker';
      options?: ColorPickerEditorAttributeEditingOptions;
    }
  | {
      editor: 'dimensionPicker';
      options?: DimensionPickerEditorAttributeEditingOptions;
    }
  | {
      editor?: never;
      options?: HtmlAttributeEditingOptions & StringAttributeEditingOptions;
    };

```

Example usage:

```
provideEditingConfig(TextWidget, {
  attributes: {
    width: {
      title: 'Width',
      editor: 'dimensionPicker',
      options: { units: ['px', '%'] },
    },
    height: {
      title: 'Height',
      editor: 'dimensionPicker',
      options: { units: ['px'] },
    },
    backgroundColor: {
      title: 'Background color',
      editor: 'colorPicker',
    },
  },
  properties: ['width', 'height', 'backgroundColor'],
})

```

It would result in the following UI:
![][image26]

## **Alternative version \- fixed break points (abandoned for now)**

~~Here is a rough draft, on how a "fixed break points" option could look like. They assume that there are only three breakpoints: `desktop`, `tablet` and `mobile`.~~

~~A new `responsivestring` attribute type is introduced. E.g.~~

```
provideWidgetClass('TextWidget', {
  attributes: {
    letterSpacing: 'responsivestring',
  }
})
```

~~Reading from this widget (`widget.get('letterSpacing')`) would return the following:~~

```
{
  desktop: '20px',
  tablet: null,
  mobile:'10px',

  normalizedValues: {
    desktop: '20px',
    tablet: '20px',
    mobile: '10px',
  }
}
```

~~The SDK would automatically normalize the values, so that rendering logic no longer has to calculate e.g. a missing `tablet` view port.~~

~~Updating the widget would look like this:~~

```
widget.update({
  letterSpacing: {
    desktop: '30px',
    tablet: '20px',
    mobile: null,
  }
})
```

~~Trying to create/update `normalizedValues` would throw an explanatory error.~~

~~The editing config would still stay the same, but Scrivito would use either `desktop`, `tablet` or `mobile` depending on the currently selected viewport (`<768` show `mobile`, `≥768 && <992` show `tablet`, `≥992` show desktop, based on the ["medium" breakpoint from Bootstrap 5](https://getbootstrap.com/docs/5.3/layout/breakpoints/#available-breakpoints)). For the `mobile` and `tablet` version the desktop value is taken as the fallback, if no breakpoint specific value is set.~~

~~Lazy-migration: If the attribute was previously a `string` attribute, the existing string value will be automatically used as the desktop value. If one switches back from "responsivestring" to "string" only the "desktop" value is keeped.~~

~~The same pattern should be applied to:~~

- ~~`responsiveenum`~~
- ~~`responsiveint`~~
- ~~`responsivefloat`~~

~~There are some aspects that need to be further specced:~~

1. ~~On what level should this new attribute live? Should it be a dedicated backend type or a "virtual" SDK type?~~
2. ~~How should custom components or single attribute editors know which version they should show?~~

# Changelog

2025-10-24

- Shortened section [SDK/UI proposals](#sdk/ui-proposals) by moving most of it out to the dedicated concept [SDK: Responsive Attributes](https://docs.google.com/document/u/0/d/1JecdJfN3ThPJjVb6mMssNHoFFBlJm_qNhfMRpfcmwjE/edit).

2025-10-22

- Added new [Putting it all together](#heading=h.w09xtqtduodm) section.
- Extended [Default values](#heading=h.u7dg5yljo2iy) examples.

2025-10-20

- Added [Fixed break points](#heading=h.wq9ym77t3ldk) section.

2025-10-17

- Reworked "media widgets" within the [Container properties group](#container-properties-group).
- Questioned planned used of color attributes.

2025-10-16

- Elaborated motivation for [Column widget additions](#column-widget-additions).
- In [Margin properties group](#margin-properties-group): Extended `paddingLeft` and `paddingBottom` potential types.
- Extended description of [Editing properties: Show attributes only in specific view ports](#heading=h.n8ddvo4k7ftq).
- Extended description of [Default values](#heading=h.u7dg5yljo2iy).
