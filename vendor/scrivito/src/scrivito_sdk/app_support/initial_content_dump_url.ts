import { ArgumentError } from 'scrivito_sdk/common';
import { createStateContainer } from 'scrivito_sdk/state';

const initialContentDumpUrl = createStateContainer<string>();

export function setInitialContentDumpUrl(url: string): void {
  try {
    new URL(url);
  } catch {
    throw new ArgumentError(
      "'initialContentDumpUrl' must be an absolute URL with protocol"
    );
  }

  initialContentDumpUrl.set(url);
}

export function getInitialContentDumpUrl(): string | undefined {
  return initialContentDumpUrl.get();
}
