import { createApiClient } from 'scrivito'
import { scrivitoTenantId } from '../config/scrivitoTenants'

const pisaLookup: Partial<Record<string, string>> = {
  '13b78a0a81072f996f5010bb59b48957': 'https://web106.crm.pisasales.de/portal',
  d0a154d76edf2a7bd991fc658e700a1d: 'https://web102.crm.pisasales.de/portal',
  df372f6f39bf0f92ef2e591e4d7e002e: 'https://web107.crm.pisasales.de/portal',
  c64a248d1d9aec48a3ea0171839c5f4b: 'https://web130.crm.pisasales.de/portal',
  '640cb62568d68b721eea230702002161': 'https://web131.crm.pisasales.de/portal',
  d68765c3752eb9c3795df72628437129: 'https://web132.crm.pisasales.de/portal',
  '0502da64b11b60d3936aabe7ee238df8': 'https://web133.crm.pisasales.de/portal',
  d6dc92ec484fb0f7b23fd5bdcce31954: 'https://web134.crm.pisasales.de/portal',
  e4bd7bac84c6dc3fc1e723e69a1e2198: 'https://web135.crm.pisasales.de/portal',
  '74af09df7e505428b4734e457cdedbb6': 'https://web136.crm.pisasales.de/portal',
  '45dba0b87582a1ce81e3a94909af2ed0': 'https://web137.crm.pisasales.de/portal',
  '2eca061453be31284e14b38a5755599b': 'https://web138.crm.pisasales.de/portal',
  '84cac888b43125e4818a2157f50a9658': 'https://web139.crm.pisasales.de/portal',
  d4dab47105434773606d800b69df7d8d: 'https://web140.crm.pisasales.de/portal',
  '39d261c57d9628beda140abdb06c3d73': 'https://web141.crm.pisasales.de/portal',
  '8847d062c6529a6a60de2d4b5f3281f3': 'https://web142.crm.pisasales.de/portal',
  '5ccc791266c0ffec715636157d895744': 'https://web143.crm.pisasales.de/portal',
  '8ddaa6bcb0f274e097a5a1653c33faeb': 'https://web144.crm.pisasales.de/portal',
  '3c24a3db6f58f10a245dbc65c090e51a': 'https://web145.crm.pisasales.de/portal',
  '38a2bb776f08b84f7b963b4a2a49fb76': 'https://web175.crm.pisasales.de/portal',
  '874a0bc103d792b90ccaa850202556e3': 'https://web176.crm.pisasales.de/portal',
  '9d40fdf1b7bce0f07d83086580be796d': 'https://web177.crm.pisasales.de/portal',
}

export function pisaUrl(): string {
  const instanceId = scrivitoTenantId()
  const url = pisaLookup[instanceId]
  if (!url) {
    if (location.search.includes('ignoreMissingPisaUrl')) return ''
    throw new Error(`No PISA URL for ${instanceId} found!`)
  }

  return url
}

export function pisaClient(subPath: string) {
  const url = `${pisaUrl()}/${subPath}`
  return createApiClient(url)
}
