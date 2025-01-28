import {
  DataAttributeDefinitions,
  DataConnectionResultItem,
  provideDataClass,
} from 'scrivito'
import { localStorageDataConnection } from './localStorageDataConnection'

interface RawDataItem {
  _id: string
  [key: string]: unknown
}

export function provideLocalStorageDataClass(
  className: string,
  {
    initialContent,
    prepareData,
    postProcessData,
    attributes,
  }: {
    initialContent?: RawDataItem[]
    prepareData?: (
      data: Record<string, unknown>,
    ) => Promise<Record<string, unknown>>
    postProcessData?: (
      data: DataConnectionResultItem,
    ) => Promise<DataConnectionResultItem>
    attributes?:
      | DataAttributeDefinitions
      | Promise<DataAttributeDefinitions>
      | (() => Promise<DataAttributeDefinitions>)
  } = {},
) {
  return provideDataClass(className, {
    attributes,
    connection: localStorageDataConnection(className, {
      initialContent,
      prepareData,
      postProcessData,
    }),
  })
}
