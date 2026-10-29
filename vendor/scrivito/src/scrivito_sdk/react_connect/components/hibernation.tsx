import { type ReactNode, useContext, useEffect, useRef, useState } from 'react';

import { BehaviorSubject } from 'scrivito_sdk/common';
import { ReactConnectContext } from 'scrivito_sdk/react_connect/connect';

export const Hibernation = ({
  awake,
  children,
}: {
  awake: boolean;
  children: ReactNode;
}) => {
  const [isParentAwake, setParentAwake] = useState(true);

  const context = useContext(ReactConnectContext);
  const parentAwakeness = context.awakeness;

  useEffect(() => {
    const subscription = parentAwakeness?.subscribe(setParentAwake);

    return () => subscription?.unsubscribe();
  }, [parentAwakeness]);

  const awakenessRef = useRef<BehaviorSubject<boolean> | undefined>(undefined);

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
