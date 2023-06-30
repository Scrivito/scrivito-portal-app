import { isElement, isFunction, isObject } from 'underscore';
import { Obj } from 'scrivito_sdk/realm';

export function prettyPrint(input: unknown): string {
  try {
    if (isFunction(input)) {
      return printFunction(input);
    }

    if (isObject(input)) {
      return printObject(input as {});
    }

    return printTruncated(input);
  } catch (_e) {
    return '';
  }
}

function printObject(object: {}): string {
  const basicContent = (object as Obj)._scrivitoPrivateContent;

  if (basicContent && isFunction(basicContent.toPrettyPrint)) {
    return basicContent.toPrettyPrint();
  }

  if (isElement(object)) {
    return `[object HTMLElement ${printTruncated(object.outerHTML)}]`;
  }

  return printTruncated(object);
}

interface FnWithSchema {
  _scrivitoPrivateSchema: { name: () => string };
}

interface ReactComponent {
  displayName?: string;
  name: string;
  prototype: { isReactComponent: boolean };
}

function printFunction(fn: {}): string {
  if (isFnWithSchema(fn)) {
    const schema = fn._scrivitoPrivateSchema;
    return `[class ${schema.name()}]`;
  }

  if (isReactComponent(fn)) {
    const name = fn.displayName || fn.name;
    return `[class React.Component "${name}"]`;
  }

  return truncate(fn.toString());
}

function isFnWithSchema(fn: {}): fn is FnWithSchema {
  return !!(fn as FnWithSchema)._scrivitoPrivateSchema;
}

function isReactComponent(fn: {}): fn is ReactComponent {
  const prototype = (fn as ReactComponent).prototype;
  return prototype && prototype.isReactComponent;
}

function printTruncated(input: unknown): string {
  const stringified = JSON.stringify(input);

  if (stringified) {
    return truncate(stringified);
  }

  return stringified;
}

function truncate(value: string): string {
  if (value.length > 100) {
    return `${value.slice(0, 100)}...`;
  }

  return value;
}
