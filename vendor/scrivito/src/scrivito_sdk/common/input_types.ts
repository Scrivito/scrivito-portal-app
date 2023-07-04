import { tcomb as t } from 'scrivito_sdk/common';

export const BlobType = t.interface(
  {
    size: t.Number,
    type: t.String,
  },
  { name: 'Blob', strict: false }
);

export const FileType = BlobType.extend(
  {
    name: t.String,
  },
  { name: 'File', strict: false }
);
