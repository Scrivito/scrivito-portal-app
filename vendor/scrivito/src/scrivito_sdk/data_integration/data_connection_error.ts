import { ScrivitoError } from 'scrivito_sdk/common';

/** @public */
export class DataConnectionError extends ScrivitoError {
  constructor(readonly message: string) {
    super(message);
  }
}
