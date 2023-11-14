// @rewire
import * as ReactDOM from 'react-dom';
import { getDocument } from 'scrivito_sdk/common';

let legacyExtensionElement: HTMLElement | undefined;

export function legacyRenderExtension(extension: React.ReactElement) {
  if (legacyExtensionElement) {
    ReactDOM.render(extension, legacyExtensionElement);
  } else {
    legacyExtensionElement = legacyReplaceDOMWithExtension(
      getDocument(),
      extension
    );
  }
}

function legacyReplaceDOMWithExtension(
  doc: Document,
  extension: React.ReactElement
) {
  const div = doc.createElement('div');

  doc.body.innerHTML = '';
  doc.body.appendChild(div);

  ReactDOM.render(extension, div);

  return div;
}

export function unmountLegacyExtension() {
  if (legacyExtensionElement) {
    ReactDOM.unmountComponentAtNode(legacyExtensionElement);
  }
}

// For test purpose only.
export function resetExtension(): void {
  legacyExtensionElement = undefined;
}
