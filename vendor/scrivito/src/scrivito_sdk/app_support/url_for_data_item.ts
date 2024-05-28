import { basicUrlForObj } from 'scrivito_sdk/app_support/basic_url_for';
import { currentSiteId } from 'scrivito_sdk/app_support/current_page';
import { parameterizeDataClass } from 'scrivito_sdk/common';
import { assertNotUsingInMemoryTenant } from 'scrivito_sdk/data';
import { DataItem } from 'scrivito_sdk/data_integration/data_class';
import { getDetailsPageForDataParam } from 'scrivito_sdk/models';

/** @public */
export function urlForDataItem(dataItem: DataItem): string | null {
  assertNotUsingInMemoryTenant('Scrivito.urlForDataItem');

  const obj = dataItem.obj();

  if (obj) {
    return getDetailsPageUrl(dataItem, obj.siteId() || currentSiteId());
  }

  const siteId = currentSiteId();
  return siteId ? getDetailsPageUrl(dataItem, siteId) : null;
}

function getDetailsPageUrl(dataItem: DataItem, siteId: string | null) {
  const dataClassName = dataItem.dataClassName();
  const detailsPage = getDetailsPageForDataParam(dataClassName, siteId);

  if (!detailsPage) return null;

  const query = `${parameterizeDataClass(dataClassName)}=${dataItem.id()}`;
  return basicUrlForObj(detailsPage, { query });
}
