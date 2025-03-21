import { basicUrlForObj } from 'scrivito_sdk/app_support/basic_url_for';
import { parameterizeDataClass } from 'scrivito_sdk/common';
import { DataItem } from 'scrivito_sdk/data_integration/data_class';
import { BasicObj, getDetailsPageForDataParam } from 'scrivito_sdk/models';

export function getDetailsPageUrl(
  dataItem: DataItem,
  siteId: string | null
): string | null {
  const detailsPageAndQuery = getDetailsPageAndQuery(dataItem, siteId);
  if (!detailsPageAndQuery) return null;

  const { detailsPage, query } = detailsPageAndQuery;
  return basicUrlForObj(detailsPage, { query });
}

interface DetailsPageAndQuery {
  detailsPage: BasicObj;
  query: string;
}

export function getDetailsPageAndQuery(
  dataItem: DataItem,
  siteId: string | null
): DetailsPageAndQuery | null {
  const dataClassName = dataItem.dataClassName();
  const detailsPage = getDetailsPageForDataParam(dataClassName, siteId);

  if (!detailsPage) return null;

  const query = `${parameterizeDataClass(dataClassName)}=${dataItem.id()}`;
  return { detailsPage, query };
}
