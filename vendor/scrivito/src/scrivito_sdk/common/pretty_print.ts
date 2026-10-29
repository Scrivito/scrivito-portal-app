import { isObject } from 'scrivito_sdk/common';
import { Obj } from 'scrivito_sdk/realm';

export function prettyPrint(input: unknown): string {
  try {
    if (typeof input === 'function') {
      return printFunction(input);
    }

    if (isObject(input)) {
      return printObject(input);
    }

    return printTruncated(input);
  } catch {
    return '';
  }
}

function printObject(object: object): string {
  const basicContent = (object as Obj)._scrivitoPrivateContent;

  if (basicContent && typeof basicContent.toPrettyPrint === 'function') {
    return basicContent.toPrettyPrint();
  }

  if ('outerHTML' in object) {
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

function printFunction(fn: object): string {
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

function isFnWithSchema(fn: object): fn is FnWithSchema {
  return !!(fn as FnWithSchema)._scrivitoPrivateSchema;
}

function isReactComponent(fn: object): fn is ReactComponent {
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
