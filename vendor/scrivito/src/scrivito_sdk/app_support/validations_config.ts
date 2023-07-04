import { getConstraintsValidationCallback } from 'scrivito_sdk/app_support/constraints_validation_callback';
import { tcomb as t } from 'scrivito_sdk/common';
import { ValidationSeverityLevel } from 'scrivito_sdk/editing_support';
import { AttributeValue, Obj, Widget } from 'scrivito_sdk/realm';

export const VALIDATION_SEVERITY_LEVELS: ValidationSeverityLevel[] = [
  'error',
  'warning',
  'info',
];

export type ValidationsConfig<T extends Obj | Widget> = ReadonlyArray<
  ContentValidationCallback<T> | AttributeValidations<T>
>;

const ConstraintsConfig = t.interface({
  severity: t.maybe(t.enums.of(VALIDATION_SEVERITY_LEVELS)),
});

const ConstraintsWithConfig = t.tuple([ConstraintsConfig, t.Object]);

export const ValidationsConfigType = t.list(
  t.union([
    t.Function,
    t.list(t.union([t.String, t.Function, t.Object, ConstraintsWithConfig])),
  ])
);

export type ContentValidationCallback<T extends Obj | Widget> = (
  content: T
) => ValidationResult;

type AttributeValidationName = string;

type AttributeValidationConstraints =
  | object
  | AttributeValidationConstraintsWithOptions;

interface AttributeValidationOptions {
  severity?: ValidationSeverityLevel;
}

type AttributeValidationConstraintsWithOptions = [
  AttributeValidationOptions,
  object
];

export type AttributeValidations<T extends Obj | Widget> = readonly [
  AttributeValidationName,
  ...Array<AttributeValidationConstraints | AttributeValidationCallback<T>>
];

export function getValidationCallback(
  callbackOrConstraints:
    | AttributeValidationCallback<Obj | Widget>
    | AttributeValidationConstraints
): AttributeValidationCallback<Obj | Widget> {
  if (isAttributeValidationCallback(callbackOrConstraints)) {
    return callbackOrConstraints;
  }

  const constraints = isAttributeValidationConstraintsWithOptions(
    callbackOrConstraints
  )
    ? callbackOrConstraints[1]
    : callbackOrConstraints;
  return getConstraintsValidationCallback()(constraints);
}

export function isContentValidationCallback(
  maybeContentValidationCallback:
    | ContentValidationCallback<Obj | Widget>
    | AttributeValidations<Obj | Widget>
): maybeContentValidationCallback is ContentValidationCallback<Obj | Widget> {
  return typeof maybeContentValidationCallback === 'function';
}

export function isAttributeValidationCallback(
  maybeAttributeValidationCallback:
    | AttributeValidationCallback<Obj | Widget>
    | AttributeValidationConstraints
): maybeAttributeValidationCallback is AttributeValidationCallback<
  Obj | Widget
> {
  return typeof maybeAttributeValidationCallback === 'function';
}

export function isAttributeValidationConstraintsWithOptions(
  candidate:
    | AttributeValidationCallback<Obj | Widget>
    | AttributeValidationConstraints
    | object[]
): candidate is AttributeValidationConstraintsWithOptions {
  if (!Array.isArray(candidate)) return false;

  const [maybeOptions, maybeConstraints] = candidate;
  if (!isAttributeValidationOptions(maybeOptions)) return false;

  return !!maybeConstraints && typeof maybeConstraints === 'object';
}

function isAttributeValidationOptions(
  maybeAttributeValidationOptions: AttributeValidationOptions | object
): maybeAttributeValidationOptions is AttributeValidationOptions {
  if (!maybeAttributeValidationOptions) return false;
  if (typeof maybeAttributeValidationOptions !== 'object') return false;

  const maybeSeverity = (
    maybeAttributeValidationOptions as AttributeValidationOptions
  ).severity;
  if (!maybeSeverity) return true;

  return VALIDATION_SEVERITY_LEVELS.indexOf(maybeSeverity) !== -1;
}

export type ValidationResult =
  | string
  | string[]
  | ValidationResultObject
  | false
  | null
  | undefined;

export interface ValidationResultObject {
  message: string;
  severity?: ValidationSeverityLevel;
}

export type AttributeValidationCallback<T extends Obj | Widget> = (
  attributeValue: AttributeValue,
  options: {
    name: string;
    obj: T extends Obj ? T : never;
    widget: T extends Widget ? T : never;
    content: T;
  }
) => ValidationResult;
