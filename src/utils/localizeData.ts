export function localizeData<T extends Record<string, unknown>>(
  data: T,
  localizers: Record<string, string>,
): T {
  const localizedData: Record<string, string> = {}

  Object.entries(data).forEach(([name, value]) => {
    if (typeof value !== 'string') return
    const key = [name, value].join('.')
    if (localizers[key]) localizedData[`${name}Localized`] = localizers[key]
  })

  return { ...data, ...localizedData }
}
