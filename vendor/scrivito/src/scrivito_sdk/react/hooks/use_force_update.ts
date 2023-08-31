import * as React from 'react';

/**
 * Hook version of `component.forceUpdate()` or `this.forceUpdate()`.
 *
 * Example usage:
 * ```js
 * const forceUpdate = useForceUpdate();
 * ```
 *
 * You can tell React that the component needs re-rendering by calling `forceUpdate()`
 *
 * See https://reactjs.org/docs/react-component.html#forceupdate for more details.
 * */
export function useForceUpdate(): () => void {
  const [, setCounter] = React.useState(0);

  return () => setCounter((counter) => counter + 1);
}
