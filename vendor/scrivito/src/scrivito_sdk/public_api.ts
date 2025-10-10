// If imported, this file provides a namespace object for the public API, e.g.:
//
//   import * as Scrivito from 'scrivito_sdk/public_api';
//
//   Scrivito.configure({ ... });
//   Scrivito.provideComponent({ ... });

// Client
export { ArgumentError, ScrivitoError } from 'scrivito_sdk/common';
export {
  load,
  enableOfflineStore as unstable_enableOfflineStore,
  isOfflineStoreEnabled as unstable_isOfflineStoreEnabled,
} from 'scrivito_sdk/loadable';
export {
  isInOfflineMode as unstable_isInOfflineMode,
  leaveOfflineMode as unstable_leaveOfflineMode,
  enterOfflineMode as unstable_enterOfflineMode,
  deleteOfflineStore as unstable_deleteOfflineStore,
} from 'scrivito_sdk/app_support/offline_mode';
export { Binary, FutureBinary, DataLocator } from 'scrivito_sdk/models';
export { ClientError, createRestApiClient } from 'scrivito_sdk/client';
export type { ApiClientOptions } from 'scrivito_sdk/client';

export { selectImageFromContentBrowser as unstable_selectImageFromContentBrowser } from 'scrivito_sdk/app_support/select_image_from_content_browser';

export {
  createObjClass,
  createWidgetClass,
  getRealmClass as getClass,
  Link,
  Obj,
  ObjFacetValue,
  ObjSearch,
  Widget,
} from 'scrivito_sdk/realm';

export type { WidgetClass, ObjClass } from 'scrivito_sdk/realm';

export {
  BackgroundImageTag,
  ChildListTag,
  ContentTag,
  CurrentPage,
  Extensions,
  ImageTag,
  InPlaceEditingOff,
  LinkTag,
  NotFoundErrorPage,
  provideComponent,
  provideLayoutComponent,
  provideDataErrorComponent,
  registerComponent,
  RestoreInPlaceEditing,
  WidgetTag,
  useData,
  useDataItem,
  useDataLocator,
  useDataScope,
  useAttributeDefinition,
  useUrlFor,
  useResolvedStringValue,
  useResolvedHtmlValue,
  useContent,
  InPlaceEditAsPageContent,
} from 'scrivito_sdk/react';

export type {
  CustomPageComponentProps,
  CustomWidgetComponentProps,
  PageComponentProps,
  WidgetComponentProps,
} from 'scrivito_sdk/react';

export {
  DataClass,
  DataConnectionError,
  DataItem,
  DataScope,
} from 'scrivito_sdk/data_integration';

export type {
  DataAttributeDefinitions,
  DataConnection,
  DataConnectionFilters,
  DataConnectionIndexParams,
  DataConnectionResultItem,
} from 'scrivito_sdk/data_integration';

export { finishLoading, connect } from 'scrivito_sdk/react_connect';

// App support
export { canEdit } from 'scrivito_sdk/app_support/can_edit';
export { canWrite } from 'scrivito_sdk/app_support/can_write';
export { configure } from 'scrivito_sdk/app_support/configure';
export { configureContentBrowser } from 'scrivito_sdk/app_support/configure_content_browser';
export { configureCropAspectRatios } from 'scrivito_sdk/app_support/crop_aspect_ratios';
export { configureObjClassForContentType } from 'scrivito_sdk/app_support/configure_obj_class_for_content_type';
export { configurePreviewSizes } from 'scrivito_sdk/app_support/preview_sizes';
export { currentEditor } from 'scrivito_sdk/app_support/current_editor';
export {
  currentUser,
  isUserLoggedIn,
  ensureUserIsLoggedIn,
  logout,
} from 'scrivito_sdk/app_support/current_user';
export {
  currentPage,
  currentPageParams,
  currentSiteId,
  isCurrentPage,
} from 'scrivito_sdk/app_support/current_page';
export { currentWorkspace } from 'scrivito_sdk/app_support/current_workspace';
export { currentWorkspaceId } from 'scrivito_sdk/models/current_workspace_id';
export { extendMenu } from 'scrivito_sdk/app_support/extend_menu';
export { extractText } from 'scrivito_sdk/app_support/extract_text';
export { isComparisonActive } from 'scrivito_sdk/app_support/editing_context';
export { isEditorLoggedIn } from 'scrivito_sdk/app_support/is_editor_logged_in';
export { isInPlaceEditingActive } from 'scrivito_sdk/app_support/editing_context';
export { navigateTo } from 'scrivito_sdk/app_support/navigate_to';
export { openDialog } from 'scrivito_sdk/app_support/open_dialog';
export { preload } from 'scrivito_sdk/app_support/preload';
export { provideAuthGroups } from 'scrivito_sdk/app_support/auth_groups';
export { renderPage } from 'scrivito_sdk/app_support/render_page';
export { setVisitorIdToken } from 'scrivito_sdk/app_support/visitor_authentication';
export { updateContent } from 'scrivito_sdk/app_support/update_content';
export { updateMenuExtensions } from 'scrivito_sdk/app_support/menu';
export { urlFor } from 'scrivito_sdk/app_support/url_for';
export { urlForDataItem } from 'scrivito_sdk/app_support/url_for_data_item';
export { useHistory } from 'scrivito_sdk/app_support/browser_location';
export { validationResultsFor } from 'scrivito_sdk/app_support/validation_results_stub';
export { uiContext } from 'scrivito_sdk/app_support/ui_context';
export { editorLanguage } from 'scrivito_sdk/app_support/editor_language';
export { resolveHtmlUrls } from 'scrivito_sdk/app_support/replace_internal_links';
export {
  provideDataClass,
  provideDataItem,
} from 'scrivito_sdk/data_integration';
export { getDataClass } from 'scrivito_sdk/data_integration';
export {
  provideObjClass,
  provideWidgetClass,
} from 'scrivito_sdk/app_support/provide_content_class';
export { provideEditingConfig } from 'scrivito_sdk/app_support/provide_editing_config';

export type {
  ObjEditingConfig,
  ObjEditingConfigAttributes,
  ObjEditingConfigInitialContent,
  ObjEditingConfigValidations,
  WidgetEditingConfig,
  WidgetEditingConfigAttributes,
  WidgetEditingConfigInitialContent,
  WidgetEditingConfigValidations,
} from 'scrivito_sdk/app_support/editing_config';
export { isOnCurrentPath } from 'scrivito_sdk/app_support/is_on_current_path';
export { getInstanceId } from 'scrivito_sdk/app_support/get_instance_id';
export { currentLanguage } from 'scrivito_sdk/app_support/current_language';
export { performWithIamToken } from 'scrivito_sdk/app_support/perform_with_iam_token';

/** @internal */
export { unstable_selectSiteId } from 'scrivito_sdk/app_support/unstable_multi_site_mode';
