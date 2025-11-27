import { AdapterClient, GET, SEND, STREAM } from 'scrivito_sdk/bridge';
import type { AppAdapter } from 'scrivito_sdk/ui_interface/app_adapter';

export type ForcedEditorLanguage = 'en' | 'de' | 'fr' | null;
export const FORCED_EDITOR_LANGUAGES: ForcedEditorLanguage[] = [
  'en',
  'de',
  'fr',
];

export const appAdapterDescription = {
  getAdapterSpec: GET,
  getCapabilities: GET,
  getCropAspectRatios: GET,
  getPreviewSizes: GET,
  descriptionForObj: GET,
  getClasses: GET,
  getContentBrowserConfiguration: GET,
  getHomepageId: GET,
  getSiteIdForObj: GET,
  titleForObj: GET,
  titleForWidget: GET,
  thumbnailForObj: GET,
  getAuthGroups: GET,
  getContentZoneData: GET,
  getCurrentAppLocation: GET,
  getCustomComponentDimensions: GET,
  getDocumentTitle: GET,
  getElementBoundaries: GET,
  getExtensionsUrl: GET,
  getMenuPatch: GET,
  getObjClassForContentTypeMapping: GET,
  getResolvedUrl: GET,
  getScrollPosition: GET,
  getValidationReport: GET,
  getUrlFor: GET,
  getForcedEditorLanguage: GET,
  generalPropertiesForObj: GET,
  generalPropertiesForWidget: GET,
  propertiesGroupsForObj: GET,
  propertiesGroupsForWidget: GET,
  getInitialContentDumpUrl: GET,
  hasLayoutComponents: GET,

  objReplicationMessageStream: STREAM,

  executeCustomCommand: SEND,
  initializeContentForObj: SEND,
  initializeContentForWidget: SEND,
  initializeCopy: SEND,
  initializeObjCopy: SEND,
  initializeWidgetCopy: SEND,
  navigateTo: SEND,
  scrollIntoView: SEND,
  scrollToTop: SEND,
  showCustomComponent: SEND,
  showWidgetContent: SEND,
  wantsAutoAttributeConversion: GET,
};

export type AppAdapterClient = AdapterClient<
  AppAdapter,
  typeof appAdapterDescription
>;
