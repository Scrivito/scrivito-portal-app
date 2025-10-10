import { currentSiteId } from 'scrivito_sdk/app_support/current_page';
import { getDetailsPageUrl } from 'scrivito_sdk/app_support/get_details_page_url';
import { hasComponent } from 'scrivito_sdk/app_support/has_component';
import { urlFor } from 'scrivito_sdk/app_support/url_for';
import { assertNotUsingInMemoryTenant } from 'scrivito_sdk/data';
import { DataItem } from 'scrivito_sdk/data_integration/data_class';

/** @public */
export function urlForDataItem(dataItem: DataItem): string | null {
  assertNotUsingInMemoryTenant('Scrivito.urlForDataItem');

  const obj = dataItem.obj();
  const siteId = currentSiteId();

  if (obj) {
    if (hasComponent(dataItem.dataClassName()) || obj.isBinary()) {
      return urlFor(obj);
    }
    return getDetailsPageUrl(dataItem, obj.siteId() || siteId);
  }

  return siteId ? getDetailsPageUrl(dataItem, siteId) : null;
}
