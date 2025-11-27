import { ScrivitoError } from 'scrivito_sdk/common';

export class RequestFailedError extends ScrivitoError {
  constructor(
    message: string,
    readonly requestDetails?: Record<string, unknown>
  ) {
    super(message);
  }
}
