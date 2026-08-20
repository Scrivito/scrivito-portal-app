import { getCurrentPageData } from 'scrivito_sdk/app_support/current_page_data';
import { isInPlaceEditingActive } from 'scrivito_sdk/app_support/editing_context';
import { useInPlaceEditing } from 'scrivito_sdk/react/hooks/use_in_place_editing';

/** @public */
export function useIsInPlaceEditingActive(): boolean {
  const inPlaceEditingEnabled = useInPlaceEditing(
    getCurrentPageData()?.currentPage ?? null,
  );

  return isInPlaceEditingActive() && inPlaceEditingEnabled;
}
