import {
  type ComponentType,
  type HTMLAttributes,
  type Ref,
  useContext,
} from 'react';

import { importFrom } from 'scrivito_sdk/import_from';
import { WidgetTagContext } from 'scrivito_sdk/react/components/content_tag/widget_content';
import {
  DesignPropValue,
  mergeDesignStyle,
  resolveDesignProp,
} from 'scrivito_sdk/react/design_tag_props';
import { connect } from 'scrivito_sdk/react_connect';
import { wrapInAppClass } from 'scrivito_sdk/realm';

type WidgetTagProps = HTMLAttributes<HTMLElement> & {
  tag?: string;
  design?: DesignPropValue;
  ref?: Ref<Element>;
};

/** @public */
export const WidgetTag: ComponentType<WidgetTagProps> = connect(
  function WidgetTag(props) {
    const { tag: Tag = 'div', design, ...otherProps } = props;
    const { widget } = useContext(WidgetTagContext);

    const designTagProps = resolveDesignProp(
      design,
      widget && wrapInAppClass(widget),
      'Scrivito.WidgetTag',
    );

    const tagProps = {
      ...otherProps,
      ...designTagProps,
      style: mergeDesignStyle(otherProps.style, designTagProps?.style),
    };

    const WidgetTagWithEditing = importFrom(
      'reactEditing',
      'WidgetTagWithEditing',
    );

    if (!WidgetTagWithEditing) return <Tag {...tagProps} />;

    return <WidgetTagWithEditing tag={Tag} {...tagProps} />;
  },
);
