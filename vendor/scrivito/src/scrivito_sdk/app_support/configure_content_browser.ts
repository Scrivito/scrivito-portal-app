import intersection from 'lodash-es/intersection';
import mapValues from 'lodash-es/mapValues';

import { absoluteUrl } from 'scrivito_sdk/app_support/absolute_url';
import { uiAdapter } from 'scrivito_sdk/app_support/ui_adapter';
import { uiAdapterCompatibleValue } from 'scrivito_sdk/app_support/ui_adapter_compatible_value';
import {
  ArgumentError,
  checkArgumentsFor,
  onReset,
  tcomb as t,
} from 'scrivito_sdk/common';
import { OPERATORS, ObjSearchType } from 'scrivito_sdk/models';
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
  configuration: Partial<Configuration>
): void;

/** @internal */
export function configureContentBrowser(
  configuration: Readonly<Partial<Configuration>>,
  ...excessArgs: never[]
): void {
  if (!uiAdapter) {
    return;
  }

  try {
    checkConfigure(configuration, ...excessArgs);
  } catch (e) {
    throw e instanceof Error
      ? new ArgumentError(removeUnionSubTypeIndexesFromKey(e.message))
      : e;
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

function removeUnionSubTypeIndexesFromKey(message: string): string {
  // key 'filters/0/xyz... becomes key 'filters/xyz...
  return message.replace(/key 'filters.\d/, "key 'filters");
}

const checkConfigure = (() => {
  if (process.env.NODE_ENV !== 'development') return () => {};

  const SearchFieldType = t.union([t.String, t.list(t.String)]);
  const SearchOperatorType = t.enums.of(
    intersection(OPERATORS, [
      'contains',
      'containsPrefix',
      'equals',
      'startsWith',
      'isGreaterThan',
      'isLessThan',
      'matches',
    ])
  );
  const SearchValueType = t.union(
    [
      t.String,
      t.Date,
      t.Nil,
      t.Number,
      t.list(t.union([t.String, t.Nil])),
      t.list(t.union([t.Date, t.Nil])),
      t.list(t.union([t.Number, t.Nil])),
    ],
    'SearchValue'
  );

  const FilterNodeType = t.interface({
    title: t.maybe(t.String),
  });
  const FilterCollectionNodeType = FilterNodeType.extend({
    field: t.maybe(SearchFieldType),
    operator: t.maybe(SearchOperatorType),
    expanded: t.maybe(t.Boolean),
  });

  const RadioOptionType = FilterNodeType.extend({
    value: t.maybe(SearchValueType),
    query: t.maybe(ObjSearchType),
    selected: t.maybe(t.Boolean),
  });
  const RadioFilterType = FilterCollectionNodeType.extend(
    {
      type: t.enums.of(['radioButton']),
      options: t.dict(t.String, RadioOptionType),
    },
    'RadioFilterDefinition'
  );

  const CheckboxOptionType = FilterNodeType.extend({
    value: t.maybe(SearchValueType),
    selected: t.maybe(t.Boolean),
  });
  const CheckboxFilterType = FilterCollectionNodeType.extend(
    {
      type: t.enums.of(['checkbox']),
      options: t.dict(t.String, CheckboxOptionType),
    },
    'CheckboxFilterDefinition'
  );

  const TreeFilterType = t.declare('TreeFilterDefinition');
  TreeFilterType.define(
    FilterNodeType.extend({
      type: t.maybe(t.enums.of(['tree'])),
      icon: t.maybe(t.String),
      query: t.maybe(ObjSearchType),
      expanded: t.maybe(t.Boolean),
      value: t.maybe(SearchValueType),
      field: t.maybe(SearchFieldType),
      operator: t.maybe(SearchOperatorType),
      selected: t.maybe(t.Boolean),
      options: t.maybe(t.dict(t.String, TreeFilterType)),
    })
  );

  const FilterDefinitionTypeMapping = {
    tree: TreeFilterType,
    radioButton: RadioFilterType,
    checkbox: CheckboxFilterType,
  };
  const FilterDefinitionType = t.union([
    FilterDefinitionTypeMapping.tree,
    FilterDefinitionTypeMapping.checkbox,
    FilterDefinitionTypeMapping.radioButton,
  ]);
  FilterDefinitionType.dispatch = (definition: {
    type?: 'tree' | 'radioButton' | 'checkbox';
  }) => FilterDefinitionTypeMapping[definition.type || 'tree'];

  const StaticFiltersType = t.dict(t.String, FilterDefinitionType);
  const DynamicOrStaticFiltersType = t.union([t.Function, StaticFiltersType]);
  DynamicOrStaticFiltersType.dispatch = (v: unknown) =>
    t.Function.is(v)
      ? DynamicOrStaticFiltersType.meta.types[0]
      : DynamicOrStaticFiltersType.meta.types[1];

  const BaseFilterType = t.interface({
    query: ObjSearchType,
  });

  const ConfigurationType = t.interface(
    {
      filters: t.maybe(DynamicOrStaticFiltersType),
      baseFilter: t.maybe(BaseFilterType),
    },
    'Configuration'
  );

  return checkArgumentsFor(
    'configureContentBrowser',
    [['configuration', ConfigurationType]],
    {
      docPermalink: 'js-sdk/configureContentBrowser',
    }
  );
})();

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
