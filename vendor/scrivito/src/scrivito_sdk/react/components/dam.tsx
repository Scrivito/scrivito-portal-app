import { type ReactElement } from 'react';

import { DamFrame } from 'scrivito_sdk/react/components/dam_frame';

/** @beta */
export interface DamProps {
  unstable_appUrl?: string;
}

/** @beta */
export function Dam({ unstable_appUrl: appUrl }: DamProps): ReactElement {
  return <DamFrame screen="browseContent" appUrl={appUrl} />;
}
