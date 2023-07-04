import {
  AuthorizationProvider,
  RawResponse,
  RequestFailedError,
} from 'scrivito_sdk/client';
import { parseErrorResponse } from 'scrivito_sdk/client/parse_error_response';
import {
  Verification,
  VerificationForChallenge,
  Verificator,
  fetch as fetchVerificatorFunction,
} from 'scrivito_sdk/client/verificator_functions';
import { ScrivitoPromise, promiseAndFinally } from 'scrivito_sdk/common';

export const ERROR_CODE_CLIENT_VERIFICATION_REQUIRED =
  'client_verification_required';

export interface Challenge {
  verificator: Verificator;
  data: unknown;
}

interface CurrentComputation {
  challenge: Challenge;
  promise: Promise<Verification>;
}

let computation: CurrentComputation | undefined;
let verification: Verification | undefined;

export const PublicAuthentication: AuthorizationProvider = {
  async authorize(
    request: (authorization: string | undefined) => Promise<RawResponse>
  ): Promise<RawResponse> {
    const response = await request(currentAuthorization());

    if (response.httpStatus === 401) {
      const { details, code } = parseErrorResponse(response.responseText);

      if (code === ERROR_CODE_CLIENT_VERIFICATION_REQUIRED) {
        if (!isChallenge(details)) throw new RequestFailedError();
        verification = await computeVerification(details);
        return this.authorize(request);
      }
    }

    return response;
  },

  // integration test support
  currentState(): string | null {
    const authorization = currentAuthorization();
    if (authorization) {
      return `Authorization: ${authorization}`;
    }

    if (computation) {
      const challenge = computation.challenge;
      return `Pending computation: ${challenge.verificator.id} with ${challenge.data}`;
    }

    return null;
  },
};

async function computeVerification(
  challenge: Challenge
): Promise<Verification> {
  if (!computation) {
    // note that further request's challenges are ignored (intentionally)
    const { verificator, data } = challenge;
    const promise = fetchVerificatorFunction(
      verificator.id,
      verificator.url
    ).then(
      (compute: VerificationForChallenge) =>
        new ScrivitoPromise<Verification>((resolve) => {
          compute(data, (result: Verification) => resolve(result));
        })
    );

    computation = {
      challenge: { verificator, data },
      promise: promiseAndFinally<Verification>(promise, () => {
        computation = undefined;
      }),
    };
  }
  return computation.promise;
}

export function resetPublicAuthentication(): void {
  computation = undefined;
  verification = undefined;
}

function isChallenge(maybeChallenge: Object): maybeChallenge is Challenge {
  return !!(maybeChallenge as Challenge).verificator;
}

function currentAuthorization(): string | undefined {
  if (!verification) return;

  if (verification.expiresAfter < new Date()) {
    verification = undefined;
    return;
  }
  return verification.authorization;
}
