export type MessageCatalog = {
  en: Record<string, string>
  [key: string]: Record<string, string>
}

export type TranslateFn<Keys extends string> = (
  id: Keys,
  values?: Record<string, unknown>,
  options?: { locale?: string },
) => string

export function setupI18n<M extends MessageCatalog>({
  locale,
  messages,
}: {
  locale: string
  messages: M
}): TranslateFn<keyof M['en'] & string> {
  const resolveLocale = (loc: string) => (loc in messages ? loc : 'en')
  const defaultLocale = resolveLocale(locale)

  return function t(id, values, options) {
    const catalog =
      messages[resolveLocale(options?.locale ?? defaultLocale)] ?? messages.en
    const template = catalog[id] ?? id
    if (!values) return template
    return template.replace(/{(\w+)}/g, (_, key: string) =>
      String(values[key] ?? ''),
    )
  }
}
