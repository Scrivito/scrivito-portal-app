import { type ReactElement, type Ref } from 'react';

import { getUiScreenUrl } from 'scrivito_sdk/react/components/get_ui_screen_url';

export function DamFrame({
  screen,
  appUrl,
  iframeRef,
}: {
  screen: string;
  appUrl?: string;
  iframeRef?: Ref<HTMLIFrameElement>;
}): ReactElement {
  return (
    <iframe
      ref={iframeRef}
      src={getUiScreenUrl(screen, appUrl)}
      style={{ width: '100%', height: '100%', border: 'none' }}
    />
  );
}
