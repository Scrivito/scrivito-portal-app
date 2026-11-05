// TODO: Delete this declaration (and its entry in tsconfig.node.json) once
// https://github.com/honeybadger-io/honeybadger-js/pull/1693 is merged and released:
// the rollup plugin will then ship its own types.
declare module '@honeybadger-io/rollup-plugin' {
  import type { Types } from '@honeybadger-io/plugin-core'
  import type { Plugin } from 'rollup'

  export default function honeybadgerRollupPlugin(
    options: Types.HbPluginUserOptions,
  ): Plugin
}
