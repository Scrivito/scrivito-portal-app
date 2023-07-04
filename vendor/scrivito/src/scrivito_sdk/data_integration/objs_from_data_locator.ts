import { applyDataLocator } from 'scrivito_sdk/data_integration/apply_data_locator';
import { DataLocator } from 'scrivito_sdk/data_integration/data_locator';
import { emptyScope } from 'scrivito_sdk/models';
import { ObjSearch } from 'scrivito_sdk/realm';

/** @public */
export function objsFromDataLocator(dataLocator: DataLocator): ObjSearch {
  if (dataLocator.class()) {
    const objSearch = applyDataLocator([], dataLocator).objSearch();
    if (objSearch) return objSearch;
  }

  return new ObjSearch(emptyScope().search());
}
