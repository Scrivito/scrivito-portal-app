import * as tcomb from 'tcomb-validation';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
(tcomb.struct as any).strict = true;

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
(tcomb.interface as any).strict = true;

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
(tcomb as any).fail = (message: string): void => {
  // original displays `[tcomb] ${message}`
  throw new TypeError(message);
};

export { tcomb };
