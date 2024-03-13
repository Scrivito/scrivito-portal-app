import { DataClass } from 'scrivito'

type ValuesByAttribute = Partial<Record<string, string[]>>
type ValuesByDataClass = Partial<Record<string, ValuesByAttribute>>

type LocalizerByValue = Partial<Record<string, string>>
type LocalizersByAttribute = Partial<Record<string, LocalizerByValue>>
type LocalizersByDataClass = Partial<Record<string, LocalizersByAttribute>>

const values: ValuesByDataClass = {}
const localizers: LocalizersByDataClass = {}

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

export function localizeAttributeValue({
  dataClass,
  attributeName,
  attributeValue,
}: {
  dataClass: DataClass
  attributeName: string
  attributeValue: string
}): string {
  return (
    localizers[dataClass.name()]?.[attributeName]?.[attributeValue] ??
    attributeValue
  )
}
