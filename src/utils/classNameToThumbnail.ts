const thumbnails = Object.values(
  import.meta.glob('/src/assets/images/classNameToThumbnail/*.png', {
    as: 'url',
    eager: true,
  }),
)

export function classNameToThumbnail(className: string) {
  return undefined
  if (thumbnails.length === 0) return undefined

  const pointer = basicHash(className) % thumbnails.length
  return thumbnails[pointer]
}

function basicHash(input: string): number {
  return input.split('').reduce((hash, char) => {
    return hash + char.charCodeAt(0)
  }, 0)
}
