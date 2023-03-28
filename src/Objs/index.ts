const modules = import.meta.glob(['./**/ObjClass.ts', './**/*Component.tsx'])

for (const path in modules) {
  modules[path]()
}

export {}
