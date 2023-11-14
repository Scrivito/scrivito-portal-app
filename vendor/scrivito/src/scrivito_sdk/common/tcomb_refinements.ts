import { tcomb as t } from 'scrivito_sdk/common';

export const PositiveInteger = t.refinement(
  t.Integer,
  (i) => i > 0,
  'PositiveInteger'
);

export const NonNegativeInteger = t.refinement(
  t.Integer,
  (i) => i >= 0,
  'NonNegativeInteger'
);
