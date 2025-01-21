import type { provideDataClass } from 'scrivito'

type UnPromise<T> = T extends Promise<infer U> ? U : never

type ProvideDataClassParams = Parameters<typeof provideDataClass>[1]

type DataClassAttributes = ProvideDataClassParams['attributes']
export type DataClassSchema = UnPromise<DataClassAttributes>

// TODO: Remove when #11321 is resolved
export type ReadonlyDataClassAttributes = Readonly<DataClassAttributes>
export type ReadonlyDataClassSchema = {
  readonly [K in keyof DataClassSchema]: Readonly<DataClassSchema[K]>
}
