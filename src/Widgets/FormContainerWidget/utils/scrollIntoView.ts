export function scrollIntoView(element: unknown): void {
  if (!(element instanceof HTMLElement)) return

  const rect = element.getBoundingClientRect()
  const top = rect.top + window.pageYOffset

  window.scrollTo({ top, behavior: 'smooth' })
}
