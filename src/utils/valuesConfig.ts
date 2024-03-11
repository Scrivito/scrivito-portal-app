import { DataClass, DataItem } from 'scrivito'
import { ensureString } from './ensureString'

const values: Partial<Record<string, Partial<Record<string, string[]>>>> = {}
const localizers: Partial<
  Record<string, Partial<Record<string, Partial<Record<string, string>>>>>
> = {}

export function provideDataValues(
  dataClass: DataClass,
  valuesByAttribute: Record<string, string[]>,
): void {
  values[dataClass.name()] = valuesByAttribute
}

export function dataValues(
  dataClass: DataClass,
  attributeName: string,
): string[] {
  return values[dataClass.name()]?.[attributeName] || []
}

export function provideAttributeLocalizers(
  dataClass: DataClass,
  localizersByAttribute: Record<string, Record<string, string>>,
): void {
  localizers[dataClass.name()] = localizersByAttribute
}

export function localizedAttributeValue(
  dataClass: DataClass,
  attributeName: string,
  value: string,
): string
export function localizedAttributeValue(
  dataItem: DataItem,
  attributeName: string,
): string
export function localizedAttributeValue(
  data: DataItem | DataClass,
  attributeName: string,
  value?: string,
): string {
  if (isDataItem(data)) {
    return localizedAttributeValue(
      data.dataClass(),
      attributeName,
      ensureString(data.get(attributeName)),
    )
  }

  // We can use `value!` b/c its type depends on typeof data
  return localizers[data.name()]?.[attributeName]?.[value!] || value!
}

function isDataItem(item: unknown): item is DataItem {
  if (!item || typeof item !== 'object') return false
  return typeof (item as DataItem).id === 'function'
}
