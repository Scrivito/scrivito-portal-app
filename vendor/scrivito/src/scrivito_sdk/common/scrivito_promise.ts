import PromisePolyfill from 'promise-polyfill';

// Scrivito uses the browser's native `Promise` implementation by default (or a polyfill).
export let ScrivitoPromise: typeof Promise;

if (typeof Promise !== 'undefined') {
  ScrivitoPromise = Promise;
} else {
  ScrivitoPromise = PromisePolyfill;
}

// The promise implementation can be switched for unit testing purposes,
export function setScrivitoPromise(PromiseClass: typeof Promise) {
  ScrivitoPromise = PromiseClass;
}
