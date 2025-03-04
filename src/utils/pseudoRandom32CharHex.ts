import { times } from 'lodash-es'

export function pseudoRandom32CharHex(): string {
  return pseudoRandomCharHex(32)
}

export function pseudoRandomCharHex(length: number): string {
  if (length < 1) return ''
  return times(length).map(pseudoRandomHex).join('')
}

function pseudoRandomHex() {
  return Math.floor(Math.random() * 16).toString(16)
}
