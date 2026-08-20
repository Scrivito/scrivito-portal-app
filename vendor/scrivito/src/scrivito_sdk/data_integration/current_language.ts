import { InternalError } from 'scrivito_sdk/common';

type CurrentLanguageHandler = () => string | null;

let currentLanguageHandler: CurrentLanguageHandler | undefined;

export function currentLanguage(): string | null {
  if (!currentLanguageHandler) {
    throw new InternalError();
  }

  return currentLanguageHandler();
}

export function setCurrentLanguageHandler(func: CurrentLanguageHandler) {
  currentLanguageHandler = func;
}
