import { appUrlForRedirectToCloudUi } from 'scrivito_sdk/app_support/app_url_for_redirect_to_cloud_ui';
import {
  Configuration,
  getConfiguration,
} from 'scrivito_sdk/app_support/configure';
import { forceNavigationStateNotResponsible } from 'scrivito_sdk/app_support/navigation_state';
import { assignLocationCloudUi } from 'scrivito_sdk/app_support/redirect_to_cloud_ui';

export async function initializeUiRedirect(): Promise<void> {
  const configuration = await getConfiguration();
  handleAdoptUi(configuration);
}

function handleAdoptUi(configuration: Configuration) {
  const { tenant, adoptUi } = configuration;

  if (adoptUi) {
    const appUrlForUi = appUrlForRedirectToCloudUi();
    if (appUrlForUi) {
      const cloudUiUrl =
        adoptUi === true ? 'https://edit.scrivito.com' : adoptUi;
      assignLocationCloudUi(cloudUiUrl, tenant, appUrlForUi);
      forceNavigationStateNotResponsible();
    }
  }
}
