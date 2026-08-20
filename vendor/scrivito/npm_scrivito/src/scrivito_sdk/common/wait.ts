// @rewire
import { setTimeout } from 'scrivito_sdk/common';

export function wait(seconds: number): Promise<void> {
  return waitMs(seconds * 1000);
}

export function waitMs(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
