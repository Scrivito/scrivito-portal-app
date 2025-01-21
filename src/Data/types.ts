import type { provideDataClass } from 'scrivito'

type UnPromise<T> = T extends Promise<infer U> ? U : never

type ProvideDataClassParams = Parameters<typeof provideDataClass>[1]

type DataAttributeDefinitionsPromise = ProvideDataClassParams['attributes']
type DataAttributeDefinitions = UnPromise<DataAttributeDefinitionsPromise>

// TODO: Remove when #11321 is resolved
export type ReadonlyDataClassAttributes =
  Readonly<DataAttributeDefinitionsPromise>
export type ReadonlyDataClassSchema = {
  readonly [K in keyof DataAttributeDefinitions]: Readonly<
    DataAttributeDefinitions[K]
  >
}
