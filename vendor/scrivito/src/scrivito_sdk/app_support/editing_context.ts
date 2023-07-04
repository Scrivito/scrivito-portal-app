import { setCurrentWorkspaceId } from 'scrivito_sdk/models';

let inPlaceEditingActive = false;
let comparisonActive = false;

/** tries to initialize the editing context from the window name
 *
 * returns true if an editing context was found and initialized
 */
export function initializeEditingContextFromBrowsingContext(
  browsingContextName: string
): boolean {
  const editingContext = editingContextFromBrowsingContext(browsingContextName);

  if (!editingContext.workspaceId) {
    setCurrentWorkspaceId('published');
    return false;
  }

  setCurrentWorkspaceId(editingContext.workspaceId);
  inPlaceEditingActive = !!editingContext.inPlaceEditingActive;
  comparisonActive = !inPlaceEditingActive && !!editingContext.comparisonActive;

  return true;
}

function editingContextFromBrowsingContext(
  browsingContextName: string
): EditingContext {
  const markerIndex = browsingContextName.indexOf(' _scrivito {');
  if (markerIndex === -1) return {};

  const { editing, comparison, workspaceId } = JSON.parse(
    browsingContextName.substring(markerIndex + 11)
  );

  return {
    workspaceId,
    inPlaceEditingActive: !!editing,
    comparisonActive: !!comparison,
  };
}

interface EditingContext {
  workspaceId?: string;
  inPlaceEditingActive?: boolean;
  comparisonActive?: boolean;
}

/** @public */
export function isInPlaceEditingActive(): boolean {
  return inPlaceEditingActive;
}

/** @public */
export function isComparisonActive(): boolean {
  return comparisonActive;
}

// For test purposes only
export function setIsInPlaceEditingActive(isActive: boolean) {
  inPlaceEditingActive = isActive;
}

// For test purposes only
export function setIsComparisonActive(isActive: boolean) {
  comparisonActive = isActive;
}

// For test purposes only
export function resetEditingContext(): void {
  inPlaceEditingActive = false;
  comparisonActive = false;
}
