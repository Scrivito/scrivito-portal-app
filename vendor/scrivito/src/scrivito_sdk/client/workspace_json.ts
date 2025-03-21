export type WorkspaceJson = PublishedWorkspaceJson | WorkingCopyJson;

interface PublishedWorkspaceJson {
  id: 'published';

  // always present properties, only optional to keep current fixtures simple
  auto_update?: false;
  memberships?: {};
  // effectively: ['read'], but could be subject to a future change
  user_permissions?: WorkspacePermissionVerb[];

  // technical properties for unified access of WorkspaceJson
  assignees?: undefined;
  stage?: undefined;
  title?: undefined;
  workflow_id?: undefined;
}

interface WorkingCopyJson {
  id: string;
  workflow_id: string;

  // always present properties, only optional to keep current fixtures simple
  auto_update?: boolean;
  memberships?: Memberships;
  user_permissions?: WorkspacePermissionVerb[];

  // potentially omitted properties start here
  assignees?: string[];
  stage?: '_review';
  title?: string;
}

export interface Memberships {
  [userId: string]: { role: 'owner' | 'reader' | 'writer' };
}

export type WorkspacePermissionVerb =
  | 'assign'
  | 'delete'
  | 'invite_to'
  | 'publish'
  | 'read'
  | 'submit_to_review'
  | 'write';
