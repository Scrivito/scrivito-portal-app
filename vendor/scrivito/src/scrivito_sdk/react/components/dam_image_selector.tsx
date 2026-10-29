import { type ReactElement, useCallback, useEffect, useRef } from 'react';

import { observeSelectedImage } from 'scrivito_sdk/app_support/observe_selected_image';
import { DamFrame } from 'scrivito_sdk/react/components/dam_frame';
import { Obj } from 'scrivito_sdk/realm';

/** @beta */
export interface DamImageSelectorProps {
  onSelect: (image: Obj | null) => void;
  unstable_appUrl?: string;
}

/** @beta */
export function DamImageSelector({
  onSelect,
  unstable_appUrl: appUrl,
}: DamImageSelectorProps): ReactElement {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  const isFromIframe = useCallback(
    (source: Window) => source === iframeRef.current?.contentWindow,
    [],
  );

  useEffect(() => {
    const subscription = observeSelectedImage(isFromIframe, (image) =>
      onSelectRef.current(image),
    );

    return () => subscription.unsubscribe();
  }, [isFromIframe]);

  return (
    <DamFrame screen="selectImage" appUrl={appUrl} iframeRef={iframeRef} />
  );
}
