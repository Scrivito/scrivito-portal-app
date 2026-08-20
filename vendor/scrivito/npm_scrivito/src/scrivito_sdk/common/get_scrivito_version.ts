// @rewire
import { InternalError } from 'scrivito_sdk/common';

export function getScrivitoVersion(): string {
  const version = process.env.SCRIVITO_VERSION;

  if (!version) {
    // version info missing
    throw new InternalError();
  }

  return version;
}
