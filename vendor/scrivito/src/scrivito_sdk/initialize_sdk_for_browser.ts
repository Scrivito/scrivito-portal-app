import { initializeAssetUrlBase } from 'scrivito_sdk/app_support/asset_url_base';
import * as CanonicalUrl from 'scrivito_sdk/app_support/canonical_url';
import { currentSiteId } from 'scrivito_sdk/app_support/current_page';
import { setNavigationStateProvider } from 'scrivito_sdk/app_support/current_page_data';
import { observeDocumentTitle } from 'scrivito_sdk/app_support/document_title';
import { initializeEditingContextFromBrowsingContext } from 'scrivito_sdk/app_support/editing_context';
import { establishUiConnection } from 'scrivito_sdk/app_support/establish_ui_connection';
import { htmlToTextForBrowser } from 'scrivito_sdk/app_support/extract_text/html_to_text_for_browser';
import { setHtmlToTextConverter } from 'scrivito_sdk/app_support/extract_text/remove_html_tags';
import { initialContentFor } from 'scrivito_sdk/app_support/initialize_content';
import { loadEditingSupport } from 'scrivito_sdk/app_support/load_editing_support';
import { getCurrentNavigationState } from 'scrivito_sdk/app_support/navigation_state';
import { setUiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { initializeUiRedirect } from 'scrivito_sdk/app_support/ui_redirect';
import {
  cmsRestApi,
  replaceCmsRetrieval,
  setupRegisterVerificator,
  useXmlHttpRequest,
} from 'scrivito_sdk/client';
import { setOriginProvider, windowLocationOrigin } from 'scrivito_sdk/common';
import {
  ObjBackendReplication,
  ObjStreamReplication,
  setContentUpdateHandler,
  setObjStreamReplicationEndpoint,
  useReplicationStrategy,
} from 'scrivito_sdk/data';
import {
  setUrlResolutionHandler,
  setupWriteMonitorNotification,
} from 'scrivito_sdk/link_resolution';
import { setBinaryHandler, setCopyObjHandler } from 'scrivito_sdk/models';
import { setCurrentSiteIdHandler } from 'scrivito_sdk/realm';
import { setInitialContentFor } from 'scrivito_sdk/realm/initial_content_registry';

export function initializeSdk() {
  setupRegisterVerificator();

  initializeAssetUrlBase();

  setOriginProvider(windowLocationOrigin);
  setCurrentSiteIdHandler(currentSiteId);
  setNavigationStateProvider(getCurrentNavigationState);
  setHtmlToTextConverter(htmlToTextForBrowser);
  useXmlHttpRequest(XMLHttpRequest);
  initializeUiRedirect();

  const parentWindow = window.parent;
  const insideIFrame = parentWindow !== window;
  const windowName = window.name;
  const insideUi =
    insideIFrame && initializeEditingContextFromBrowsingContext(windowName);

  if (!insideUi) {
    useReplicationStrategy(ObjBackendReplication);
  } else {
    const uiAdapterClient = establishUiConnection(parentWindow);

    setUiAdapter(uiAdapterClient);
    replaceCmsRetrieval(uiAdapterClient);
    cmsRestApi.rejectRequests();
    setBinaryHandler(uiAdapterClient);
    setCopyObjHandler(uiAdapterClient);
    setUrlResolutionHandler(
      (url) => uiAdapterClient.getResolvedUrl(url) || null
    );
    setupWriteMonitorNotification(() => undefined);
    setContentUpdateHandler(uiAdapterClient);
    setObjStreamReplicationEndpoint(uiAdapterClient);
    useReplicationStrategy(ObjStreamReplication);

    loadEditingSupport().then((editingSupport) => {
      editingSupport.installDndHandler();
      editingSupport.installScrollHandler();
      editingSupport.setModeIndicators();
      editingSupport.reloadIfContextChangesFrom(windowName);
    });
    observeDocumentTitle();

    setInitialContentFor(initialContentFor);
  }

  CanonicalUrl.init();
}
