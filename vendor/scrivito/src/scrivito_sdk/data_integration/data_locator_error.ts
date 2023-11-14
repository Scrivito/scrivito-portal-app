import { ArgumentError } from 'scrivito_sdk/common';

/** @beta */
export class DataLocatorError extends ArgumentError {
  constructor(message: string) {
    super(message);
  }
}
