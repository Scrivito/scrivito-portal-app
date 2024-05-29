import {
  MissingWorkspaceError,
  cmsRestApi,
} from 'scrivito_sdk/client/cms_rest_api';
import {
  ObjSpaceId,
  asBackendObjSpaceId,
} from 'scrivito_sdk/client/obj_space_id';
import { AttributeType } from 'scrivito_sdk/models';

export interface ObjFieldDiffs extends WidgetPoolDiffs {
  [attributeNameOrSpecialKeys: string]:
    | FieldDiffs[keyof FieldDiffs]
    | WidgetPoolDiffs[keyof WidgetPoolDiffs];
}
interface WidgetPoolDiffs {
  _widget_pool?: {
    [widgetId: string]: FieldDiffs | undefined;
  };
}

export interface FieldDiffs {
  [attributeName: string]: [AttributeType, FieldDiff];
}

export type FieldDiff = HtmlDiff | WidgetlistDiff;

interface HtmlDiff {
  format: 'html';
  content: HtmlDiffContent;
}

export type HtmlDiffContent = string;

export interface WidgetlistDiff {
  format: 'widgetlist_diff';
  content: WidgetlistDiffContent;
}

export type WidgetlistDiffContent = Array<[WidgetlistModification, WidgetId]>;

export type WidgetlistModification = '+' | '-' | '=';
type WidgetId = string;

export function retrieveObjFieldDiffs(
  from: ObjSpaceId,
  to: ObjSpaceId,
  objId: string
): Promise<ObjFieldDiffs> {
  return cmsRestApi
    .get(`objs/${objId}/diff`, {
      from: asBackendObjSpaceId(from),
      to: asBackendObjSpaceId(to),
    })
    .then((response) => response as Promise<ObjFieldDiffs>)
    .catch((error) => {
      if (error instanceof MissingWorkspaceError) return {};
      throw error;
    });
}
