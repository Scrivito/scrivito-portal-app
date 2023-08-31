export type GlobalPermissionVerb =
  | 'manage_users'
  | 'manage_builtin_visibility_categories'
  | 'manage_custom_visibility_categories'
  | 'manage_workflows';

type PermissionAdverb = 'always' | 'never';

export type SessionPermissions = {
  [key in GlobalPermissionVerb]?: PermissionAdverb;
};

export interface SessionData {
  id: string;
  maxage: number;
  permissions: SessionPermissions;
  token: string;
  user_id?: string;
}
