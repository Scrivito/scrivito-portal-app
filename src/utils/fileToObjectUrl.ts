export function fileToObjectUrl(file: File): {
  url: string
  cleanup: () => void
} {
  const url = URL.createObjectURL(file)
  return {
    url,
    cleanup: () => URL.revokeObjectURL(url),
  }
}
