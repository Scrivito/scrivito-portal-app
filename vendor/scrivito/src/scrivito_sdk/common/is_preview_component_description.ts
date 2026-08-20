import { isObject } from 'scrivito_sdk/common/is_object';

export interface PreviewComponentDescription {
  key: string;
  component: unknown;
  title?: string;
  description?: string;
}

export function isPreviewComponentDescription(
  maybeProperty: unknown,
): maybeProperty is PreviewComponentDescription {
  if (!isPlainObjectOrClassInstance(maybeProperty)) return false;

  const { component, key } = maybeProperty;

  return (
    typeof key === 'string' &&
    (component === null ||
      typeof component === 'string' ||
      typeof component === 'function' ||
      isObject(component))
  );
}

function isPlainObjectOrClassInstance(
  maybeObject: unknown,
): maybeObject is { [name: string]: unknown } {
  return (
    isObject(maybeObject) &&
    typeof maybeObject !== 'function' &&
    !Array.isArray(maybeObject)
  );
}
