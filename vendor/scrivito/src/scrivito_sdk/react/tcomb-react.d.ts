declare module 'tcomb-react' {
  import * as React from 'react';
  import { Type } from 'tcomb';

  interface AnyPropDefinitionType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: Type<any>;
  }

  export function propTypes<Props>(
    inputType: AnyPropDefinitionType,
    options: { strict: false }
  ): React.ValidationMap<Props>;
}
