import { currentLanguage } from 'scrivito_sdk/app_support/current_language';
import { currentSiteId } from 'scrivito_sdk/app_support/current_page';
import { setHtmlToTextConverter } from 'scrivito_sdk/app_support/extract_text/remove_html_tags';
import { setHasComponentHandler } from 'scrivito_sdk/app_support/has_component';
import { initialContentFor } from 'scrivito_sdk/app_support/initialize_content';
import { setNodeAdapter } from 'scrivito_sdk/app_support/node_adapter';
import { useDefaultPriority } from 'scrivito_sdk/client';
import { setOriginProvider } from 'scrivito_sdk/common';
import {
  ObjBackendReplication,
  useReplicationStrategy,
} from 'scrivito_sdk/data';
import { setCurrentLanguageHandler } from 'scrivito_sdk/data_integration';
import { htmlToTextForNode } from 'scrivito_sdk/node_support/html_to_text_for_node';
import { nodeAdapter } from 'scrivito_sdk/node_support/node_adapter';
import { hasComponent } from 'scrivito_sdk/react/has_component';
import { setCurrentSiteIdHandler } from 'scrivito_sdk/realm';
import { setInitialContentFor } from 'scrivito_sdk/realm/initial_content_registry';

export function initializeSdk() {
  setOriginProvider(() => undefined);
  setCurrentSiteIdHandler(currentSiteId);
  useReplicationStrategy(ObjBackendReplication);
  setHtmlToTextConverter(htmlToTextForNode);
  useDefaultPriority('background');
  setInitialContentFor(initialContentFor);
  setNodeAdapter(nodeAdapter);
  setHasComponentHandler(hasComponent);
  setCurrentLanguageHandler(currentLanguage);
}
