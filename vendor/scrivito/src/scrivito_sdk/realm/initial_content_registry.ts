import { AttributeValue } from 'scrivito_sdk/realm';

export type InitialContentForFn = (
  className: string,
  attributeName: string
) => AttributeValue | undefined;

let initialContentForFn: InitialContentForFn = () => undefined;

export function setInitialContentFor(value: InitialContentForFn): void {
  initialContentForFn = value;
}

export function initialContentFor(
  className: string,
  attributeName: string
): AttributeValue | undefined {
  return initialContentForFn(className, attributeName);
}
