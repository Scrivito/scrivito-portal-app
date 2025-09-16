import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { getDocument, onReset } from 'scrivito_sdk/common';

type OnShowExtension = (reactElement: React.ReactElement | null) => void;

let onShowExtension: OnShowExtension | undefined;

export function showExtension(reactElement: React.ReactElement): void {
  if (onShowExtension) onShowExtension(reactElement);
}

/** @public */
export function Extensions() {
  const [htmlElement, setHtmlElement] = React.useState<HTMLElement | null>(
    null
  );

  const [reactElement, setReactElement] =
    React.useState<React.ReactElement | null>(null);

  React.useEffect(() => {
    const doc = getDocument();

    const mount = doc.createElement('div');
    doc.body.append(mount);

    onShowExtension = setReactElement;
    setHtmlElement(mount);

    return () => {
      onShowExtension = undefined;
      mount.remove();
    };
  }, []);

  return htmlElement ? ReactDOM.createPortal(reactElement, htmlElement) : null;
}

onReset(() => (onShowExtension = undefined));
