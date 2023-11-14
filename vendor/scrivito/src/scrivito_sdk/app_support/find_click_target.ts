// @rewire
import { MouseEvent } from 'react';
import * as URI from 'urijs';

import { isLocalUri } from 'scrivito_sdk/app_support/routing';
import { isModifierClick } from 'scrivito_sdk/common';

export type LinkTarget = OpenInCurrentWindow | OpenInNewWindow | null;

export interface OpenInCurrentWindow {
  openInCurrentWindow: string;
}

export interface OpenInNewWindow {
  openInNewWindow: string;
}

export function isOpenInNewWindow(
  target: LinkTarget
): target is OpenInNewWindow {
  if (target) {
    return !!(target as OpenInNewWindow).openInNewWindow;
  }

  return false;
}

export function findClickTarget(e: MouseEvent<HTMLElement>): LinkTarget {
  const innermostNode = e.target as Node;
  const outermostNode = e.currentTarget;
  const isModifier = isModifierClick(e);

  return findLinkTarget(innermostNode, outermostNode, isModifier);
}

function findLinkTarget(
  currentNode: Node,
  outermostNode: Node,
  isModifier: boolean
): LinkTarget {
  if (currentNode === outermostNode) {
    return null;
  }

  if (isHTMLAnchorElement(currentNode)) {
    const url = currentNode.href;

    const uri = URI(url);
    if (!isLocalUri(uri)) {
      return null;
    }

    if (isModifier || currentNode.getAttribute('target') === '_blank') {
      return { openInNewWindow: url };
    }

    return { openInCurrentWindow: uri.resource() };
  }

  if (!currentNode.parentNode) {
    return null;
  }

  return findLinkTarget(currentNode.parentNode, outermostNode, isModifier);
}

function isHTMLAnchorElement(node: Node): node is HTMLAnchorElement {
  return node.nodeName === 'A';
}
