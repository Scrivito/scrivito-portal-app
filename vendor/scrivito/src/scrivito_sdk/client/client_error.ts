import { ScrivitoError } from 'scrivito_sdk/common';

/** @public */
export class ClientError extends ScrivitoError {
  constructor(
    readonly message: string,
    readonly code: string | undefined,
    readonly details: object
  ) {
    super(message);
  }
}
