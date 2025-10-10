import { ScrivitoError } from 'scrivito_sdk/common';

/**
 * A `NotLoadedError` is a legacy technique, only still used by the Scrivito UI.
 * It is thrown when data is accessed in a synchronous fashion but is not yet
 * available locally.
 */
export class NotLoadedError extends ScrivitoError {
  constructor() {
    super('Data is not yet loaded.');
  }
}
