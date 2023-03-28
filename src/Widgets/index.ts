const modules = import.meta.glob([
  './**/*WidgetClass.ts',
  './**/*WidgetComponent.tsx',
])

for (const path in modules) {
  modules[path]()
}

export {}
