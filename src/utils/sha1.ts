import { toHex } from '@smithy/util-hex-encoding'

/** Returns a sha1 basic checksum. Do not use this output for cryptographic purposes! */
export async function sha1(input: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = await crypto.subtle.digest('sha-1', encoder.encode(input))
  return toHex(new Uint8Array(data))
}
