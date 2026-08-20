let disabled = false;

export function isObjReplicationDisabled(): boolean {
  return disabled;
}

export function disableObjReplication(): void {
  disabled = true;
}

// For test purpose only.
export function enableObjReplication(): void {
  disabled = false;
}
