import * as React from 'react';

import { NavigationState } from 'scrivito_sdk/app_support/navigation_state';
import { notifyScrollWindow } from 'scrivito_sdk/react/scroll_window';

export function PageScroll({
  navigationState,
}: {
  navigationState: NavigationState;
}) {
  React.useEffect(() => {
    notifyScrollWindow(navigationState);
  });

  return null;
}
