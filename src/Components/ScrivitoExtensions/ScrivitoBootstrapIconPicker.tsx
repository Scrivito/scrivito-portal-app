import { ScrivitoBootstrapIconPicker as OriginalScrivitoBootstrapIconPicker } from '@justrelate/icon-picker'
import { connect, uiContext } from 'scrivito'
import type { ComponentProps } from 'react'

type ScrivitoBootstrapIconPickerProps = ComponentProps<
  typeof OriginalScrivitoBootstrapIconPicker
>

/**
 * Wrapper for @justrelate/icon-picker's ScrivitoBootstrapIconPicker
 * with negative margin to compensate for double padding.
 * TODO: Remove workaround for issue #12654
 */
export const ScrivitoBootstrapIconPicker = connect(
  function ScrivitoBootstrapIconPicker(
    props: ScrivitoBootstrapIconPickerProps,
  ) {
    const { theme } = uiContext() || { theme: null }
    const margin = theme === 'light' ? '-15px' : '-7px'

    return (
      <div style={{ margin }}>
        <OriginalScrivitoBootstrapIconPicker {...props} />
      </div>
    )
  },
)
