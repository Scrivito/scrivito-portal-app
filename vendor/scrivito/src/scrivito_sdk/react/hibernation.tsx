import * as React from 'react';

import { BehaviorSubject } from 'scrivito_sdk/common';
import { ReactConnectContext } from 'scrivito_sdk/react/connect';

export const Hibernation = ({
  awake,
  children,
}: {
  awake: boolean;
  children: React.ReactNode;
}) => {
  const [isParentAwake, setParentAwake] = React.useState(true);

  const context = React.useContext(ReactConnectContext);
  const parentAwakeness = context.awakeness;

  React.useEffect(() => {
    const subscription = parentAwakeness?.subscribe(setParentAwake);

    return () => subscription?.unsubscribe();
  }, [parentAwakeness]);

  const awakenessRef = React.useRef<BehaviorSubject<boolean>>();

  if (awakenessRef.current === undefined && !awake) return null;

  awakenessRef.current ||= new BehaviorSubject(true);
  awakenessRef.current.next(awake && isParentAwake);

  return (
    <ReactConnectContext.Provider
      value={{ ...context, awakeness: awakenessRef.current }}
    >
      {children}
    </ReactConnectContext.Provider>
  );
};
