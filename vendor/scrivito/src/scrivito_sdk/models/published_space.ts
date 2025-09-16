import { WorkspaceObjSpaceId } from 'scrivito_sdk/client';
import { objSpaceFor } from 'scrivito_sdk/models/obj_space_for';

export function publishedSpace(): WorkspaceObjSpaceId {
  return objSpaceFor('published');
}
