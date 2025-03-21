import * as React from 'react';

export const CurrentEditableAreaContext = React.createContext<
  'outermostLayout' | 'parentPageLayout' | 'currentPageLayout' | 'currentPage'
>('outermostLayout');
