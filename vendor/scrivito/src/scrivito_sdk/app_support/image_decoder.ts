import { promiseAndFinally } from 'scrivito_sdk/common';
import { decodeImage } from './decode_image';

export class ImageDecoder {
  private readonly decodedUrls: {
    [imageUrl: string]: string | undefined;
  } = {};

  private readonly loadingRegistry: {
    [imageUrl: string]: Promise<void> | undefined;
  } = {};

  private onUpdateCallback: () => void;
  private isOnUpdateCallbackActive: boolean = true;

  constructor(onUpdateCallback: () => void) {
    this.onUpdateCallback = onUpdateCallback;
  }

  getImage(imageUrl: string): string | undefined {
    const resultUrl = this.decodedUrls[imageUrl];
    if (!resultUrl) {
      this.ensureLoading(imageUrl);
    }
    return resultUrl;
  }

  cancelUpdateCallback(): void {
    this.isOnUpdateCallbackActive = false;
  }

  resumeUpdateCallback(): void {
    this.isOnUpdateCallbackActive = true;
  }

  private ensureLoading(imageUrl: string) {
    if (this.decodedUrls[imageUrl] || this.loadingRegistry[imageUrl]) return;

    const promise = decodeImage(imageUrl).then((url) => {
      this.decodedUrls[imageUrl] = url;
      this.isOnUpdateCallbackActive && this.onUpdateCallback();
    });

    this.loadingRegistry[imageUrl] = promiseAndFinally(
      promise,
      () => delete this.loadingRegistry[imageUrl]
    );
  }
}
