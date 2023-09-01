export interface RawResponse {
  httpStatus: number;
  responseText: string;

  retryAfterHeader?: string;
}
