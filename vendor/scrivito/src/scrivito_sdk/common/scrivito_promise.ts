// Scrivito uses the browser's native `Promise` implementation by default.
export let ScrivitoPromise: typeof Promise = Promise;

// The promise implementation can be switched for unit testing purposes,
export function setScrivitoPromise(PromiseClass: typeof Promise) {
  ScrivitoPromise = PromiseClass;
}
