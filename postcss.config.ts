import type { PluginCreator } from 'postcss'

/**
 * PostCSS plugin to expand best-contrast() function calls.
 *
 * Transforms: best-contrast($bg, $darkText, $liteText)
 * Into: Full CSS calculation using XYZ color space luminance
 */
const bestContrast: PluginCreator<void> = () => {
  // Pivot point for luminance-based text color selection.
  // Backgrounds #a3a3a3 (Y = 0.366253) and #a3a3a4 (Y = 0.366613) were empirically
  // determined as the flip point between black/white text using https://colorcontrast.app/
  const PIVOT_Y = (0.366253 + 0.366613) / 2
  const PIVOT_Y_OFFSET = 0.5 - PIVOT_Y

  return {
    postcssPlugin: 'postcss-best-contrast',
    Declaration(decl) {
      if (!decl.value.startsWith('best-contrast(')) return

      const argsStr = decl.value.slice('best-contrast('.length, -1)
      const args = argsStr.split(',').map((s) => s.trim())

      if (args.length !== 3) {
        throw new Error(
          `best-contrast() requires 3 arguments, got ${args.length}`,
        )
      }

      const [bg, darkText, liteText] = args

      // Convert background luminance to binary alpha (0 or 1) at pivot threshold,
      // then use that alpha to select between darkText (light bg) or liteText (dark bg)
      decl.value = `color(from
        color-mix(in srgb,
          color-mix(in srgb, ${darkText} 0%,
            color(from ${bg} xyz none none none / calc(round(y + ${PIVOT_Y_OFFSET})))),
          color-mix(in srgb, ${liteText} 0%,
            color(from ${bg} xyz none none none / calc(1 - round(y + ${PIVOT_Y_OFFSET})))))
        srgb r g b / 1)`
    },
  }
}

bestContrast.postcss = true

export default { plugins: [bestContrast()] }
