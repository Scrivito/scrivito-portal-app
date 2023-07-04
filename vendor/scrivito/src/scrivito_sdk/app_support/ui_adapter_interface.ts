import { UiContext } from 'scrivito_sdk/app_support/ui_context';
import { UserData } from 'scrivito_sdk/app_support/user';
import { AdapterConnection, GET, SEND, STREAM } from 'scrivito_sdk/bridge';
import { CmsRetrieval, ComparisonRange, ObjSpaceId } from 'scrivito_sdk/client';
import { Position } from 'scrivito_sdk/common';
import {
  ContentUpdateHandler,
  ObjStreamReplicationEndpoint,
} from 'scrivito_sdk/data';
import { ContentBrowserResult, TeamData } from 'scrivito_sdk/editing_support';
import { ResolvedUrl } from 'scrivito_sdk/link_resolution';
import {
  BinaryHandler,
  CopyObjHandler,
  ObjSearchParams,
} from 'scrivito_sdk/models';
import { WorkspaceData } from 'scrivito_sdk/models/workspace';
import { OptionMarkerPosition } from 'scrivito_sdk/react_editing/option_marker';

export const uiAdapterDescription = {
  canEdit: GET,
  canWrite: GET,
  comparisonBase: GET,
  comparisonRange: GET,
  getEditorAuthToken: GET,
  getContentStateId: GET,
  translate: GET,
  currentEditor: GET,
  currentEditorTeams: GET,
  currentWorkspace: GET,
  currentEditingContext: GET,
  getUiContext: GET,
  getUiLanguage: GET,

  // LinkResolution methods
  getResolvedUrl: GET,

  // CmsRetrieval methods
  retrieveObjQuery: SEND,
  retrieveFacetQuery: SEND,
  retrieveSuggest: SEND,
  retrieveBinaryMetadata: SEND,
  retrieveBinaryUrls: SEND,
  retrieveObjFieldDiffs: SEND,

  // BinaryHandler methods
  copyBinary: SEND,
  uploadBinary: SEND,

  // ObjStreamReplicationEndpoint methods
  objReplicationMessageStream: STREAM,
  finishSavingObj: SEND,

  copyObj: SEND,
  finishReplicatingObj: SEND,
  insertWidget: SEND,
  navigateToExternalUrl: SEND,
  openInNewUiWindow: SEND,
  configureContentBrowser: SEND,
  openContentBrowser: SEND,
  openCustomDialog: SEND,
  setAppAdapter: SEND,
  configureTenant: SEND,
  showWidgetMenu: SEND,
  showWidgetlistMenu: SEND,
  showChildListMenu: SEND,

  startDrag: SEND,
  endDrag: SEND,
  dragTo: SEND,
  drop: SEND,
};

export type UiAdapterConnection = AdapterConnection<
  UiAdapterInterface,
  typeof uiAdapterDescription
>;

export interface UiAdapterInterface
  extends CmsRetrieval,
    CopyObjHandler,
    BinaryHandler,
    ContentUpdateHandler,
    ObjStreamReplicationEndpoint {
  canEdit(workspaceId: string, objId: string): boolean;
  canWrite(workspaceId: string): boolean;
  getEditorAuthToken(options?: {
    treatLocalhostLike?: string;
  }): { token: string } | { error: string } | undefined;
  comparisonBase(): ObjSpaceId;
  comparisonRange(): ComparisonRange;
  setAppAdapter(adapterPort: MessagePort): void;
  showWidgetMenu(
    elementId: number,
    objId: string,
    widgetId: string,
    options?: { objSpaceId: ObjSpaceId }
  ): void;
  showWidgetlistMenu(
    elementId: number,
    relativePosition: Position,
    objId: string,
    attributeName: string,
    widgetId?: string
  ): void;
  showChildListMenu(elementId: number, objId: string): void;
  insertWidget(
    objId: string,
    widgetId: string,
    position: OptionMarkerPosition
  ): void;
  startDrag(objId: string, widgetId: string): void;
  endDrag(): void;
  finishReplicatingObj(objSpaceId: ObjSpaceId, objId: string): Promise<void>;
  getResolvedUrl(url: string): ResolvedUrl;
  navigateToExternalUrl(url: string): void;
  openInNewUiWindow(url: string): void;
  configureContentBrowser({ baseQuery }: { baseQuery: ObjSearchParams }): void;
  openContentBrowser(
    options: UiAdapterOpenContentBrowserOptions
  ): Promise<ContentBrowserResult>;
  configureTenant(configuration: TenantConfiguration): void;
  openCustomDialog(name: string): void;
  translate(key: string): string | undefined;
  dragTo(position: Position): void;
  drop(): void;
  currentEditor(): UserData;
  currentEditorTeams(): TeamData[];
  currentEditingContext(): { windowName?: string };
  currentWorkspace(): WorkspaceData;
  getUiContext(): UiContext;
  getUiLanguage(): Locale | null;
}

export interface TenantConfiguration {
  tenant: string;
  endpoint?: string;
}

export interface UiAdapterOpenContentBrowserOptions {
  selectionMode?: 'single' | 'multi';
  selection?: string[];
  validObjClasses?: readonly string[];
}

export type Locale = 'de' | 'en';
