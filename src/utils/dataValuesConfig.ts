import { DataClass } from 'scrivito'
import { getCurrentLanguage } from './currentLanguage'

type ValuesByAttribute = Record<string, string[]>
type ValuesByDataClass = Record<string, ValuesByAttribute>

type LocalizerByValue = Record<string, string>
type LocalizersByAttribute = Record<string, LocalizerByValue>
type LocalizersByDataClass = Record<string, LocalizersByAttribute>
type LocalizersByLocale = Record<string, LocalizersByDataClass>

const values: ValuesByDataClass = {}
const localizers: LocalizersByLocale = {}

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
  const locale = 'en'
  localizers[locale] ||= {}
  localizers[locale][dataClass.name()] = localizersByAttribute
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
  const language = getCurrentLanguage() || 'en'
  const localizedValue =
    localizers[language]?.[dataClass.name()]?.[attributeName]?.[attributeValue]
  const enValue =
    localizers['en']?.[dataClass.name()]?.[attributeName]?.[attributeValue]

  return localizedValue ?? enValue ?? attributeValue
}
