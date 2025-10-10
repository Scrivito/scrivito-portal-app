import { ScrivitoError } from 'scrivito_sdk/common';

export interface ClientErrorRequestDetails {
  url?: string;
  method?: string;
}

/** @public */
export class ClientError extends ScrivitoError {
  constructor(
    readonly message: string,
    readonly code: string | undefined,
    readonly details: object,
    readonly httpStatus?: number,
    readonly requestDetails: ClientErrorRequestDetails = {}
  ) {
    super(message);
  }
}
