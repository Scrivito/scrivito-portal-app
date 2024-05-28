import * as React from 'react';

import { importFrom } from 'scrivito_sdk/import_from';
import { connect } from 'scrivito_sdk/react_connect';

type WidgetTagProps = React.HTMLAttributes<HTMLElement> & {
  tag?: string;
};

/** @public */
export const WidgetTag: React.ComponentType<WidgetTagProps> = connect(
  function WidgetTag(props) {
    const { tag: Tag = 'div', ...otherProps } = props;

    const WidgetTagWithEditing = importFrom(
      'reactEditing',
      'WidgetTagWithEditing'
    );

    if (!WidgetTagWithEditing) return <Tag {...otherProps} />;

    return <WidgetTagWithEditing tag={Tag} {...otherProps} />;
  }
);
