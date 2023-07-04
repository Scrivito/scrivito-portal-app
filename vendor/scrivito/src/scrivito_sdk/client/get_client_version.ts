import { InternalError } from 'scrivito_sdk/common';

export function getClientVersion(): string {
  const clientVersion = process.env.SCRIVITO_CLIENT_VERSION;
  if (!clientVersion) throw new InternalError();

  return clientVersion;
}
