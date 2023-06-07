import * as Scrivito from 'scrivito'

import.meta.glob(
  ['./**/*ObjClass.ts', './**/*Component.tsx', './**/*LayoutComponent.tsx'],
  { eager: true }
)

if (Scrivito.isEditorLoggedIn()) {
  const editingConfigModules = import.meta.glob([
    './**/*EditingConfig.ts',
    './**/*EditingConfig.tsx',
  ])

  for (const path in editingConfigModules) {
    editingConfigModules[path]()
  }
}

export {}
