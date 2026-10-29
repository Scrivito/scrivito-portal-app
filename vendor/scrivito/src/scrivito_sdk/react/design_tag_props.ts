import { CSSProperties } from 'react';

import { isInPlaceEditingActive } from 'scrivito_sdk/app_support/editing_context';
import { ArgumentError, throwNextTick } from 'scrivito_sdk/common';
import {
  DESIGN_BREAKPOINTS,
  DESIGN_PROPERTY_NAMES,
  Design,
  DesignBreakpoint,
} from 'scrivito_sdk/models';
import {
  cssCustomPropertyOf,
  designTokenOf,
} from 'scrivito_sdk/react/design_css_names';
import { Obj, Schema, Widget, unwrapAppClass } from 'scrivito_sdk/realm';

/** The attribute a design is read from where it is not given as a value. */
const DESIGN_ATTRIBUTE_NAME = 'design';

/** @public */
export type DesignStyle = CSSProperties & {
  [customProperty: `--sd-${string}`]: string;
};

/** @public */
export interface DesignTagProps {
  'data-scrivito-design': string;
  /** The breakpoints at which the element is hidden. Only set while editing. */
  'data-scrivito-design-hidden'?: string;
  style: DesignStyle;
}

/**
 * The `design` prop of `ContentTag`, `WidgetTag` and `ImageTag`: `true` applies the design
 * attribute of the content the tag renders, a `Design` applies that value, and `false` or
 * `null` applies nothing.
 *
 * @public
 */
export type DesignPropValue = Design | boolean | null;

/**
 * Turns a design into props to spread onto the element the design should apply to. Takes
 * either the value of a `design` attribute, or the content it belongs to — in which case the
 * attribute named `design` is used.
 *
 * ```jsx
 * <WidgetTag {...designTagProps(widget)} />
 * <WidgetTag {...designTagProps(widget.get('design'))} />
 * ```
 *
 * The element does not have to be the widget's outermost one, but it does have to enclose
 * everything the widget renders — otherwise a padding or a background would cover only part
 * of it.
 *
 * @public
 */
export function designTagProps(
  design: Design | null | undefined,
): DesignTagProps;

/** @public */
export function designTagProps(content: Obj | Widget): DesignTagProps;

export function designTagProps(
  designOrContent: Design | Obj | Widget | null | undefined,
): DesignTagProps {
  return designTagPropsOf(designValueOf(designOrContent));
}

/**
 * The tag props a `design` prop stands for, or none if it applies nothing. Reports a missing
 * attribute instead of throwing, because a component still has to render.
 */
export function resolveDesignProp(
  design: DesignPropValue | undefined,
  content: Obj | Widget | null | undefined,
  componentName: string,
): DesignTagProps | undefined {
  if (!design) return undefined;
  if (design !== true) return designTagPropsOf(design);

  const ownDesign = content && designAttributeOf(content);

  if (!ownDesign) {
    throwNextTick(
      new ArgumentError(
        `Component "${componentName}" received prop "design" with value "true", ` +
          `but there is no attribute "${DESIGN_ATTRIBUTE_NAME}" of type "design" to read.`,
      ),
    );

    return undefined;
  }

  return designTagPropsOf(ownDesign);
}

/** The style a tag renders, with the design's custom properties on top of the app's own. */
export function mergeDesignStyle(
  style: CSSProperties | undefined,
  designStyle: DesignStyle | undefined,
): CSSProperties | undefined {
  if (!designStyle) return style;
  if (!style) return designStyle;

  return { ...style, ...designStyle };
}

function designValueOf(
  designOrContent: Design | Obj | Widget | null | undefined,
) {
  if (!designOrContent) return undefined;
  if (designOrContent instanceof Design) return designOrContent;

  const design = designAttributeOf(designOrContent);

  if (!design) {
    throw new ArgumentError(
      `"${unwrapAppClass(designOrContent).objClass()}" has no attribute ` +
        `"${DESIGN_ATTRIBUTE_NAME}" of type "design" — pass a design value instead.`,
    );
  }

  return design;
}

function designAttributeOf(content: Obj | Widget) {
  const typeInfo = Schema.forInstance(content)?.attribute(
    DESIGN_ATTRIBUTE_NAME,
  );

  if (typeInfo?.[0] !== 'design') return undefined;

  return unwrapAppClass(content).get(DESIGN_ATTRIBUTE_NAME, ['design']);
}

function designTagPropsOf(design: Design | undefined): DesignTagProps {
  const tokens: string[] = [];
  const style: DesignStyle = {};
  const hiddenAt: DesignBreakpoint[] = [];

  // `hidden` never applies while editing: a widget rendering `display: none` cannot be
  // selected, and there is no way back to a widget you cannot click. The breakpoints it would
  // apply at are reported separately, so that the editor can mark it instead.
  const isEditing = isInPlaceEditingActive();

  for (const breakpoint of DESIGN_BREAKPOINTS) {
    for (const name of DESIGN_PROPERTY_NAMES) {
      // Resolved, not own: a property set only on desktop is in force on mobile too, and the
      // mobile band's rule only fires if the mobile token is there.
      const resolved = design?.get(name, breakpoint);
      if (resolved === undefined) continue;

      if (name === 'hidden') {
        if (resolved !== 'true') continue;

        hiddenAt.push(breakpoint);
        if (isEditing) continue;

        tokens.push(designTokenOf(name, breakpoint));
        continue;
      }

      tokens.push(designTokenOf(name, breakpoint));

      // The value, in contrast, stays sparse — exactly what is stored. The `var()` fallback
      // in the stylesheet reaches desktop's where a derived breakpoint carries none.
      const own = design?.getOwn(name, breakpoint);
      if (own !== undefined) style[cssCustomPropertyOf(name, breakpoint)] = own;
    }
  }

  const props: DesignTagProps = {
    'data-scrivito-design': tokens.join(' '),
    style,
  };

  if (isEditing && hiddenAt.length > 0) {
    props['data-scrivito-design-hidden'] = hiddenAt.join(' ');
  }

  return props;
}
