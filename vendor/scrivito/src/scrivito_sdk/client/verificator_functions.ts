// @rewire
import { Deferred, loadJs, onReset } from 'scrivito_sdk/common';

export type VerificationForChallenge = (
  data: unknown,
  capture: VerificationCapture
) => void;

export interface Verification {
  authorization: string;
  expiresAfter: Date;
}

export interface Verificator {
  id: string;
  url: string;
}

type VerificationCapture = (computedVerification: Verification) => void;

let registry: {
  [key: string]: Deferred<VerificationForChallenge>;
} = {};

export function fetch(
  verificatorId: string,
  verificatorUrl: string
): Promise<VerificationForChallenge> {
  let deferred = registry[verificatorId];

  if (!deferred) {
    deferred = new Deferred();
    registry[verificatorId] = deferred;

    loadJs(verificatorUrl);
  }

  return deferred.promise;
}

export function setupRegisterVerificator() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any)._scrivitoRegisterVerificator = (
    verificatorId: string,
    verificatorFunction: VerificationForChallenge
  ) => registry[verificatorId].resolve(verificatorFunction);
}

onReset(() => (registry = {}));
