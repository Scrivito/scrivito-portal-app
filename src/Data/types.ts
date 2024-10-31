import type { provideDataClass } from 'scrivito'

type UnPromise<T> = T extends Promise<infer U> ? U : never

type ProvideDataClassParams = Parameters<typeof provideDataClass>[1]

export type DataConnection = UnPromise<ProvideDataClassParams['connection']>

type CreateCallback = NonNullable<DataConnection['create']>
export type ExternalData = Parameters<CreateCallback>[0]
export type ResultItem = UnPromise<ReturnType<CreateCallback>>

export type DataClassAttributes = Readonly<ProvideDataClassParams['attributes']>

export type DataClassSchema = UnPromise<DataClassAttributes>

// TODO: Remove when #11321 is resolved
type ExtractReadonlyDataClassSchema<T> =
  T extends Promise<infer U> ? { [K in keyof U]: Readonly<U[K]> } : never
export type ReadonlyDataClassSchema =
  ExtractReadonlyDataClassSchema<DataClassAttributes>
