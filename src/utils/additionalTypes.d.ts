import { useDataItem } from 'scrivito'

// TODO: Remove once #10258 is resolved
export type DataItem = NonNullable<ReturnType<typeof useDataItem>>
