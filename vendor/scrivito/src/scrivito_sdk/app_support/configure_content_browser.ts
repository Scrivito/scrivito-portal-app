import mapValues from 'lodash-es/mapValues';

import { absoluteUrl } from 'scrivito_sdk/app_support/absolute_url';
import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { uiAdapterCompatibleValue } from 'scrivito_sdk/app_support/ui_adapter_compatible_value';
import { onReset } from 'scrivito_sdk/common';
import { ObjSearch } from 'scrivito_sdk/realm';
import {
  ContentBrowserFilterDefinition,
  ContentBrowserFilters,
} from 'scrivito_sdk/ui_interface';

export interface FilterContext {
  _validObjClasses?: string[];
}
type FilterBuilder = (c: FilterContext) => ContentBrowserFilters | undefined;

interface Configuration {
  filters: ContentBrowserFilters | FilterBuilder | undefined;
  baseFilter: {
    query?: ObjSearch;
  };
}

let filters: ContentBrowserFilters | undefined | undefined;
let filtersBuilder: FilterBuilder | undefined;

export function getContentBrowserConfiguration(
  validObjClasses?: string[]
): ContentBrowserFilterDefinition | undefined {
  if (filtersBuilder) {
    const context: FilterContext = {};
    if (validObjClasses) {
      context._validObjClasses = validObjClasses;
    }
    const dynamicFilters = filtersBuilder(context);
    if (dynamicFilters) {
      return { filters: copyWithAbsoluteUrls(dynamicFilters) };
    }
  } else if (filters) {
    return { filters };
  }
}

/** @public */
export function configureContentBrowser(
  configuration: Readonly<Partial<Configuration>>
): void {
  if (!uiAdapter) {
    return;
  }

  if (configuration.filters) {
    if (isFilterBuilder(configuration.filters)) {
      filtersBuilder = configuration.filters;
      filters = undefined;
    } else {
      filters = copyWithAbsoluteUrls(configuration.filters);
      filtersBuilder = undefined;
    }
  }

  const baseFilter = configuration.baseFilter;
  if (baseFilter) {
    const baseQuery = baseFilter.query;
    if (baseQuery) {
      uiAdapter.configureContentBrowser(
        uiAdapterCompatibleValue({ baseQuery })
      );
    }
  }
}

function isFilterBuilder(
  maybeFilterBuilder: ContentBrowserFilters | FilterBuilder | undefined
): maybeFilterBuilder is FilterBuilder {
  return typeof maybeFilterBuilder === 'function';
}

function copyWithAbsoluteUrls(
  contentBrowserFilters: ContentBrowserFilters | undefined
): typeof contentBrowserFilters {
  return mapValues(contentBrowserFilters, ({ ...item }) => {
    const { icon, options } = item;
    const hasCustomIcon = icon && !icon.match(/^\w+$/);

    if (icon) item.icon = hasCustomIcon ? absoluteUrl(icon) : icon;
    if (options) item.options = copyWithAbsoluteUrls(options);

    return item;
  });
}

onReset(() => {
  filters = undefined;
  filtersBuilder = undefined;
});
