import {
  ContextContainer,
  devicePixelRatio,
  screen,
} from 'scrivito_sdk/common';
import { Binary } from 'scrivito_sdk/models';

const prerenderContext = new ContextContainer();
const prerenderWidth = 128;

export function usePrerenderScaling<T>(fn: () => T): T {
  return prerenderContext.runWith(true, fn);
}

export interface ScaledImageUrl {
  initialUrl: string;
  highResUrlToDecode?: string;
}

export function isInitialUrlAvailable(binary: Binary): boolean {
  if (binary.isRaw() || binary.isExplicitlyTransformed()) {
    return !!binary.urlWithoutPlaceholder();
  }

  return !!optimizeForPrerender(binary).urlWithoutPlaceholder();
}

export function scaleDownBinary(binary: Binary): ScaledImageUrl {
  if (binary.isRaw() || binary.isExplicitlyTransformed()) {
    return { initialUrl: binary.url() };
  }

  const initialUrl = optimizeForPrerender(binary).url();
  if (prerenderContext.current()) {
    return { initialUrl };
  }

  const highResUrlToDecode = optimizeForScreen(binary).urlWithoutPlaceholder();
  if (!highResUrlToDecode || initialUrl === highResUrlToDecode) {
    return { initialUrl };
  }

  return { initialUrl, highResUrlToDecode };
}

function optimizeForPrerender(binary: Binary) {
  return binary.optimizeFor({ width: prerenderWidth });
}

function optimizeForScreen(binary: Binary): Binary {
  // In not fully known circumstances `screen().width` could return `0`, which would produce an invalid transformation.
  const width = Math.max(screen().width * devicePixelRatio(), prerenderWidth);

  // The binary service never scales up, so we transform all images, regardless of their width.
  return binary.optimizeFor({ width });
}
