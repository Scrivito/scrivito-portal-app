import { basicUrlForObj } from 'scrivito_sdk/app_support/basic_url_for';
import { QueryParameters, parameterizeDataClass } from 'scrivito_sdk/common';
import { DataItem } from 'scrivito_sdk/data_integration/data_class';
import { BasicObj, getDetailsPageForDataParam } from 'scrivito_sdk/models';

export function getDetailsPageUrl(
  dataItem: DataItem,
  siteId: string | null
): string | null {
  const detailsPageAndQuery = getDetailsPageAndQuery(dataItem, siteId);
  if (!detailsPageAndQuery) return null;

  const { detailsPage, queryString } = detailsPageAndQuery;
  return basicUrlForObj(detailsPage, { query: queryString });
}

interface DetailsPageAndQuery {
  detailsPage: BasicObj;
  queryParameters: QueryParameters;
  queryString: string;
}

export function getDetailsPageAndQuery(
  dataItem: DataItem,
  siteId: string | null
): DetailsPageAndQuery | null {
  const dataClassName = dataItem.dataClassName();
  const detailsPage = getDetailsPageForDataParam(dataClassName, siteId);

  if (!detailsPage) return null;

  const paramName = parameterizeDataClass(dataClassName);
  const paramValue = dataItem.id();
  const queryParameters = { [paramName]: paramValue };
  const queryString = [paramName, paramValue].join('=');

  return { detailsPage, queryParameters, queryString };
}
