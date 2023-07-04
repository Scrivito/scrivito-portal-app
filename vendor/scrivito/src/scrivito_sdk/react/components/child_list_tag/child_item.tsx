import * as React from 'react';

import { BasicObj } from 'scrivito_sdk/models';
import { LinkTag } from 'scrivito_sdk/react/components/link_tag';
import { connect } from 'scrivito_sdk/react/connect';
import { Obj, wrapInAppClass } from 'scrivito_sdk/realm';

export type RenderChild = (child: Obj) => React.ReactElement<{ child: Obj }>;

export const ChildItem = connect(function ChildItem(props: {
  child: BasicObj;
  renderChild?: RenderChild;
}) {
  const appObj = wrapInAppClass(props.child);

  if (props.renderChild) {
    return props.renderChild(appObj);
  }

  return (
    <li>
      <LinkTag to={appObj}>{props.child.get('title', 'string')}</LinkTag>
    </li>
  );
});

ChildItem.displayName = 'Scrivito.ChildListTag.ChildItem';
