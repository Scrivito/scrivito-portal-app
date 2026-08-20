import { RequestFailedError } from 'scrivito_sdk/client';

export function parseOrThrowRequestFailedError(jsonText: string): unknown {
  try {
    return JSON.parse(jsonText);
  } catch {
    throw new RequestFailedError(jsonText);
  }
}
