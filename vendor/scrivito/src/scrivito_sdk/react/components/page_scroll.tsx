import * as React from 'react';

import { NavigationState } from 'scrivito_sdk/app_support/navigation_state';
import { notifyScrollWindow } from 'scrivito_sdk/react/scroll_window';

interface PageScrollProps {
  navigationState: NavigationState;
}

export class PageScroll extends React.Component<PageScrollProps> {
  componentDidMount() {
    this.notifyScrollWindow();
  }

  componentDidUpdate() {
    this.notifyScrollWindow();
  }

  render() {
    return null;
  }

  private notifyScrollWindow() {
    notifyScrollWindow(this.props.navigationState);
  }
}
