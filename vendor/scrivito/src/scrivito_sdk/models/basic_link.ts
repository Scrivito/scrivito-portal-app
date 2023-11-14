import * as URI from 'urijs';

import { ArgumentError, QueryParameters } from 'scrivito_sdk/common';
import { BasicObj } from 'scrivito_sdk/models/basic_obj';
import { getObjIncludingUnavailableFrom } from 'scrivito_sdk/models/basic_scope_get_methods';
import { currentObjSpaceId } from 'scrivito_sdk/models/current_workspace_id';
import { objSpaceScopeExcludingDeleted } from 'scrivito_sdk/models/obj_space_scope_excluding_deleted';
import { ObjUnavailable } from 'scrivito_sdk/models/obj_unavailable';

export interface BasicLinkAttributes {
  hash?: string | null;
  objId?: string | null;
  rel?: string | null;
  query?: string | null;
  target?: string | null;
  title?: string | null;
  url?: string | null;
}

export class BasicLink {
  private readonly attributes: Readonly<BasicLinkAttributes>;

  constructor(attributes: BasicLinkAttributes) {
    this.attributes = { ...attributes };
  }

  title(): string | null {
    return this.attributes.title || null;
  }

  query(): string | null {
    return this.attributes.query || null;
  }

  hash(): string | null {
    return this.attributes.hash || null;
  }

  rel(): string | null {
    return this.attributes.rel || null;
  }

  target(): string | null {
    return this.attributes.target || null;
  }

  url(): string | null {
    return this.attributes.url || null;
  }

  objId(): string | null {
    return this.attributes.objId || null;
  }

  obj(): BasicObj | ObjUnavailable | null {
    const objId = this.objId();

    if (!objId) return null;

    const scope = objSpaceScopeExcludingDeleted(currentObjSpaceId());
    return getObjIncludingUnavailableFrom(scope, objId);
  }

  queryParameters(): QueryParameters {
    return URI.parseQuery(this.query() || '');
  }

  isExternal(): this is ExternalLink {
    return !!this.url();
  }

  isInternal(): boolean {
    return !this.isExternal();
  }

  equals(otherLink: unknown): boolean {
    if (!(otherLink instanceof BasicLink)) {
      return false;
    }

    if (this.isExternal()) {
      return (
        this.hash() === otherLink.hash() &&
        this.query() === otherLink.query() &&
        this.rel() === otherLink.rel() &&
        this.target() === otherLink.target() &&
        this.title() === otherLink.title() &&
        this.url() === otherLink.url()
      );
    }

    return (
      this.objId() === otherLink.objId() && this.title() === otherLink.title()
    );
  }

  copy(attributes: BasicLinkAttributes = {}): BasicLink {
    const newAttributes = { ...this.attributes, ...attributes };
    if (attributes.objId && attributes.url) {
      throw new ArgumentError(
        'Link#copy refused: both "objId" and "url" have been' +
          ' specified with truthy values'
      );
    }
    if (attributes.objId) {
      newAttributes.url = null;
    } else if (attributes.url) {
      newAttributes.objId = null;
    }

    return new BasicLink(newAttributes);
  }

  isEmpty(): boolean {
    return !this.isExternal() && !this.objId();
  }

  /** Destination is to be read with a public API perspective in mind:
   * returns false for an internal link pointing to a forbidden obj
   */
  hasDestination(): boolean {
    return this.isExternal() || this.obj() instanceof BasicObj;
  }

  toPrettyPrint(): string {
    const objId = this.objId();

    return objId
      ? `[object Link objId="${objId}"]`
      : `[object Link url="${this.url() ?? '<empty>'}"]`;
  }
}

interface ExternalLink extends BasicLink {
  isExternal(): true;
  url(): string;
}
