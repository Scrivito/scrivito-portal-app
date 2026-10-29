import type { ComponentType, HTMLAttributes, Ref } from 'react';

import { currentPage } from 'scrivito_sdk/app_support/current_page';
import { importFrom } from 'scrivito_sdk/import_from';
import {
  ChildItem,
  RenderChild,
} from 'scrivito_sdk/react/components/child_list_tag/child_item';
import { withDisplayName } from 'scrivito_sdk/react/with_display_name';
import { connect } from 'scrivito_sdk/react_connect';
import { Obj } from 'scrivito_sdk/realm';

type ChildListTagProps = HTMLAttributes<HTMLElement> & {
  parent?: Obj;
  tag?: string;
  renderChild?: RenderChild;
  ref?: Ref<Element>;
};

/** @public */
export const ChildListTag: ComponentType<ChildListTagProps> = connect(
  withDisplayName('Scrivito.ChildListTag', (props: ChildListTagProps) => {
    const {
      parent = currentPage(),
      tag: Tag = 'ul',
      renderChild,
      ...otherProps
    } = props;

    if (!parent) return null;

    const basicParent = parent._scrivitoPrivateContent;
    const orderedChildren = basicParent.orderedChildren();

    const childComponents = orderedChildren.map((child) => (
      <ChildItem key={child.id()} child={child} renderChild={renderChild} />
    ));

    const ChildListTagWithEditing = importFrom(
      'reactEditing',
      'ChildListTagWithEditing',
    );

    if (!ChildListTagWithEditing) {
      return <Tag {...otherProps}>{childComponents}</Tag>;
    }

    return (
      <ChildListTagWithEditing
        tag={Tag}
        basicParent={basicParent}
        {...otherProps}
      >
        {childComponents}
      </ChildListTagWithEditing>
    );
  }),
);
