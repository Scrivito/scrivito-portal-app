import { decodeBackgroundImage } from 'scrivito_sdk/app_support/decode_background_image';
import { promiseAndFinally } from 'scrivito_sdk/common';

export class BackgroundImageDecoder {
  private decodedUrls: {
    [imageUrl: string]: string | undefined;
  } = {};

  private readonly loadingRegistry: {
    [imageUrl: string]: Promise<void> | undefined;
  } = {};

  private clears: Array<() => void> = [];
  private onUpdateCallback: () => void;
  private isOnUpdateCallbackActive: boolean = true;

  constructor(onUpdateCallback: () => void) {
    this.onUpdateCallback = onUpdateCallback;
  }

  getBackgroundImage(imageUrl: string): string | undefined {
    const resultUrl = this.decodedUrls[imageUrl];
    if (!resultUrl) {
      this.ensureLoading(imageUrl);
    }
    return resultUrl;
  }

  clear(): void {
    this.clears.forEach((clear) => clear());
    this.clears = [];
    this.decodedUrls = {};
    this.isOnUpdateCallbackActive = false;
  }

  resumeUpdateCallback(): void {
    this.isOnUpdateCallbackActive = true;
  }

  private ensureLoading(imageUrl: string) {
    if (this.decodedUrls[imageUrl] || this.loadingRegistry[imageUrl]) return;

    const promise = (async () => {
      const { decodedBackgroundUrl, clear } = await decodeBackgroundImage(
        imageUrl
      );

      if (this.isOnUpdateCallbackActive) {
        if (clear) this.clears.push(clear);
        this.decodedUrls[imageUrl] = decodedBackgroundUrl;
        this.onUpdateCallback();
      } else {
        if (clear) clear();
        this.decodedUrls[imageUrl] = undefined;
      }
    })();

    this.loadingRegistry[imageUrl] = promiseAndFinally(
      promise,
      () => delete this.loadingRegistry[imageUrl]
    );
  }
}
